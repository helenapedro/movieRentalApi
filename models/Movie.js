module.exports = (sequelize, DataTypes) => {
     const Movie = sequelize.define('movie', {
         mid: {
             type: DataTypes.INTEGER,
             primaryKey: true,
             autoIncrement: true
         },
         title: {
             type: DataTypes.STRING,   
             allowNull: false,
             unique: true,
             validate: {
                 notEmpty: true,
                 len: [1, 64],
             }
         },
         gid: { 
             type: DataTypes.INTEGER,
             references: {
                 model: 'genres', 
                 key: 'gid',
             }
         },
         releaseYear: {
             type: DataTypes.INTEGER,
             allowNull: true,
         },
         numberInStock: {
             type: DataTypes.INTEGER,
             allowNull: false,
             validate: {
                 min: 0,
                 max: 255
             }
         },
         dailyRentalRate: {
             type: DataTypes.DECIMAL(5, 2),
             allowNull: false,
             validate: {
                 min: 0
             }
         },
     });
 
     Movie.associate = function(models) {
         Movie.belongsTo(models.genre, {
             foreignKey: 'gid',
             as: 'genre'
         });
     };
   
     return Movie;
 };
 