module.exports = (sequelize, DataTypes) => {
     const Rental = sequelize.define('rental', {
          rid: {
             type: DataTypes.INTEGER,
             primaryKey: true,
             autoIncrement: true
          },
          movieId: {
               type: DataTypes.INTEGER,
               references: {
                    model: 'movies',
                    key: 'mid'
               },
               allowNull: false,
          },
          userId: {
                    type: DataTypes.INTEGER,
                    references: {
                    model: 'users',
                    key: 'uid'
               },
               allowNull: false
          },
          rentalDate: {
               type: DataTypes.DATE,
               allowNull: false
          },
          returnDate: {
               type: DataTypes.DATE,
               allowNull: true,
          },
     });
 
     Rental.associate = function(models) {
          Rental.belongsTo(models.movie, {
              foreignKey: 'movieId',
              as: 'movie'
          });
          Rental.belongsTo(models.user, {
             foreignKey: 'userId',
             as: 'user'
          });
     };

     return Rental;
};
 