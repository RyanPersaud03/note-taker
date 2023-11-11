const notes = require('express').Router();
const { readFromFile, readAndAppend,writeToFile } = require('../helpers/fsUtils');
const { v4: uuidv4 } = require('uuid');

// GET Route for retrieving all the tips
notes.get('/', (req, res) => {
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// POST Route for a new UX/UI tip
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

notes.delete("/:id",(req, res) => {
  readFromFile('./db/db.json').then((data) => {

  
 const notes = JSON.parse(data).filter(note =>{
  return note.id!==req.params.id
 })
 writeToFile('./db/db.json',notes)
 res.send("success")
});
})

module.exports = notes;
