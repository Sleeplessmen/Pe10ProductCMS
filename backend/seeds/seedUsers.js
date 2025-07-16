const bcrypt = require('bcryptjs');
const User = require('../api/mongoose-models/User');
const Role = require('../api/mongoose-models/Role');

module.exports = async function () {
    console.log('🔧 Đang chạy seedUsers.js...');

    try {
        // Lấy role admin và user từ DB
        const adminRole = await Role.findOne({ name: 'admin' });
        const userRole = await Role.findOne({ name: 'user' });

        if (!adminRole || !userRole) {
            throw new Error('❌ Role admin/user chưa được seed. Hãy chạy seedRoles trước.');
        }

        // Xoá toàn bộ user có role là "user"
        const deleted = await User.deleteMany({ role: userRole._id });
        sails.log(`🧹 Đã xoá ${deleted.deletedCount} user thường`);

        // Tạo admin nếu chưa có
        const existingAdmin = await User.findOne({ email: 'admin@example.com' });
        if (!existingAdmin) {
            const hashed = await bcrypt.hash('123456', 10);
            await User.create({
                email: 'admin@example.com',
                password: hashed,
                role: adminRole._id,
            });
            sails.log('✅ Admin user đã được tạo');
        } else {
            sails.log('ℹ️ Admin đã tồn tại');
        }

        // Tạo 50 user thường
        const users = [];
        for (let i = 1; i <= 50; i++) {
            const email = `user${i}@example.com`;
            const hashed = await bcrypt.hash('123456', 10);
            users.push({ email, password: hashed, role: userRole._id });
        }

        await User.insertMany(users);
        sails.log('✅ Đã tạo 50 user thường');
    } catch (err) {
        console.error('❌ Lỗi khi chạy seedUsers:', err.message);
    }
};
