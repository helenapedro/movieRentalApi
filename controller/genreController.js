const { genre } = require('../models');
const _ = require('lodash');
const validateGenre = require('../validate/validateGenre');
const {responseHelpers, handleServerError} = require('../helpers/responseHelper');

async function getGenre(req, res) {
     try {
          const data = await genre.findAll({ 
               attributes: ['gid', 'name']
          });
          return responseHelpers(res, 200, data)
     } catch (error) {
          console.log("Error fetching genres:", error)
          return handleServerError(res, error);
     }   
}; 

async function addGenre(req, res) {
     const { error } = validateGenre(req.body);
     if (error) return responseHelpers(res, 400, { message: error.details[0].message });
     
     try {
          const { name } = req.body;
          const data = await genre.create({ name });
          res.send(_.pick(data, ['gid', 'name'])); 
     } catch (error) { 
          if (error.name === 'SequelizeUniqueConstraintError') {
               return responseHelpers(res, 400, { message: 'Genre name already exists' }); 
          }
          return handleServerError(res, error); 
     }
};

async function updateGenre(req, res) {
     const { error } = validateGenre(req.body); 
     if (error) return responseHelpers(res, 400, { message: error.details[0].message });
   
     const { id } = req.params;
     const updatedGenre = _.pick(req.body, ['name']); 

     try {
          const data = await genre.findByPk(id);
          if (!data) return responseHelpers(res, 404, { message: 'User not found' });
    
          await data.update(updatedGenre);
          const refreshedData = await genre.findByPk(id, {
               attributes: { exclude: ['gid'] },
          });
          res.send(refreshedData);
     } catch (error) { 
          return handleServerError(res, error); 
     }   
};

async function deleteGenre(req, res) {
     const { id } = req.params; 
     try {
          const data = await genre.findByPk(id);

          if (!data) {
               return responseHelpers(res, 200, { message: 'Successfully deleted genre' });
          }
          await data.destroy();
          return responseHelpers(res, 200, { message: 'Genre deleted successfully' });

     } catch (error) { return handleServerError(res, error); }
}

async function getGenreById(req, res) {
     const { id } = req.params;
 
     try {
          const data = await genre.findByPk(id, {  
             attributes: ['gid', 'name'] 
          });
 
          if (!data) {
             return responseHelpers(res, 404, { message: 'Genre not found' });  // If the genre doesn't exist, send a 404 response
          }
 
         return res.send(data);
     } catch (error) {
         console.error("Error fetching genre by ID:", error);
         return handleServerError(res, error); 
     }
 }
 
 module.exports = { getGenreById };
 

module.exports = { getGenre, getGenreById, addGenre, updateGenre, deleteGenre }