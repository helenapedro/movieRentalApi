const express = require('express');
const { getMovie, getMovieById, addMovie, updateMovie, deleteMovie } = require('../controller/movieController');
const router = express.Router();


router.get('/', getMovie);

router.get('/:id', getMovieById);

router.post('/create', addMovie);

router.put('/update/:id', updateMovie);

router.delete('/delete/:id', deleteMovie);

module.exports = router;
