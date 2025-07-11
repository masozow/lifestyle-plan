const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const config = {
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',

};

module.exports = config;