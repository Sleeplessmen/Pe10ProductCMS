const verifyToken = require('../../utils/verifyToken');

module.exports = async function (req, res, proceed) {
    try {
        const decoded = await verifyToken(req);

        if (decoded.role !== 'admin') {
            return res.status(403).json({ success: false, error: 'Bạn không có quyền truy cập.' });
        }

        req.user = decoded;
        return proceed();
    } catch (err) {
        return res.status(err.status || 401).json({ success: false, error: err.message });
    }
};
