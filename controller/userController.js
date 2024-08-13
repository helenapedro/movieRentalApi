const { user } = require("../models");
const _ = require('lodash');
const bcrypt = require('bcrypt');
const constants = require('../helpers/constants');
const genToken = require('../helpers/genToken');
 
const { responseHelpers, handleServerError } = require('../helpers/responseHelper');
const { validatePost, validatePut } = require('../validate/validateUser');
const validateLogin = require('../validate/validateLogin');
const loginHelper = require('../helpers/loginHelper'); 
const { userEmailExists } = require('../helpers/emailExists');

async function login(req, res) {
    const { error } = validateLogin(req.body);
    if (error) return responseHelpers(res, 400, { message: error.details[0].message });

    await loginHelper(req, res, user, 'user');
}

async function getUser(req, res) { 
     try {
          // Extract limit and offset from query parameters
          const limit = parseInt(req.query.limit) || 10;
          const offset = parseInt(req.query.offset) || 0;

          // Remove limit and offset from the query object to prevent them from being used in where clause
          const queryOptions = { ...req.query };
          delete queryOptions.limit;
          delete queryOptions.offset; 

          const users = await user.findAll({
            where: { ...queryOptions }, 
            attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
            limit,
            offset,
          });

          if (!users || users.length === 0) {
            return responseHelpers(res, 404, { message: 'User not found' });
          }

          res.send(users);
     } catch (error) {
        console.error("Error fetching users:", error);
        return handleServerError(res, error);
     }
}

async function getUserById(req, res) {
    const { id } = req.params;
    try {
        const data = await user.findByPk(id, {
            attributes: ['uid', 'name']
        });

        if (!data) {
            return responseHelpers(res, 404, {message: 'User not found.'});
        }
        return res.send(data);
    } catch (error) {
        console.log("Error fetching user by ID.", error);
        return handleServerError(res, error);
    }
} 

async function registerUser(req, res) {
    const { error } = validatePost(req.body);
    if (error) return responseHelpers(res, 400, { message: error.details[0].message });

    const { name, email, password } = req.body;

    try {
        // Check if the email already exists
        const isEmailTaken = await userEmailExists(email);
        if (isEmailTaken) {
            return responseHelpers(res, 400, { message: 'Email already in use' });
        }

        // Create the user
        let newUser = await user.create({
            name,
            email,
            password,
        });

        // Retrieve the user from the database to ensure we're working with the final stored data
        newUser = await user.findByPk(newUser.id, {
            attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
        });

        // Generate JSON Web Token
        const token = genToken(newUser, constants.user);

        return res.status(200)
            .header(constants.X_AUTH_TOKEN, token)
            .header(constants.ACCESS_CONTROL_EXPOSE_HEADERS, constants.X_AUTH_TOKEN)
            .send(_.pick(newUser, ['id', 'name', 'email']));

    } catch (error) {
        return handleServerError(res, error);      
    }    
}

async function updateUser(req, res) {
    const { error } = validatePut(req.body);
    if (error) return responseHelpers(res, 400, { message: error.details[0].message });
    
    const { id } = req.params;
    const updatedUser = _.pick(req.body, ['name', 'email']); 

    try {
        const data = await user.findByPk(id);
        if (!data) return responseHelpers(res, 404, { message: 'User not found' });
    
        await data.update(updatedUser);
        const refreshedData = await user.findByPk(id, {
          attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
        });
        res.send(refreshedData);
    } catch (error) {
        return handleServerError(res, error);
    }
}

async function deleteUser(req, res) {
     const { id } = req.params; 
 
     try {
         const data = await user.findByPk(id); 
         if (!data) {
             return responseHelpers(res, 404, { message: 'User not found' });
         }
 
         await data.destroy(); // Delete the user from the database
         return responseHelpers(res, 200, { message: 'User deleted successfully' });
     } catch (error) {
         return handleServerError(res, error);
     }
}

module.exports = { login, getUser, getUserById, registerUser, updateUser, deleteUser };
