const Permission = require('../api/mongoose-models/Permission');

module.exports = async function () {
    console.time('SeedPermissions');
    sails.log('🔧 Đang chạy seedPermissions.js...');

    const existing = await Permission.countDocuments();
    if (existing > 0) {
        sails.log('⚠️ Permission đã tồn tại. Bỏ qua seed.');
        return;
    }

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

        // // Role & Permission
        { name: 'manage_roles', description: 'Quản lý role và quyền' },
        // { name: 'assign_role', description: 'Gán role cho người dùng' },
    ];

    try {
        sails.log('🧹 Đang xoá permission cũ...');
        await Permission.deleteMany({});
        sails.log('🧹 Đã xoá xong');

        sails.log('📥 Đang insert mới...');
        const created = await Permission.insertMany(permissions, { ordered: false });
        sails.log(`✅ Đã tạo ${created.length} permissions`);
    } catch (err) {
        console.error('❌ Lỗi khi seed permissions:', err.stack || err.message);
        throw err; // 🚨 Quan trọng
    }

    console.timeEnd('SeedPermissions');
};
