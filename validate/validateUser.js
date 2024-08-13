const Joi = require('joi');
const PasswordComplexity = require("joi-password-complexity");
const complexityOptions  = require('../helpers/complexityOptions');

function validatePost(user) {
     const schema = Joi.object({
          name: Joi.string().min(1).max(64).required(),
          email: Joi.string().min(1).max(64).email().required(),
          password: PasswordComplexity(complexityOptions), 
     });
  
     return schema.validate(user);
}

function validatePut(user) {
     const schema = Joi.object({
          name: Joi.string().min(1).max(64).required()
     });
  
     return schema.validate(user);
}

module.exports = {validatePost, validatePut}; 
