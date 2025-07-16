// config/env.js
const path = require('path');
require('dotenv').config({
    path: path.resolve(__dirname, '../.env'), // đảm bảo đúng vị trí file
    debug: true, // bật log nếu muốn
});
