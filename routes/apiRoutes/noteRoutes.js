//dependencies
const { filterByQuery, findById, createNewNote, validateNote, } = require("../../lib/notes");
const notes = require("../../db/db.json");

//starts instance for Router
const router = require('express').Router();

//route that the front end can request data from
//first argument is string that describes the route the client will fetch from
//second is a callback function that will execute every time that route is accessed with a GET request
router.get('/notes', (req, res) => {
    let results = notes;
    //takes in req.query as an argument and filters through the notes, returning new filtered array
    if (req.query) {
      results = filterByQuery(req.query, results);
    }
    res.json(results);
  });
  
//param route MUST come after the other GET route. this is the correct order
//req.param is specific to one single property, to retrieve a single record
router.get('/notes/:id', (req, res) => {
  const result = findById(req.params.id, notes);
  if (result) {
    res.json(result);
  } else {//if no note record exists, show this error
    res.send(404);
  }
});

//Bonus **DELETE**
router.delete('/notes/:id', (req, res) => {
  const noteId = notes.findIndex(val => val.id === Number(req.params.id));
  notes.splice(noteId, 1);
  return res.json({ message: "Deleted" });
});


//this will go to the request we just created, instead of callback function
router.post('/notes', (req, res) => {
  // set id based on what the next index of the array will be
  console.log(req.body);
  req.body.id = notes.length;

  // if any data in req.body is incorrect, send 400 error back
  if (!validateNote(req.body)) {
    res.status(400).send('The note is not properly formatted.');
  } else {
    const note = createNewNote(req.body, notes);
    res.json(note);
  }
});

  module.exports = router;