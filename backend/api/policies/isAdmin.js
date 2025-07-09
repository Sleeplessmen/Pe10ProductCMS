module.exports = async function (req, res, proceed) {
    if (!req.me) {
        return res.forbidden('Chưa đăng nhập');
    }
    if (req.me.role !== 'admin') {
        return res.forbidden('Chỉ admin được phép');
    }
    return proceed();
};
