const hasPermission = require('../api/policies/hasPermission');

module.exports.policies = {
    AuthController: {
        '*': true,
    },

    // --- Sản phẩm ---
    ProductController: {
        '*': 'requireAuth',

        create: hasPermission('create_product'),
        update: hasPermission('update_product'),
        delete: hasPermission('delete_product'),
        findAll: hasPermission('read_product'),
        findOne: hasPermission('read_product'),
    },

    // --- Page Config CMS ---
    PageConfigController: {
        '*': 'requireAuth',

        create: hasPermission('create_page'),
        update: hasPermission('update_page'),
        delete: hasPermission('delete_page'),
        findAll: hasPermission('view_cms_dashboard'),
        findOne: hasPermission('view_cms_dashboard'),
    },

    // // --- Role / RBAC ---
    // RoleController: {
    //     '*': 'requireAuth',

    //     create: hasPermission('manage_roles'),
    //     update: hasPermission('manage_roles'),
    //     delete: hasPermission('manage_roles'),
    //     findAll: hasPermission('manage_roles'),
    //     findOne: hasPermission('manage_roles'),
    // },
};
