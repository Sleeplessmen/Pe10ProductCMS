module.exports = async function (req, res, proceed) {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ error: 'Bạn cần đăng nhập.' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret_key');
        if (decoded.role !== 'admin') {
            return res.status(403).json({ error: 'Bạn không có quyền truy cập.' });
        }
        req.user = decoded;
        return proceed();
    } catch (err) {
        return res.status(403).json({ error: err.message + 'Token không hợp lệ.' });
    }
};
