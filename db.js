const { Sequelize } = require('sequelize')

const db = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        dialectOptions: {
            useUTC: true,
        },
        timezone: "+07:00",
        define: {
            timestamps: false,
        }
    },
);

module.exports = db