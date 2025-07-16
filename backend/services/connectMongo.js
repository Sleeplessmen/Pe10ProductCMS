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
        await mongoose.connect(uri); // nếu lỗi ở đây sẽ ném luôn
        console.log('📥 Gửi lệnh kết nối xong');
    } catch (e) {
        console.error('❌ Lỗi khi gọi mongoose.connect:', e);
        throw e;
    }

    mongoose.connection.on('connected', () => {
        sails.log('✅ Kết nối MongoDB thành công (connected)');
    });
    mongoose.connection.on('error', (err) => {
        sails.log.error('❌ Lỗi kết nối MongoDB:', err);
        throw err;
    });

}

module.exports = connectMongo;
