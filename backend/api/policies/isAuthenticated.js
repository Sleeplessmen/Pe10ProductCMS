const User = require('../models/User');
const jwt = require('jsonwebtoken');

module.exports = async function (req, res, proceed) {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    if (!token) {
        return res.forbidden('Không có token.');
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret_key');
        const user = await User.findOne({ id: decoded.id });
        if (!user) {
            return res.forbidden('Người dùng không tồn tại');
        }
        req.me = user;
        return proceed();
    } catch (err) {
        return res.forbidden('Token không hợp lệ.');
    }
};
