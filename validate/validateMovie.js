const Joi = require('joi');

async function validateMovie(movie) {
     const schema = Joi.object({
          title: Joi.string().min(5).max(255).required(),
          gid: Joi.number().integer().required(),
          releaseYear: Joi.number().integer().optional(), 
          numberInStock: Joi.number().min(0).max(255).required(),
          dailyRentalRate: Joi.number().min(0).max(999.99).required()
     });
  
     return schema.validate(movie);
}
module.exports = validateMovie;