const mongoose = require('mongoose');

const uri = 'mongodb+srv://admin001:admin001@cluster0.xnnqhkd.mongodb.net/pe10?retryWrites=true&w=majority&appName=Cluster0';

async function testConnection() {
    try {
        console.log('⏳ Đang kết nối MongoDB...');
        await mongoose.connect(uri);
        console.log('✅ Đã kết nối MongoDB thành công!');
        await mongoose.disconnect();
    } catch (err) {
        console.error('❌ Lỗi khi kết nối MongoDB:', err.message);
    }
}

testConnection();
