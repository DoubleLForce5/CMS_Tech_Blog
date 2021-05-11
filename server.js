// Require express to use software
const express = require('express');
// Node js module to deal with file paths 
const path = require('path');
// Sets up rout 
const routes = require('./controllers');
// Sets up handlebars - step 1
const exphbs = require('express-handlebars');
// Create db connection 
const sequelize = require('./config/connection')

// Set up express app
const app = express();
const PORT = process.env.PORT || 3001;

// Sets up handlebars engine - step 2
const hbs = exphbs.create({})

// set-up handlebars - step 3
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars')

// Sets up express to handle data parsing 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

// Allows access to the files within the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Allows access to controllers folder which contain the API routes
app.use(routes); 

// Start server - creates new tables according to the schema specified in the model - force:false = if you modify data sequalize will know 
sequelize.sync({force: false}).then(() => {
  app.listen(PORT, () => console.log('Now listening!'));
});