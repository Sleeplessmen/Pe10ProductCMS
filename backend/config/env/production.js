module.exports = {
    datastores: {
        default: {
            adapter: 'sails-mongo',
            url: process.env.MONGO_URI,
        },
    },

    models: {
        migrate: 'safe',
    },

    blueprints: {
        shortcuts: false,
    },

    security: {
        cors: {
            allowOrigins: ['https://your-frontend-url.com'], // ⚠️ Đổi thành URL FE thực tế
            allowCredentials: true,
        },
    },

    session: {
        cookie: {
            secure: true,
            maxAge: 24 * 60 * 60 * 1000, // 24h
        },
    },

    sockets: {
        onlyAllowOrigins: [
            'https://your-frontend-url.com', // ⚠️ Nếu bạn dùng socket.io
        ],
    },

    log: {
        level: 'debug', // Có thể để 'info' nếu bạn muốn ít log hơn
    },

    http: {
        trustProxy: true,
        cache: 365.25 * 24 * 60 * 60 * 1000,
    },

    port: process.env.PORT || 1337,

    custom: {
        baseUrl: 'https://your-backend-url.com', // ⚠️ Thay bằng domain thật nếu có
        internalEmailAddress: 'support@your-backend-url.com',
    },
};
