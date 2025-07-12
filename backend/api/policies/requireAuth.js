const jwt = require('jsonwebtoken');

module.exports = async function (req, res, proceed) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ error: 'Bạn cần đăng nhập để truy cập' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret_key');
        req.user = decoded;
        return proceed();
    } catch (err) {
        return res.status(403).json({ error: err.message + 'Token không hợp lệ hoặc đã hết hạn' });
    }
};
