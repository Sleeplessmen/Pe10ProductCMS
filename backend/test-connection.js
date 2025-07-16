require('dotenv').config();
const mongoose = require('mongoose');

(async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            connectTimeoutMS: 30000,
            serverSelectionTimeoutMS: 30000,
        });

        console.log('✅ Đã kết nối MongoDB thành công');
        process.exit(0);
    } catch (err) {
        console.error('❌ Lỗi kết nối MongoDB:', err.message);
        process.exit(1);
    }
})();
