// @ts-nocheck
const sails = require('sails');
const arg = process.argv[2];

sails.lift(
    { hooks: { grunt: false }, log: { level: 'warn' } },
    async (err) => {
        if (err) {
            return console.error('Sails lift failed:', err);
        }

        const seedPath = {
            '--users': './api/seeds/seedUsers',
            '--products': './api/seeds/seedProducts',
            '--all': './api/seeds/seedAll',
        };

        if (!seedPath[arg]) {
            console.log('Sai tham số. Dùng: --users | --products | --all');
            return sails.lowerSafe();
        }

        await require(seedPath[arg])();
        sails.lowerSafe();
    }
);
