require('dotenv').config()

module.exports = {
    HOST: process.env.DB_HOST,
    USER: process.env.DB_USER,
    PASSWORD: null,
    DB: process.env.DB_NAME,
    dialect: process.env.DB_DIALCET,
    dialectOptions: {
      encrypt: false ,
      options: {
        useUTC: false, // for reading from database
        requestTimeout: 90000
      },
  },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };