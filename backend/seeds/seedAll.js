module.exports = async function () {
    sails.log('🔧 Bắt đầu seed dữ liệu...');

    try {
        // 1. Seed quyền
        sails.log('➡️  Seeding permissions...');
        await require('./seedPermissions')();

        // 2. Seed role (dựa trên permission)
        sails.log('➡️  Seeding roles...');
        await require('./seedRoles')();

        // 3. Seed user (dựa trên role)
        sails.log('➡️  Seeding users...');
        await require('./seedUsers')();

        // 4. Các dữ liệu khác
        sails.log('➡️  Seeding products...');
        await require('./seedProducts')();

        sails.log('✅ Tất cả dữ liệu đã được seed thành công!');
    } catch (err) {
        sails.log.error('❌ Lỗi khi seed dữ liệu:', err.stack || err.message || err);
        // Rất quan trọng: throw lại lỗi để bootstrap.js biết có lỗi và ngắt
        throw err;
    }
};
