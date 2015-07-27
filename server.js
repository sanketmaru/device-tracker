// We load the required packages
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var compression = require('compression');

// Create our Express application
var app = express();

// Connect to the mapit database (couldnt be simpler)
mongoose.connect('mongodb://localhost:27017/mapit');

// Use the body-parser package in our application
// The body parser will let us parse the url-encoded http requests
// The "extended" syntax allows for rich objects and arrays to be encoded into
// the urlencoded format, allowing for a JSON-like experience with urlencoded.
app.use(bodyParser.urlencoded({
  extended: true
}));

// Create our router that
// will route the requests to the corresponding
// ressources
var router = express.Router();

app.set('views', __dirname + '/client/views');
app.set('view engine', 'jade');
app.use(compression()); // gzips responses


// We tell our app to use
// our router with the api prefix
app.use('/api', router);

// We start the server by listening to port 3000
app.listen(process.env.PORT || 3000);

console.log("Our server is running wouhou!!");
