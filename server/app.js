// We load the required packages
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var compression = require('compression');
var users = require('./routes/users');
var config = require('./config/config');

// Create our Express application
var app = express();

var mongooseConnection = mongoose.connect(appConfig.mongo.uri, appConfig.mongo.options).connection;

mongooseConnection.on('error', function(err) {
  console.log("mongoose error :- " + err.message);
});

mongooseConnection.once('open', function() {
  console.log("mongodb connection open");
});

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
var router = express.Router();
users(router);

// app.set('views', __dirname + '/client/views');
// app.set('view engine', 'jade');
app.use(compression()); // gzips responses

// We tell our app to use
// our router with the api prefix
app.use('/api', router);

// We start the server by listening to port 3000
app.listen(process.env.PORT || 3000);

console.log("Server Started!!");
