// Require express to use software
const express = require('express');
// Node js module to deal with file paths 
const path = require('path');
// Sets up rout 
const routes = require('./controllers');

// Set up express app
const app = express();
const PORT = process.env.PORT || 3001;

// Sets up express to handle data parsing 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

// Allows access to the files within the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Allows access to controllers folder which contain the API routes
app.use(routes); 

// Start server 
app.listen(PORT, () => {
  console.log('Sever listening on: http://localhost:' + PORT)
});