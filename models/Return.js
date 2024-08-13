module.exports = (sequelize, DataTypes) => {
     const Return = sequelize.define('return', {
         returnId: {
             type: DataTypes.INTEGER,
             primaryKey: true,
             autoIncrement: true
         },
         rentalId: {
             type: DataTypes.INTEGER,
             references: {
                 model: 'rentals',
                 key: 'rid'
             },
             allowNull: false,
         },
         returnDate: {
             type: DataTypes.DATE,
             allowNull: false,
             defaultValue: DataTypes.NOW
         },
     });
 
     Return.associate = function(models) {
         Return.belongsTo(models.rental, {
             foreignKey: 'rentalId',
             as: 'rental'
         });
     };
 
     return Return;
 };
 