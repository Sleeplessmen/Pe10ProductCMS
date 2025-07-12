const bcrypt = require('bcryptjs');
const User = require('../api/mongoose-models/User');

module.exports = async function () {
    console.log('🔧 Đang chạy seedUsers.js...');

    try {
        await User.deleteMany({ role: 'user' });
        sails.log('🧹 Đã xoá toàn bộ user thường');

        // Tạo admin nếu chưa có
        const existingAdmin = await User.findOne({ email: 'admin@example.com' });
        if (!existingAdmin) {
            const hashed = await bcrypt.hash('123456', 10);
            await User.create({
                email: 'admin@example.com',
                password: hashed,
                role: 'admin',
            });
            sails.log('✅ Admin user created');
        } else {
            sails.log('ℹ️ Admin đã tồn tại');
        }

        // Seed 50 users (dùng Promise.all hoặc insertMany để tối ưu)
        const users = [];
        for (let i = 1; i <= 50; i++) {
            const email = `user${i}@example.com`;
            const hashed = await bcrypt.hash('123456', 10);
            users.push({ email, password: hashed, role: 'user' });
        }

        await User.insertMany(users); // ✅ hiệu suất cao hơn
        sails.log('✅ Đã seed 50 user thường');

    } catch (err) {
        console.error('❌ Lỗi khi chạy seedUsers:', err);
    }
};
