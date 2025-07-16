const mongoose = require('mongoose');

mongoose.set('strictQuery', true);
mongoose.set('bufferCommands', false);

async function connectMongo() {
    const uri = process.env.MONGO_URI;
    if (!uri) {
        throw new Error('❌ Thiếu MONGO_URI trong file .env');
    }

    console.log('📡 Đang kết nối đến MongoDB với URI:', uri);

    try {
        await mongoose.connect(uri);
        console.log('📥 Gửi lệnh kết nối xong');
    } catch (e) {
        console.error('❌ Lỗi khi gọi mongoose.connect:', e);
        throw e;
    }

    // Đợi mongoose kết nối thật sự ổn định (readyState = 1)
    await new Promise((resolve, reject) => {
        const timeoutMs = 5000;
        const start = Date.now();

        const interval = setInterval(() => {
            if (mongoose.connection.readyState === 1) {
                clearInterval(interval);
                sails.log('✅ Kết nối MongoDB (Mongoose) thành công');
                return resolve();
            }

            if (Date.now() - start > timeoutMs) {
                clearInterval(interval);
                return reject(new Error('⏳ MongoDB connection timeout (readyState ≠ 1)'));
            }
        }, 100);
    });
}

module.exports = connectMongo;
