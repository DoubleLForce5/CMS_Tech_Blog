// Dependencies 
// Require express to use software
const express = require('express');
// Node js module to deal with file paths 
const path = require('path');
const routes = require('./controllers');

// Set up express app
const app = express ();
const PORT = process.env.PORT || 3001;

// Sets up express to handle data parsing 
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 

// Allows access to the files within the public folder
app.use(express.static(path.join(_dirname, 'public')));

// Allows access to controllers folder which contain the API routes
app.use(routes); 

