const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

app.use(cors());
// Set up a whitelist and check against it:


// Then pass them to cors:


// Require Notes routes
require('./app/routes/pdf.routes.js')(app);

// listen for requests
app.listen(8000, () => {
    console.log("Server is listening on port 8000");
});
