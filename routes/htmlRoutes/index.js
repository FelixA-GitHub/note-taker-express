const path = require('path');
const router = require('express').Router();

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