const express = require('express');
const { login, getUser, getUserById, registerUser, updateUser, deleteUser } = require('../controller/userController');
const authUserToken = require('../middlewares/authUserToken');
const authAdminToken = require('../middlewares/authAdminToken');
const authEmployeeToken = require('../middlewares/authEmployeeToken.js');
const router = express.Router();

router.get('/', authEmployeeToken, getUser);
router.get('/me', authUserToken, getUser);
router.get('/get/:id', authAdminToken, getUserById);

router.post('/login', login);
router.post('/create', registerUser);

router.put('/update/:id', authUserToken, updateUser);
router.delete('/delete/:id', deleteUser);

module.exports = router; 