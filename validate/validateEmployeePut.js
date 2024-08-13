const Joi = require('joi');

async function validateEmployeePut(employee) {
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
module.exports = validateEmployeePut;