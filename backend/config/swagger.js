module.exports.swagger = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Product CMS API Documentation',
            version: '1.0.0',
            description: 'Tài liệu API cho hệ thống quản lý sản phẩm và có phân quyền người dùng'
        },
        servers: [
            {
                url: 'http://localhost:1337',
                description: 'Local dev server'
            }
        ],
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        },
        security: [
            {
                BearerAuth: []
            }
        ]
    },
    apis: ['./api/controllers/*.js', './routes/swagger/*.yaml'], // nơi chứa mô tả Swagger (JSDoc)
};
