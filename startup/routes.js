const users = require('../routes/users');
const employees = require('../routes/employees');
const genres = require('../routes/genres');
const movies = require('../routes/movies');
const rentals = require('../routes/rentals');
const returns = require('../routes/returns');
const auth = require('../routes/auth');
const error = require('../middlewares/error');

module.exports = function(app) {
     app.use('/api/users', users);
     app.use('/api/employees', employees);
     app.use('/api/genres', genres);
     app.use('/api/movies', movies);
     app.use('/api/rentals', rentals);
     app.use('/api/returns', returns);
     app.use('/api/auth', auth);
     app.use(error);
}