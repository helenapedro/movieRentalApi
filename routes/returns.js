const express = require('express');
const router = express.Router();
const returnsController = require('../controller/returnController');

router.post('/returns', returnsController.processReturn);

module.exports = router;
