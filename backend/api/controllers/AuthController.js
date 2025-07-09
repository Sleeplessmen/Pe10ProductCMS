const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

module.exports = {
    register: async (req, res) => {
        const { email, password, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ email, password: hashedPassword, role }).fetch();
        return res.json(user);
    },

    login: async (req, res) => {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) { return res.status(401).json({ error: 'Email không tồn tại' }); }

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) { return res.status(401).json({ error: 'Sai mật khẩu' }); }

        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET || 'secret_key',
            { expiresIn: '2d' }
        );
        return res.json({ token, user });
    }
};
