const { user } = require("../models");
const validate = require('../validate/validate');
const { handleServerError } = require('../helpers/responseHelper');
const bcrypt = require('bcrypt');
const _ = require('lodash');


async function postAuthenticatedUser(req, res) {
     // Validate the request body
     const { error } = validate(req.body); 
     if (error) return res.status(400).send(error.details[0].message);
 
     try {
         const { email, password } = req.body;
 
         // Find the user by email
         let data = await user.findOne({ where: { email } });
         if (!data) return res.status(400).send('Invalid email or password.');
         
         // Compare the provided password with the stored hashed password
         const validPassword = await bcrypt.compare(password, data.password);
         if (!validPassword) return res.status(400).send('Invalid email or password.');
         
         // Generate a token 
         const token = data.generateAuthToken();
         res.send(token);
     } catch (error) {
         // Handle server errors
         return handleServerError(res, error);      
     }    
}
 
module.exports = { postAuthenticatedUser };