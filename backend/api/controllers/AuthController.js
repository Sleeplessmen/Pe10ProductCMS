const User = require('../mongoose-models/User');
const Role = require('../mongoose-models/Role');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Joi = require('joi');

module.exports = {
    // chua sua comment cho api doc
    /**
    * @swagger
    * api/v1/auth/register:
    *   post:
    *     summary: Đăng ký tài khoản mới
    *     tags:
    *       - Auth
    *     requestBody:
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             type: object
    *             required:
    *               - email
    *               - password
    *             properties:
    *               email:
    *                 type: string
    *                 format: email
    *                 example: user@example.com
    *               password:
    *                 type: string
    *                 minLength: 6
    *                 example: 123456
    *               role:
    *                 type: string
    *                 description: ID của role (user hoặc admin)
    *                 example: 64b78ae1c1d2a0a4b7395f99
    *     responses:
    *       201:
    *         description: Đăng ký thành công
    *         content:
    *           application/json:
    *             schema:
    *               type: object
    *               properties:
    *                 success:
    *                   type: boolean
    *                   example: true
    *                 message:
    *                   type: string
    *                   example: Đăng ký thành công
    *                 data:
    *                   type: object
    *                   properties:
    *                     user:
    *                       type: object
    *                       properties:
    *                         _id:
    *                           type: string
    *                         email:
    *                           type: string
    *                         roles:
    *                           type: array
    *                           items:
    *                             type: string
    *       400:
    *         description: Dữ liệu không hợp lệ
    *       409:
    *         description: Email đã được đăng ký
    *       500:
    *         description: Lỗi server trong quá trình đăng ký
    */
    register: async (req, res) => {
        try {
            const schema = Joi.object({
                email: Joi.string().email().required(),
                password: Joi.string().min(6).required(),
                role: Joi.string().valid('user', 'editor').default('user') // dùng để tra role từ DB
            });

            const { error, value } = schema.validate(req.body);
            if (error) {
                return res.status(400).json({
                    success: false,
                    message: 'Dữ liệu không hợp lệ',
                    error: error.details.map(e => e.message).join(', ')
                });
            }

            const { email, password, role } = value;

            // Kiểm tra email đã tồn tại
            const existing = await User.findOne({ email });
            if (existing) {
                return res.status(409).json({
                    success: false,
                    message: 'Email đã được đăng ký'
                });
            }

            // Lấy role từ DB
            const roleDoc = await Role.findOne({ name: role });
            if (!roleDoc) {
                return res.status(400).json({
                    success: false,
                    message: `Vai trò '${role}' không tồn tại`
                });
            }

            // Băm password và tạo user mới
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({
                email,
                password: hashedPassword,
                role: roleDoc._id // ✅ Cập nhật đúng theo schema mới
            });

            await newUser.save();

            return res.status(201).json({
                success: true,
                message: 'Đăng ký thành công',
                data: {
                    user: {
                        _id: newUser._id,
                        email: newUser.email,
                        role: roleDoc.name
                    }
                }
            });

        } catch (err) {
            sails.log.error('[AuthController.register] Lỗi:', err);
            return res.status(500).json({
                success: false,
                message: 'Lỗi server trong quá trình đăng ký',
                error: process.env.NODE_ENV === 'development' ? err.message : undefined
            });
        }
    },

    /**
     * @swagger
     * api/v1/auth/login:
     *   post:
     *     summary: Đăng nhập
     *     tags:
     *       - Auth
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - email
     *               - password
     *             properties:
     *               email:
     *                 type: string
     *                 format: email
     *               password:
     *                 type: string
     *                 minLength: 6
     *     responses:
     *       200:
     *         description: Đăng nhập thành công
     *         headers:
     *           Set-Cookie:
     *             description: Cookie chứa JWT token
     *             schema:
     *               type: string
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                   example: true
     *                 message:
     *                   type: string
     *                   example: Đăng nhập thành công
     *                 data:
     *                   type: object
     *                   properties:
     *                     user:
     *                       type: object
     *                       properties:
     *                         _id:
     *                           type: string
     *                         email:
     *                           type: string
     *                         roles:
     *                           type: array
     *                           items:
     *                             type: object
     *                             properties:
     *                               _id:
     *                                 type: string
     *                               name:
     *                                 type: string
     *                     token:
     *                       type: string
     *       400:
     *         description: Dữ liệu không hợp lệ
     *       401:
     *         description: Email hoặc mật khẩu không chính xác
     *       500:
     *         description: Lỗi server trong quá trình đăng nhập
     */
    login: async (req, res) => {
        try {
            const schema = Joi.object({
                email: Joi.string().email().required(),
                password: Joi.string().required()
            });

            const { error, value } = schema.validate(req.body);
            if (error) {
                return res.status(400).json({
                    success: false,
                    message: 'Dữ liệu không hợp lệ',
                    error: error.details.map(e => e.message).join(', ')
                });
            }

            const { email, password } = value;

            // ✅ Tìm user và populate role (số ít)
            const user = await User.findOne({ email }).populate('role');
            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: 'Email không tồn tại'
                });
            }

            const valid = await bcrypt.compare(password, user.password);
            if (!valid) {
                return res.status(401).json({
                    success: false,
                    message: 'Sai mật khẩu'
                });
            }

            const roleName = (user.role && user.role.name) ? user.role.name : 'user';

            const token = jwt.sign(
                { id: user._id, role: roleName },
                process.env.JWT_SECRET || 'secret_key',
                { expiresIn: '2d' }
            );

            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 2 * 24 * 60 * 60 * 1000
            });

            return res.status(200).json({
                success: true,
                message: 'Đăng nhập thành công',
                data: {
                    user: {
                        _id: user._id,
                        email: user.email,
                        role: roleName
                    },
                    token
                }
            });

        } catch (error) {
            sails.log.error('[AuthController.login] Lỗi:', error);
            return res.status(500).json({
                success: false,
                message: 'Lỗi server trong quá trình đăng nhập',
                error: process.env.NODE_ENV === 'development' ? error.message : undefined
            });
        }
    },

    /**
     * @swagger
     * api/v1/auth/logout:
     *   post:
     *     summary: Đăng xuất
     *     tags:
     *       - Auth
     *     responses:
     *       200:
     *         description: Đăng xuất thành công
     *       500:
     *         description: Lỗi server trong quá trình đăng xuất
     */
    logout: async (req, res) => {
        try {
            res.clearCookie('token', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax'
            });

            return res.status(200).json({
                success: true,
                message: 'Đăng xuất thành công'
            });
        } catch (err) {
            sails.log.error('[AuthController.logout] Lỗi:', err);
            return res.status(500).json({
                success: false,
                message: 'Lỗi server trong quá trình đăng xuất',
                error: process.env.NODE_ENV === 'development' ? err.message : undefined
            });
        }
    }
};
