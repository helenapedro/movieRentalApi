const Joi = require('joi');
const PasswordComplexity = require("joi-password-complexity");
const complexityOptions  = require('../helpers/complexityOptions');

function validatePost(employee) {
    const schema = Joi.object({
        firstname: Joi.string().min(1).max(64).required(),
        lastname: Joi.string().min(1).max(64).required(),
        ssn: Joi.string().max(32).allow(null, ""),
        email: Joi.string().min(1).max(64).email().required(),
        password: PasswordComplexity(complexityOptions), 
    });

    
    return schema.validate(employee); 
}

async function validatePut(employee) {
     const schema = Joi.object({
          firstname: Joi.string().min(1).max(64).required(),
          lastname: Joi.string().min(1).max(64).required(),
          ssn: Joi.string().max(32).allow(null, ""), 
          gender: Joi.string().valid('M', 'F', 'O').max(1).allow(null, ""),
          phone_number: Joi.string().max(32).allow(null, ""),
          birthdate: Joi.date().max(new Date().setDate(new Date().getDate() - 1)).allow(null, ""),
          address: Joi.string().max(256).allow(null, "")
     });
  
     return schema.validate(employee);
}

module.exports = { validatePost, validatePut}; 
