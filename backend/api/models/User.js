module.exports = {
    attributes: {
        email: {
            type: 'string',
            unique: true,
            required: true,
            isEmail: true
        },
        password: {
            type: 'string',
            required: true
        },
        role: {
            type: 'string',
            isIn: ['user', 'admin'],
            defaultsTo: 'user'
        }
    }
};
