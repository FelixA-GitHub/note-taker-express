//dependencies
const fs = require("fs");
const path = require("path");

function filterByQuery(query, notesArray) {
    let personalityTraitsArray = [];
    // Note that we save the notesArray as filteredResults here:
    let filteredResults = notesArray;
    if (query.personalityTraits) {
      // Save personalityTraits as a dedicated array.
      // If personalityTraits is a string, place it into a new array and save.
      if (typeof query.personalityTraits === 'string') {
        personalityTraitsArray = [query.personalityTraits];
      } else {
        personalityTraitsArray = query.personalityTraits;
      }
      // Loop through each trait in the personalityTraits array:
      personalityTraitsArray.forEach(trait => {
        // Check the trait against each animal in the filteredResults array.
        // Remember, it is initially a copy of the animalsArray,
        // but here we're updating it for each trait in the .forEach() loop.
        // For each trait being targeted by the filter, the filteredResults
        // array will then contain only the entries that contain the trait,
        // so at the end we'll have an array of animals that have every one 
        // of the traits when the .forEach() loop is finished.
        filteredResults = filteredResults.filter(
          note => note.personalityTraits.indexOf(trait) !== -1
        );
      });
    }
    if (query.diet) {
      filteredResults = filteredResults.filter(note => note.diet === query.diet);
    }
    if (query.species) {
      filteredResults = filteredResults.filter(note => note.species === query.species);
    }
    if (query.name) {
      filteredResults = filteredResults.filter(note => note.name === query.name);
    }
    // return the filtered results:
    return filteredResults;
  }

//takes id and array of notes and returns a single note object
function findById(id, notesArray) {
  const result = notesArray.filter(note => note.id === id)[0];
  return result;
}

//separate function to handle taking the data from req.body and adding it to our animals.json file.
//when we post a new note, we will add it to the imported notes array from notes.json file
function createNewNote(body, notesArray) {
  const note = body;
  notesArray.push(note);
  fs.writeFileSync(//doesnt require a callback function, like fs.writeFile() does
  //path.join() joins dirname(which represents the directory of the file we execute the code in) with the notes.json file  
  path.join(__dirname, '../data/notes.json'),
    //stringify converts js array aata to JSON
    //null here means we wont edit our existing data
    //2 indicates we want to create white space between our variables to make it more readable
    JSON.stringify({ notes: notesArray }, null, 2)
  );
  return note;
}

//validates our data to make sure new note data from req.body will have a key that exists and is the right type of data
function validateNote(note) {
  if (!note.name || typeof note.name !== 'string') {
    return false;
  }
  if (!note.species || typeof note.species !== 'string') {
    return false;
  }
  if (!note.diet || typeof note.diet !== 'string') {
    return false;
  }
  if (!note.personalityTraits || !Array.isArray(note.personalityTraits)) {
    return false;
  }
  return true;
}

module.exports = {
    filterByQuery,
    findById,
    createNewNote,
    validateNote
};