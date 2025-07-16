const User = require('../../api/mongoose-models/User');

module.exports = async function (req, res, proceed) {
    try {
        const decoded = await verifyToken(req);
        const user = await User.findById(decoded.id).populate('roles');

        if (!user) {
            return res.status(401).json({ success: false, error: 'Người dùng không tồn tại.' });
        }

        req.user = user;
        return proceed();
    } catch (err) {
        return res.status(err.status || 401).json({ success: false, error: err.message });
    }
};
