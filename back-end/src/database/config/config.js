require('dotenv').config();

const environment = process.env.NODE_ENV || "test";

const suffix = {
  prod: "",
  production: "",
  dev: "-dev",
  development: "-dev",
  test: "-test",
};

const options = {
  host: process.env.DB_HOST  || 'localhost',
  port: process.env.DB_PORT || '3306',
  database:
    `${process.env.DB_NAME || 'recipes-app'}${suffix[environment] || suffix.test}`,
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '123123',
  dialect: 'mysql',
  dialectOptions: {
    timezone: 'Z',
  },
  logging: false,
};

module.exports = {
  development: {
    ...options,
  },
  test: {
    ...options,
  },
  production: {
    ...options,
  },
};