// Import the 'express' module
const express = require('express');

// Import the 'notesRouter' module
const notesRouter = require('./notes');

// Create an instance of the Express application
const app = express();

// Use the 'notesRouter' for routes under the '/notes' path
app.use('/notes', notesRouter);

// Export the configured Express application
module.exports = app;
