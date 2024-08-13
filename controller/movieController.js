const { movie, genre } = require('../models');
const validateMovie = require('../validate/validateMovie');
const { responseHelpers, handleServerError } = require('../helpers/responseHelper'); 
const _ = require('lodash');

async function getMovie(req, res) {
    try {
        const data = await movie.findAll({
            include: [{ model: genre, as: 'genre' }]
        });
        return responseHelpers(res, 200, data);
    } 
    catch (error) {
        console.error("Error fetching movies:", error);
        return handleServerError(res, error);
    }
}

async function getMovieById(req, res) {
    const { id } = req.params;
    try {
        const data = await movie.findByPk(id, {
            include: [{ model: genre, as: 'genre' }]
        });
        if (!data) {
            return responseHelpers(res, 404, { message: 'The movie with the given ID was not found.' });
        }
        return res.send(data);
    } catch (error) {
        console.error("Error fetching movie by ID:", error);
        handleServerError(res, error);
    }
}

async function addMovie(req, res) {
    const { error } = validateMovie(req.body);
    if (error) return responseHelpers(res, 400, { message: error.details[0].message });

    try {
        const genreData = await genre.findByPk(req.body.gid);
        if (!genreData) return responseHelpers(res, 400, { message: 'Invalid genre.' });

        const { title, numberInStock, dailyRentalRate, releaseYear, gid } = req.body;
        
        // Normalize the title before searching
        const normalizedTitle = title.trim().toLowerCase();

        // Check if a movie with the same normalized title already exists
        const existingMovie = await movie.findOne({ where: { title: normalizedTitle } });
        if (existingMovie) {
            return responseHelpers(res, 400, { message: 'Movie name already exists' });
        }
        
        const data = await movie.create({ 
            title: normalizedTitle, 
            gid, 
            numberInStock, 
            dailyRentalRate, 
            releaseYear 
        });
        return res.send(_.pick(data, ['mid', 'title', 'gid', 'numberInStock', 'dailyRentalRate', 'releaseYear']));
     } 
     catch (error) {
          return handleServerError(res, error); 
    }
}

async function updateMovie(req, res) {
    const { error } = validateMovie(req.body);
    if (error) return responseHelpers(res, 400, { message: error.details[0].message });

    try {
        const genreData = await genre.findByPk(req.body.gid);
        if (!genreData) return responseHelpers(res, 400, { message: 'Invalid movie.' });

        const { id } = req.params;
        const updateData = _.pick(req.body, [
            'title', 
            'gid', 
            'numberInStock', 
            'dailyRentalRate', 
            'releaseYear'
        ]);

        const movieData = await movie.findByPk(id);
        if (!movieData) return responseHelpers(res, 404, { message: 'Movie with the given ID was not found.' });

        await movieData.update(updateData);
        const refreshedData = await movie.findByPk(id, {
            include: [{ model: genre, as: 'genre' }]
        });
        return res.send(refreshedData);
    } catch (error) {
        return handleServerError(res, error);
    }
}

async function deleteMovie(req, res) {
    const { id } = req.params; 
    try {
        const data = await movie.findByPk(id);
        if (!data) {
            return responseHelpers(res, 404, { message: 'The movie with the given ID was not found.' });
        }
        await data.destroy();
        return responseHelpers(res, 200, { message: 'Movie deleted successfully' });
    } catch (error) { 
        return handleServerError(res, error); 
    }
}

module.exports = { getMovie, getMovieById, addMovie, updateMovie, deleteMovie };
