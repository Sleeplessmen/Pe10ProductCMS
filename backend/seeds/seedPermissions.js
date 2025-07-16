const Permission = require('../api/mongoose-models/Permission');

module.exports = async function () {
    console.time('SeedPermissions');
    sails.log('🔧 Đang chạy seedPermissions.js...');

    const permissions = [
        // CRUD sản phẩm
        { name: 'create_product', description: 'Tạo sản phẩm' },
        { name: 'read_product', description: 'Xem sản phẩm' },
        { name: 'update_product', description: 'Cập nhật sản phẩm' },
        { name: 'delete_product', description: 'Xoá sản phẩm' },

        // Auth
        { name: 'auth_register', description: 'Đăng ký tài khoản' },
        { name: 'auth_login', description: 'Đăng nhập hệ thống' },
        { name: 'auth_logout', description: 'Đăng xuất hệ thống' },

        // CMS / PageConfig
        { name: 'create_page', description: 'Tạo page CMS' },
        { name: 'update_page', description: 'Sửa page CMS' },
        { name: 'delete_page', description: 'Xoá page CMS' },
        { name: 'view_cms_dashboard', description: 'Xem giao diện CMS' },

        // Role & Permission
        { name: 'manage_roles', description: 'Quản lý role và quyền' },
    ];

    try {
        await Permission.deleteMany({});
        sails.log('🧹 Đã xoá toàn bộ permission cũ');

        const created = await Permission.insertMany(permissions);
        sails.log(`✅ Đã tạo ${created.length} permissions`);
    } catch (err) {
        sails.log.error('❌ Lỗi khi seed permissions:', err.stack || err.message);
        throw err;
    }

    console.timeEnd('SeedPermissions');
};
