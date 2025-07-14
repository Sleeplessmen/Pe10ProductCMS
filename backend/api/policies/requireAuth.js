// policies/requireAuth.js
const verifyToken = require('../../utils/verifyToken');

module.exports = async function (req, res, proceed) {
    try {
        const decoded = verifyToken(req);
        req.user = decoded;
        return proceed();
    } catch (err) {
        return res.status(err.status || 401).json({ success: false, error: err.message });
    }
};
