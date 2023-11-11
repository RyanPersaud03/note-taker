// Import required modules
const express = require('express');
const path = require('path');
const api = require('./routes/index.js');

// Set port for sever to listen on
const PORT = process.env.port || 3001;

// Create an instance of the Express application
const app = express();


// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Define a GET route for the homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// Define a GET route for the '/notes' path 
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// Start the server and listen on the specified port
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);

