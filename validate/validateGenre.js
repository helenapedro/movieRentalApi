const Joi = require('joi');

async function validateGenre(genre) {
     const schema = Joi.object({
          name: Joi.string().min(3).required(),
     });
  
     return schema.validate(genre);
}
module.exports = validateGenre;