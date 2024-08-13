const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const constants = require('../helpers/constants'); 

module.exports = (sequelize, DataTypes) => {
     const User = sequelize.define('user', {
          uid: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
          name: {
            type: DataTypes.STRING,   
            allowNull: false,
            validate: {
               notEmpty: true,
               len: [1, 50],
            }
          },
          email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
               notEmpty: true,
               len: [5, 64],
            } 
          
          },
          password: {
               type: DataTypes.STRING(255),
               allowNull: false,
          },
     }, {
          tableName: "users"
     });

     // Password hashing before saving the user
     User.beforeSave(async (user, options) => {
          if (user.password) {
               const salt = await bcrypt.genSalt(10);
               user.password = await bcrypt.hash(user.password, salt);
          }
     });
     
     // Instance method to generate an auth token
     User.prototype.generateAuthToken = function() {
          const payload = { uid: this.uid, email: this.email };
          const token = jwt.sign(
               payload, 
               constants.JWT_SECRET, 
               { expiresIn: '1h' }
          );
          return token;
     };

     return User
} 

