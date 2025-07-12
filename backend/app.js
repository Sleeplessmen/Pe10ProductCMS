/**
 * app.js
 *
 * Điểm khởi động ứng dụng Sails.js bằng Node.js
 * Dùng để phát triển hoặc chạy production không dùng `sails lift`
 */

process.chdir(__dirname);

require('dotenv').config(); // Load biến môi trường nếu có

const sails = require('sails');
const rc = require('sails/accessible/rc');

(async () => {
    try {
        await sails.lift(rc('sails'));
        console.log('Sails app started successfully');
    } catch (err) {
        console.error('Không thể khởi chạy ứng dụng. Vui lòng chạy `npm install` nếu thiếu Sails.js.');
        console.error('Chi tiết lỗi:\n', err);
        process.exit(1);
    }
})();

process.on('SIGINT', async () => {
    console.log('Đang tắt ứng dụng...');
    await sails.lower(); // 🔧 Đảm bảo đóng kết nối DB, server, cleanup
    process.exit();
});

