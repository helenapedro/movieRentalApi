const Joi = require('joi');
const PasswordComplexity = require("joi-password-complexity");
const complexityOptions  = require('../helpers/complexityOptions');

function validateEmployeePost(employee) {
    const schema = Joi.object({
        firstname: Joi.string().min(1).max(64).required(),
        lastname: Joi.string().min(1).max(64).required(),
        ssn: Joi.string().max(32).allow(null, ""),
        email: Joi.string().min(1).max(64).email().required(),
        password: PasswordComplexity(complexityOptions), 
    });

    
    return schema.validate(employee); 
}

module.exports = validateEmployeePost; 
