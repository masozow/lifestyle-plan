import dotenv from "dotenv";
dotenv.config();


const config = {
    dialect: "mysql",
    development: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT),
        migrations: {
            path: '../migrations',
        }
    },
};

// console.log("Sequelize config:", {
//     user: process.env.DB_USER,
//     pass: process.env.DB_PASSWORD,
//     db: process.env.DB_NAME,
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     database: process.env.DB_NAME,
//     environment: process.env
// });

export default config;
