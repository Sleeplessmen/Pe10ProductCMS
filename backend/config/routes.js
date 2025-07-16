module.exports.routes = {

    // Trang chủ (nếu có dùng view)
    '/': { view: 'pages/homepage' },

    // Auth routes
    'POST /api/v1/auth/register': 'AuthController.register',
    'POST /api/v1/auth/login': 'AuthController.login',
    'POST /api/v1/auth/logout': 'AuthController.logout',

    // Product routes
    'GET    /api/v1/products': 'ProductController.findAll',
    'GET    /api/v1/products/:id': 'ProductController.findOne',
    'POST   /api/v1/products': 'ProductController.create',
    'PUT    /api/v1/products/:id': 'ProductController.update',
    'DELETE /api/v1/products/:id': 'ProductController.delete',

    // Page Config API
    'GET    /api/v1/page-configs': 'PageConfigController.findAll',
    'GET    /api/v1/page-configs/:slug': 'PageConfigController.findOne',
    'POST   /api/v1/page-configs': 'PageConfigController.create',
    'PUT    /api/v1/page-configs/:slug': 'PageConfigController.update',
    'DELETE /api/v1/page-configs/:slug': 'PageConfigController.delete',

    // // Role routes
    // 'GET    /api/v1/roles': 'RoleController.findAll',
    // 'GET    /api/v1/roles/:id': 'RoleController.findOne',
    // 'POST   /api/v1/roles': 'RoleController.create',
    // 'PUT    /api/v1/roles/:id': 'RoleController.update',
    // 'DELETE /api/v1/roles/:id': 'RoleController.delete',
};
