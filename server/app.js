// We load the required packages
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var compression = require('compression');
var users = require('./routes/users');
var config = require('./config/config');

// Create our Express application
var app = express();

var router = express.Router();

var mongooseConnection = mongoose.connect(appConfig.mongo.uri, appConfig.mongo.options).connection;

mongooseConnection.on('error', function(err) {
  console.log("mongoose error :- " + err.message);
});

mongooseConnection.once('open', function() {
  console.log("mongodb connection open");
});

app.use(compression()); // gzips responses

// Use the body-parser package in our application
// The body parser will let us parse the url-encoded http requests
// The "extended" syntax allows for rich objects and arrays to be encoded into
// the urlencoded format, allowing for a JSON-like experience with urlencoded.
app.use(bodyParser.urlencoded({
  extended: true
}));

// Create our router that
// will route the requests to the corresponding
// resources
app.use('/api', router);

users(router);



router.get('/', function(req, res) {
  res.json({
    message: 'hooray! welcome to our api!'
  });
});



// We start the server by listening to port 9001
app.listen(process.env.PORT || appConfig.port);

console.log("Server Started on port" + appConfig.port);
