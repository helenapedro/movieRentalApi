var express = require('express');
const { getGenre, getGenreById, addGenre, updateGenre, deleteGenre } = require('../controller/genreController');
const router = express.Router();


router.get('/', getGenre);

router.get('/:id', getGenreById);

router.post('/create',  addGenre);

router.put('/update/:id',  updateGenre);

router.delete('/delete/:id',  deleteGenre);

module.exports = router;
