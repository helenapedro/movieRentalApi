const { employee } = require("../models");
const loginHelper = require('../helpers/loginHelper');
const validateLogin = require('../validate/validateLogin');
const { responseHelpers, handleServerError } = require('../helpers/responseHelper');
const { validatePut, validatePost } = require('../validate/validateEmployee');
const _ = require('lodash');

async function login(req, res) {
     const { error } = validateLogin(req.body);
     if (error) return responseHelpers(res, 400, { message: error.details[0].message });
 
     await loginHelper(req, res, employee, 'employee');
}

async function getEmployee(req, res) {
     try {
          const data = await employee.findAll({
            attributes: { exclude: ['password', 'isAdmin', 'createdAt', 'updatedAt'] },
          });

          return responseHelpers(res, 200, data);
          
     } catch (error) {
        console.error("Error fetching employees:", error);
        return handleServerError(res, error);
     }
}

async function registerEmployee(req, res) {
     const { error } = validatePost(req.body);
     if (error) return responseHelpers(res, 400, { message: error.details[0].message});

     try {
          const { email, password, firstname, lastname, isAdmin } = req.body;  

           const data = await employee.create({
               email,
               password,
               firstname,
               lastname,
               isAdmin
          });
        
          res.send(_.pick(data, ['id', 'email', 'password', 'firstname', 'lastname']));
     } catch(error) {
        return handleServerError(res, error);      
     }    
} 

async function updateEmployee(req, res) {
    const { error } = validatePut(req.body);
    if (error) return responseHelpers(res, 400, { message: error.details[0].message });
    
    const { id } = req.params;
    const updatedEmployee = _.pick(req.body, ['email', 'password', 'firstname', 'lastname']); 

    try {
        const data = await employee.findByPk(id);
        if (!data) return responseHelpers(res, 404, { message: 'Employee not found' });
    
        await data.update(updatedEmployee);
        const refreshedData = await employee.findByPk(id, {
          attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
        });
        res.send(refreshedData);
    } catch (error) {
        return handleServerError(res, error);
    }
}


module.exports = { login, getEmployee, registerEmployee, updateEmployee };
