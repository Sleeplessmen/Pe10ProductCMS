const bcrypt = require('bcryptjs');
const User = require('../api/mongoose-models/User');
const Role = require('../api/mongoose-models/Role');

module.exports = async function () {
    console.time('SeedUsers');
    sails.log('🔧 Đang chạy seedUsers.js...');

    try {
        // 1. Lấy role từ DB
        const [adminRole, userRole] = await Promise.all([
            Role.findOne({ name: 'admin' }),
            Role.findOne({ name: 'user' }),
        ]);

        if (!adminRole || !userRole) {
            throw new Error('❌ Role admin/user chưa tồn tại. Hãy seed role trước.');
        }

        // 2. Xoá toàn bộ user thường (role = user)
        const deleted = await User.deleteMany({ role: userRole._id });
        sails.log(`🧹 Đã xoá ${deleted.deletedCount} user thường`);

        // 3. Tạo admin nếu chưa có
        const adminEmail = 'admin@example.com';
        const existingAdmin = await User.findOne({ email: adminEmail });

        if (!existingAdmin) {
            const hashed = await bcrypt.hash('123456', 10);
            await User.create({
                email: adminEmail,
                password: hashed,
                role: adminRole._id,
            });
            sails.log(`✅ Đã tạo admin: ${adminEmail}`);
        } else {
            sails.log(`ℹ️ Admin đã tồn tại: ${adminEmail}`);
        }

        // 4. Tạo 50 user thường
        const passwordHashed = await bcrypt.hash('123456', 10); // reuse hash để tăng tốc
        const users = Array.from({ length: 50 }, (_, i) => ({
            email: `user${i + 1}@example.com`,
            password: passwordHashed,
            role: userRole._id,
        }));

        await User.insertMany(users);
        sails.log('✅ Đã tạo 50 user thường');

    } catch (err) {
        sails.log.error('❌ Lỗi khi seed user:', err.stack || err.message);
    }

    console.timeEnd('SeedUsers');
};
