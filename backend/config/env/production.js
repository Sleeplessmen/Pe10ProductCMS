module.exports = {
    datastores: {
        default: {
            adapter: 'sails-mongo',
            url: process.env.MONGO_URI, // đảm bảo biến môi trường này có trên Render
        },
    },

    models: {
        migrate: 'safe', // rất quan trọng: không làm mất dữ liệu
    },

    blueprints: {
        shortcuts: false, // tắt các route GET mặc định /controller/action
    },

    security: {
        cors: {
            allowOrigins: [
                'https://your-frontend-url.com', // ⚠️ THAY BẰNG domain frontend thật (ví dụ: Vite, React)
            ],
            allowCredentials: true, // quan trọng nếu dùng cookie
        },
    },

    session: {
        cookie: {
            secure: true, // Bắt buộc để cookie hoạt động trên HTTPS
            maxAge: 24 * 60 * 60 * 1000, // 24h
        },
    },

    sockets: {
        // Bạn có thể cấu hình Redis adapter nếu dùng socket
    },

    log: {
        level: 'info', // Gợi ý dùng 'info' hoặc 'warn' thay vì 'debug' trong production
    },

    http: {
        trustProxy: true, // Quan trọng khi deploy trên Render/Heroku để secure cookie hoạt động
        cache: 365.25 * 24 * 60 * 60 * 1000, // 1 năm
    },

    port: process.env.PORT || 1337, // Render sẽ inject PORT riêng, nên cần giữ dòng này

    custom: {
        baseUrl: 'https://pe10productcms.onrender.com', // ⚠️ THAY bằng domain thật nếu đã có custom domain
        internalEmailAddress: 'support@your-backend-url.com',
    },
};
