"use strict";

let Sequelize = require('sequelize'),
  db;

db = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  port: process.env.DB_PORT,
  logging: false,
    query:{ raw:true },

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },

  timezone: process.env.TIMEZONE
});

module.exports = db;
