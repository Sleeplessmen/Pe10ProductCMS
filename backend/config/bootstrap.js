const connectMongo = require('../services/connectMongo');

module.exports.bootstrap = function (done) {
    (async () => {
        try {
            await connectMongo();

            if (process.env.NODE_ENV === 'development') {
                // sails.log('🔧 Đang seed dữ liệu...');
                // await require('../seeds/seedPermissions')();
                // sails.log('🌱 Đã seed xong dữ liệu');
            }

            return done(); // ✅ báo cho Sails biết đã xong bootstrap
        } catch (err) {
            sails.log.error('❌ Bootstrap error:', err.message);
            return done(err); // báo lỗi
        }
    })(); // gọi IIFE async
};
