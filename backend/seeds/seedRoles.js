const Role = require('../api/mongoose-models/Role');
const Permission = require('../api/mongoose-models/Permission');

module.exports = async function () {
    sails.log('🔧 Đang chạy seedRoles.js...');
    console.time('SeedRoles');

    try {
        // 1. Xoá role cũ
        await Role.deleteMany({});
        sails.log('🧹 Đã xoá toàn bộ roles cũ');

        // 2. Lấy permission từ DB
        const allPermissions = await Permission.find({});
        if (allPermissions.length === 0) {
            throw new Error('❌ Cần seed permissions trước khi tạo role');
        }

        // 3. Helper lấy _id theo name
        const getByName = name => {
            const found = allPermissions.find(p => p.name === name);
            if (!found) {
                sails.log.warn(`⚠️ Không tìm thấy permission: ${name}`);
                return null;
            }
            return found._id;
        };

        // 4. Phân quyền cho từng role
        const adminPermissions = allPermissions.map(p => p._id);

        const editorPermissions = [
            'create_page',
            'update_page',
            'delete_page',
            'view_cms_dashboard',
            'create_product',
            'read_product',
            'update_product',
            'delete_product',
        ].map(getByName).filter(Boolean);

        const userPermissions = [
            'auth_register',
            'auth_login',
            'auth_logout',
            'read_product',
        ].map(getByName).filter(Boolean);

        // 5. Tạo role mới
        await Role.insertMany([
            {
                name: 'admin',
                description: 'Quản trị toàn hệ thống',
                permissions: adminPermissions,
            },
            {
                name: 'editor',
                description: 'Biên tập viên nội dung',
                permissions: editorPermissions,
            },
            {
                name: 'user',
                description: 'Người dùng thông thường',
                permissions: userPermissions,
            },
        ]);

        sails.log('✅ Đã tạo role: admin, editor, user');
    } catch (error) {
        sails.log.error('❌ Lỗi khi seed roles:', error.stack || error.message);
    }

    console.timeEnd('SeedRoles');
};
