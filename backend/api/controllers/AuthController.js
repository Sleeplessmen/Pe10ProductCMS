const User = require('../mongoose-models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

module.exports = {
    register: async (req, res) => {
        try {
            const { email, password, role } = req.body;

            if (!email || !password) {
                return res.status(400).json({ error: 'Email và mật khẩu là bắt buộc' });
            }

            const existing = await User.findOne({ email });
            if (existing) {
                return res.status(409).json({ error: 'Email đã được đăng ký' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({ email, password: hashedPassword, role });
            await newUser.save();

            return res.status(201).json({ user: newUser });
        } catch (err) {
            console.error('Đăng ký lỗi:', err);
            return res.status(500).json({ error: 'Lỗi server', details: err.message });
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({ error: 'Vui lòng nhập đầy đủ email và mật khẩu' });
            }

            const user = await User.findOne({ email });
            if (!user) {
                return res.status(401).json({ error: 'Email không tồn tại' });
            }

            const valid = await bcrypt.compare(password, user.password);
            if (!valid) {
                return res.status(401).json({ error: 'Sai mật khẩu' });
            }

            const token = jwt.sign(
                { id: user._id, role: user.role },
                process.env.JWT_SECRET || 'secret_key',
                { expiresIn: '2d' }
            );

            return res.status(200).json({ token, user });
        } catch (error) {
            console.error('Login error:', error);
            return res.status(500).json({ error: 'Đã xảy ra lỗi phía máy chủ. Vui lòng thử lại sau.' });
        }
    }
};
