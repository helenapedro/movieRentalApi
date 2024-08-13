const express = require('express');
const router = express.Router();
const {postAuthenticatedUser} = require('../controller/authController');

router.post('/', postAuthenticatedUser);

module.exports = router;
