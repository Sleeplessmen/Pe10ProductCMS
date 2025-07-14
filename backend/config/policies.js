module.exports.policies = {
    // Cho phép truy cập tự do với AuthController (đăng ký, đăng nhập)
    AuthController: {
        '*': true
    },

    // Áp dụng bảo vệ JWT cho ProductController
    ProductController: {
        // ✅ Yêu cầu đăng nhập cho tất cả hành động
        '*': 'requireAuth',

        // ✅ Chỉ admin mới có thể thực hiện các hành động thay đổi dữ liệu
        create: 'isAdmin',
        update: 'isAdmin',
        delete: 'isAdmin',

    }
};
