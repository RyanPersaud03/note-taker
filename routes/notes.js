// Import required modules
const notes = require('express').Router();
const { readFromFile, readAndAppend,writeToFile } = require('../helpers/fsUtils');
const { v4: uuidv4 } = require('uuid');

// GET Route for retrieving all the notes
notes.get('/', (req, res) => {
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// POST Route for adding a new note
notes.post('/', (req, res) => {
  console.log(req.body);

  const { title,text } = req.body;
let newNote
  if (req.body) {
    newNote = {
      title,
      text,
      id: uuidv4(),
    };

    readAndAppend(newNote, './db/db.json');
    res.json(newNote);
  } else {
    res.error('Error in adding note');
  }
});

// DELETE Route for deleting a note by ID
notes.delete("/:id",(req, res) => {
  readFromFile('./db/db.json').then((data) => {

// Filter out the note with the specified ID
 const notes = JSON.parse(data).filter(note =>{
  return note.id!==req.params.id
 })
 // Write the updated notes back to the file
 writeToFile('./db/db.json',notes)
 // Send a success response
 res.send("success")
});
})

// Export the notes router
module.exports = notes;
