const User = require('../../api/mongoose-models/User');
const verifyToken = require('../../utils/verifyToken');

module.exports = async function (req, res, proceed) {
    try {
        // 1. Giải mã token (JWT)
        const decoded = await verifyToken(req);

        // 2. Truy vấn User từ DB
        const user = await User.findById(decoded.id).populate('role');

        // 3. Kiểm tra tồn tại
        if (!user) {
            return res.status(401).json({ success: false, error: 'Người dùng không tồn tại.' });
        }

        // 4. Gắn user vào req để dùng về sau
        req.user = user;
        return proceed();

    } catch (err) {
        return res.status(err.status || 401).json({
            success: false,
            error: err.message || 'Xác thực thất bại'
        });
    }
};
