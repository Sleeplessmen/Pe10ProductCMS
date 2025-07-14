const User = require('../mongoose-models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Joi = require('joi');

module.exports = {
    register: async (req, res) => {
        try {
            const schema = Joi.object({
                email: Joi.string().email().required(),
                password: Joi.string().min(6).required(),
                role: Joi.string().valid('user', 'admin').default('user')
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

            const existing = await User.findOne({ email });
            if (existing) {
                return res.status(409).json({
                    success: false,
                    message: 'Email đã được đăng ký'
                });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({ email, password: hashedPassword, role });
            await newUser.save();

            return res.status(201).json({
                success: true,
                message: 'Đăng ký thành công',
                data: { user: newUser }
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

            const user = await User.findOne({ email });
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

            const token = jwt.sign(
                { id: user._id, role: user.role },
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
                data: { user, token }
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
