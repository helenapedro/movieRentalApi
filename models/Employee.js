const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (sequelize, DataTypes) => {
     const Employee = sequelize.define('employee', {
          eid: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
          firstname: {
            type: DataTypes.STRING,   
            allowNull: false,
            validate: {
               notEmpty: true,
               len: [1, 64],
            }
          },
          lastname: {
               type: DataTypes.STRING,   
               allowNull: false,
               validate: {
                  notEmpty: true,
                  len: [1, 64],
               }
          },
          ssn: {
               type: DataTypes.STRING,   
               allowNull: true,
               validate: {
                  notEmpty: true,
                  max: 32,
               }
          },
          gender: {
               type: DataTypes.STRING,   
               allowNull: true,
               validate: {
                  max: 1,
               }
          },
          phone_number: {
               type: DataTypes.INTEGER,
               allowNull: true,
               validate: {
                    max: 32,
               }
          },
          birthdate: {
               type: DataTypes.DATEONLY,
               allowNull: true,
               validate: {
                    notEmpty: true,
               }
          },
          address: {
               type: DataTypes.STRING(255),
               allowNull: true,
               validate: {
                    max: 256,
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
          isAdmin: {
               type: DataTypes.BOOLEAN,
               defaultValue: false, 
          },
     });

     // Password hashing before saving the employee
     Employee.beforeSave(async (employee, options) => {
          if (employee.password) {
               const salt = await bcrypt.genSalt(10);
               employee.password = await bcrypt.hash(employee.password, salt);
          }
     });

     // Instance method to generate auth token
     Employee.prototype.generateAuthToken = function () {
          const token = jwt.sign(
               { employeeID: this.eid, isAdmin: this.isAdmin },
               config.get('jwtPrivateKey'),
               { expiresIn: '1h' } 
          );
          return token;
     };
     return Employee
} 

