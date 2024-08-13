const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME, 
  process.env.DB_USER, 
  process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'mysql', 
    port: 3306,
    pool: { 
      max: 100, 
      min: 0,  
      acquire: 30000, 
      idle: 10000 
    }
});

sequelize.authenticate()
  .then(() => console.log('Connected to the database...'))
  .catch(err => 
    console.error('Unable to connect to the database:', err)
  );

module.exports = sequelize;
