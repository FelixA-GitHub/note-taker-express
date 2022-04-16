const path = require('path');
const router = require('express').Router();

//using res.sendFile() to tell them where to find the file we want our server to read and send back to client
router.get('/', (req, res) => {
    //use of path here to ensure we're finding the correct location for the HTML code we want to display in the browser
    res.sendFile(path.join(__dirname, '../../public/index.html'));
  });

//this route takes us to notes specifically in the front end browser
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/notes.html'));
  });

//this accounts for a client making a request for a route that does not exist
//"*" acts as a wildcard, meaning any request not previously defined will receive the homepage as the response
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
  });
  
module.exports = router;