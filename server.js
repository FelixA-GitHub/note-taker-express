//dependencies
const express = require('express');
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');
//instantiates the server
const PORT = process.env.PORT || 3001;
const app = express();

//enables server to accept incoming data
//tells express.js to intercept our POST request before it gets to the the callback function
//data will be run through some functions to take the raw data transferred and convert to JSON object
//these are MIDDLEWARE functions
//every time we create a server that will serve a front end as well as JSON data, we'll always want to use this middleware.
//parse incoming string or array data
app.use(express.urlencoded({ extended: true }));

// parse incoming JSON data
app.use(express.json());

//instructs server to make public files readily avaialble and not gate it behind a server endpoint
//make sure this is above use of routes!!!!!
app.use(express.static('public'));

//for use of api and html routes
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);


//makes our server listen
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
})
