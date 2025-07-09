const bcrypt = require('bcryptjs');

module.exports = async function () {
    const existingAdmin = await User.findOne({ email: 'admin@example.com' });
    if (!existingAdmin) {
        const hashed = await bcrypt.hash('123456', 10);
        await User.create({
            email: 'admin@example.com',
            password: hashed,
            role: 'admin'
        });
        sails.log('Admin user created');
    }

    const userCount = await User.count({ role: 'user' });
    if (userCount < 50) {
        for (let i = userCount + 1; i <= 50; i++) {
            const email = `user${i}@example.com`;
            const hashed = await bcrypt.hash('123456', 10);
            await User.create({
                email,
                password: hashed,
                role: 'user'
            });
        }
        sails.log(`Seeded ${50 - userCount} users`);
    } else {
        sails.log('Đã có đủ 50 user, không seed thêm');
    }
};
