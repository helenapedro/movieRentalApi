const { rental, movie, user } = require('../models'); 
const validateRental = require('../validate/validateRental')
const { responseHelpers, handleServerError} = require('../helpers/responseHelper'); 
const _ = require('lodash');


async function getRental(req, res) {
     try {
          const data = await rental.findAll({ 
               include: [
                    { model: movie, as: 'movie' },
                    { model: user, as: 'user' },
               ],
               order: [['rentalDate', 'DESC']] 
          });
          
          return responseHelpers(res, 200, data);
     }
     catch (error) {
          console.error("Error fetching rentals:", error);
          return handleServerError(res, error);
     }
}

async function getRentalById(req, res) {
     const { id } = req.params;
     try {
          const data = await rental.findByPk(id, {
               include: [
                    { model: movie, as: 'movie' },
                    { model: user, as: 'user' },
               ],
          });
          if (!data) {
               return responseHelpers(res, 404, { message: 'The rental with the given ID was not found.' });  
          }
               
          return res.send(data);

     } catch (error) {
        console.error("Error fetching rental by ID:", error);
        return handleServerError(res, error);
    }
}

async function addRental(req, res) {
     const { error } = validateRental(req.body);
     if (error) return responseHelpers(res, 400, { message: error.details[0].message });

     const { movieId, userId, rentalDate, returnDate } = req.body;
     try {
          const movieData = await movie.findByPk(movieId);
          if (!movieData) return res.status(400).send('Invalid movie.');
          
          if (movieData.numberInStock === 0) return res.status(400).send('Movie not in stock.');
          
          movieData.numberInStock -= 1;
          await movieData.save();

          const data = await rental.create({ movieId, userId, rentalDate, returnDate }); 
          

          return res.send({
               rental: _.pick(data, ['rid', 'movieId', 'userId', 'rentalDate', 'returnDate']),
               updatedStock: movieData.numberInStock
          });
     } catch (error) {
          console.error("Error adding rental:", error);
          return handleServerError(res, error);
     }
}

module.exports = { getRental, getRentalById, addRental };
