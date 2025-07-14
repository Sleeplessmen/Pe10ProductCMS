const jwt = require('jsonwebtoken');

module.exports = function verifyToken(req) {
    let token = null;

    // Ưu tiên lấy từ cookie
    if (req.cookies && req.cookies.token) {
        token = req.cookies.token;
    }

    // Nếu không có trong cookie, thử lấy từ header Authorization: Bearer <token>
    else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        sails.log.warn('[verifyToken] Không tìm thấy token trong request');
        throw { status: 401, message: 'Token không tồn tại hoặc không hợp lệ' };
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret_key');
        return decoded; // Trả payload = { id, role, ... }
    } catch (err) {
        sails.log.error('[verifyToken] JWT error:', err);
        throw { status: 403, message: 'Token không hợp lệ hoặc đã hết hạn' };
    }

};
