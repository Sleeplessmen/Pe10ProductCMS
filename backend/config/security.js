module.exports.security = {

    cors: {
        allRoutes: true,
        allowOrigins: ['http://localhost:5173'], // 👈 Mảng chuỗi
        // allowOrigins: ['https://myapp.com']
        allowCredentials: true,
        allowRequestHeaders: 'content-type, authorization',
    },

    // csrf: false

};
