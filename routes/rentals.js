const express = require('express');
const { getRental, getRentalById, addRental } = require('../controller/rentalController');
const router = express.Router();


router.get('/', getRental);

router.get('/:id', getRentalById);

router.post('/create', addRental);

module.exports = router;
