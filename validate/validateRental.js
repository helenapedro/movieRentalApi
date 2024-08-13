const Joi = require('joi');

async function validateRental(rental) {
     const schema = Joi.object({
          userId: Joi.string().required(),
          movieId: Joi.string().required()
     });
  
     return schema.validate(rental);
}
module.exports = validateRental;