const dotenv = require('dotenv');
dotenv.config();

module.exports = {
     localhost: {
          host: 'localhost',
          username: process.env.DB_USER,
          password: process.env.DB_PASS,
          database: process.env.DB_NAME,
          dialect: 'mysql'
     },
     development: {
       username: process.env.DB_USER,
       password: process.env.DB_PASS,
       database: process.env.DB_NAME,
       host: process.env.DB_HOST,
       dialect: "mysql",
       port: process.env.DB_PORT,
       pool: { 
          max: 100, 
          min: 0,  
          acquire: 30000, 
          idle: 10000 
        }
     },
     "test": {
       "username": "root",
       "password": null,
       "database": "database_test",
       "host": "127.0.0.1",
       "dialect": "mysql"
     },
     production: {
          username: process.env.DB_USER,
          password: process.env.DB_PASS,
          database: process.env.DB_NAME,
          host: process.env.DB_HOST,
          dialect: "mysql",
          port: process.env.DB_PORT,
          pool: { 
             max: 100, 
             min: 0,  
             acquire: 30000, 
             idle: 10000 
           }
     }
}
   