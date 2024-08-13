const { rental, movie } = require('../models');
const { responseHelpers, handleServerError } = require('../helpers/responseHelper');
const _ = require('lodash');

async function processReturn(req, res) {
    const { rentalId } = req.body;

    try {
        const rentalData = await rental.findByPk(rentalId, {
            include: [{ model: movie, as: 'movie' }]
        });

        if (!rentalData) {
            return responseHelpers(res, 404, { message: 'Rental with the given ID was not found.' });
        }

        if (rentalData.returnDate) {
            return responseHelpers(res, 400, { message: 'This rental has already been returned.' });
        }

        // Update return date
        rentalData.returnDate = new Date();
        await rentalData.save();

        // Increment movie stock
        const movieData = rentalData.movie;
        movieData.numberInStock += 1;
        await movieData.save();

        return res.send({
            message: 'Return processed successfully',
            rental: _.pick(rentalData, ['rid', 'movieId', 'userId', 'rentalDate', 'returnDate']),
            updatedStock: movieData.numberInStock
        });
    } catch (error) {
        console.error("Error processing return:", error);
        return handleServerError(res, error);
    }
}

module.exports = { processReturn };
