import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  dialect: "mysql",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "3007"),
  database: process.env.DB_NAME ,
  username: process.env.DB_USER ,
  password: process.env.DB_PASSWORD ,
  logging: true, 
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

export default sequelize;