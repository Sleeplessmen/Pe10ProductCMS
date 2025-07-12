module.exports.routes = {

    // Trang chủ (nếu có dùng view)
    '/': { view: 'pages/homepage' },

    // Auth routes
    'POST /api/register': 'AuthController.register',
    'POST /api/login': 'AuthController.login',

    // Product routes
    'GET    /api/products': 'ProductController.findAll',
    'GET    /api/products/:id': 'ProductController.findOne',
    'POST   /api/products': 'ProductController.create',
    'PUT    /api/products/:id': 'ProductController.update',
    'DELETE /api/products/:id': 'ProductController.delete',

    // (Thêm middleware xác thực nếu có)
};
