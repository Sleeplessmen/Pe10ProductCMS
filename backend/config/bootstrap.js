// config/bootstrap.js
const mongoose = require('mongoose');
require('dotenv').config(); // đảm bảo biến môi trường được load

module.exports.bootstrap = async function () {
    const uri = process.env.MONGO_URI;

    if (!uri) {
        sails.log.error('❌ Thiếu MONGO_URI trong file .env');
        process.exit(1);
    }

    try {
        await mongoose.connect(uri);
        sails.log('✅ Kết nối MongoDB (Mongoose) thành công');

        // 👉 Tự động seed dữ liệu khi ở môi trường development
        if (process.env.NODE_ENV === 'development') {
            await require('../seeds/seedAll')(); // hoặc từng seed riêng nếu muốn
            sails.log('🌱 Đã seed dữ liệu cho môi trường development');
        }

    } catch (err) {
        sails.log.error('❌ Không kết nối được MongoDB:', err.message);
        process.exit(1);
    }
};
