module.exports = async function () {
    await require('./seedUsers')();
    await require('./seedProducts')();
    sails.log('All data seeded!');
};
