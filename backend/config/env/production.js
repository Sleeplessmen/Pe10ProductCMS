module.exports = {
    models: {
        migrate: 'safe',
    },
    blueprints: {
        shortcuts: false,
    },
    security: {
        cors: {
            allowOrigins: ['https://your-frontend-url.com'],
            allowCredentials: true,
        },
    },
    session: {
        cookie: {
            secure: true,
            maxAge: 24 * 60 * 60 * 1000,
        },
    },
    log: {
        level: 'info',
    },
    http: {
        trustProxy: true,
        cache: 365.25 * 24 * 60 * 60 * 1000,
    },
    port: process.env.PORT || 1337,
    custom: {
        baseUrl: 'https://pe10productcms.onrender.com',
        internalEmailAddress: 'support@your-backend-url.com',
    },
};
