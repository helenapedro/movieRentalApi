const express = require('express');
const { getEmployee, registerEmployee, updateEmployee, login } = require('../controller/employeeController');
const authAdminToken = require('../middlewares/authAdminToken');
const authEmployeeToken = require('../middlewares/authEmployeeToken.js');
const router = express.Router();

router.get('/', authAdminToken, getEmployee);
// get employee based on id
router.get('/get/:id', authAdminToken, getEmployee);
// get current authenticated employee 
router.get('/me', authEmployeeToken, getEmployee);

router.post('/login', login);
router.post('/create', authAdminToken, registerEmployee);

router.put('/update/:id', authEmployeeToken, updateEmployee);

module.exports = router;