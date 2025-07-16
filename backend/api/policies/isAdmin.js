const verifyToken = require('../../utils/verifyToken');
const User = require('../../api/mongoose-models/User');

module.exports = async function (req, res, proceed) {
    try {
        const decoded = await verifyToken(req);

        // Lấy user từ DB và populate role
        const user = await User.findById(decoded.id).populate('roles');

        if (!user || !user.roles || user.roles.length === 0) {
            return res.status(403).json({ success: false, error: 'Không xác định được quyền truy cập.' });
        }

        const roleName = user.roles[0].name; // Vì hệ thống chỉ có 1 role/user
        if (roleName !== 'admin') {
            return res.status(403).json({ success: false, error: 'Bạn không có quyền truy cập (admin).' });
        }

        req.user = user;
        return proceed();
    } catch (err) {
        return res.status(err.status || 401).json({ success: false, error: err.message });
    }
};
