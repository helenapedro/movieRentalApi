const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
     const Genre = sequelize.define('genre', {
          gid: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
          name: {
            type: DataTypes.STRING,   
            allowNull: false,
            unique: true,
            validate: {
               len: [5, 50],
            }
          },    
     });

     return Genre
} 

