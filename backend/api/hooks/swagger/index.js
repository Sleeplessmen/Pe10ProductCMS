const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

module.exports = function swaggerHook(sails) {
    return {
        initialize: async function (cb) {
            const app = sails.hooks.http.app;
            const swaggerSpec = swaggerJsdoc(sails.config.swagger);

            app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

            sails.log.info('📘 Swagger UI chạy tại http://localhost:1337/docs');
            return cb();
        }
    };
};
