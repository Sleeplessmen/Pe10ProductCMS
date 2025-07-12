const Product = require('../api/mongoose-models/Product'); // Bắt buộc import model Mongoose

module.exports = async function () {
    console.log('🔧 Đang chạy seedProducts.js...');

    try {
        // 🧹 Xoá toàn bộ sản phẩm cũ
        await Product.deleteMany({});
        sails.log('🧹 Đã xoá toàn bộ sản phẩm');

        // ✅ Tạo mới sản phẩm
        const products = [];
        for (let i = 1; i <= 20; i++) {
            products.push({
                name: `Sản phẩm ${i}`,
                description: `Mô tả cho sản phẩm ${i}`,
                price: Math.floor(Math.random() * 100000) + 10000
            });
        }

        await Product.insertMany(products);
        sails.log(`✅ Seeded ${products.length} sản phẩm`);
    } catch (err) {
        console.error('❌ Lỗi khi chạy seedProducts:', err);
    }
};
