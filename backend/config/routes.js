module.exports.routes = {

    // Trang chủ (nếu có dùng view)
    '/': { view: 'pages/homepage' },

    // Auth routes
    'POST /api/auth/register': 'AuthController.register',
    'POST /api/auth/login': 'AuthController.login',
    'POST /api/auth/logout': 'AuthController.logout',

    // Product routes
    'GET    /api/products': 'ProductController.findAll',
    'GET    /api/products/:id': 'ProductController.findOne',
    'POST   /api/products': 'ProductController.create',
    'PUT    /api/products/:id': 'ProductController.update',
    'DELETE /api/products/:id': 'ProductController.delete',

    // (Thêm middleware xác thực nếu có)
};
