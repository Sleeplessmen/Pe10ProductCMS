module.exports.policies = {
    AuthController: {
        '*': true
    },

    // ProductController: {
    //     find: 'requireAuth',
    //     create: 'isAdmin',
    //     update: 'isAdmin',
    //     delete: 'isAdmin'
    // }
};
