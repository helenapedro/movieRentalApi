const express = require("express");
const db = require('./models');

const app = express();

db.sequelize.sync()
  .then(() => console.log('Synced with MySQL database...'))
  .catch(err => console.error('Could not sync with the MySQL database...', err));

app.use(express.json());


require('./startup/routes')(app);
require('./startup/config')();



const port = process.env.PORT || 3001;
const server = app.listen(port, () => console.log(`Listening on port ${port}...`));