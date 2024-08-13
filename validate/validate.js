const Joi = require('joi');

function validate(req) {
    const schema = Joi.object({
        email: Joi.string().min(1).max(64).email().required(),
        password: Joi.string().min(5).max(255).required() 
    });

    
    return schema.validate(req); 
}

module.exports = validate; 
