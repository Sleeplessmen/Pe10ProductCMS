const connectMongo = require('../services/connectMongo');

module.exports.bootstrap = function (done) {
    (async () => {
        try {
            // 1. Kết nối MongoDB
            await connectMongo();

            // 2. Seed dữ liệu nếu đang ở môi trường dev
            if (process.env.NODE_ENV === 'development') {
                // sails.log('🔧 Đang seed dữ liệu...');

                // // Load & chạy lần lượt để tránh lỗi phụ thuộc
                // await require('../seeds/seedPermissions')();
                // await require('../seeds/seedRoles')();
                // await require('../seeds/seedUsers')();

                // sails.log('🌱 Seed dữ liệu hoàn tất');
            }

            return done(); // ✅ báo cho Sails là bootstrap đã xong
        } catch (err) {
            sails.log.error('❌ Bootstrap error:', err.stack || err.message);
            return done(err); // thông báo lỗi để Sails dừng lại
        }
    })();
};
