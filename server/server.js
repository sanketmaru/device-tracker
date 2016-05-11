var http = require('http');
var express = require('express');
var mongoose = require('mongoose');
var compression = require("compression"),
bodyParser = require('body-parser'),
morgan = require('morgan'),
fs = require("fs"),
multer = require("multer");

var app = express();

app.use(compression()); // gzips responses
app.use(bodyParser.urlencoded({ extended: false,limit: '1mb'}));
app.use(bodyParser.json({limit: '1mb'}));

// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(process.cwd() + '/logs/access.log', {
  flags: 'a'
})

// setup the logger
app.use(morgan('combined', {
  stream: accessLogStream
}));

app.set('port', process.env.PORT || 3000);


// get an instance of the express Router
var router = express.Router();

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

app.use(function(req, res, next) {
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");

    next();
});

router.use(function(req, res, next) {
  console.log('%s %s %s', req.method, req.url, req.path);
  next();
});

router.get('/signup', function(req, res) {
  res.json({
    message: 'hooray! welcome to our api!'
  });
});

mongoose.connect('mongodb://localhost/trackerdb');

mongoose.connection.on('error', function(err) {
	console.error('MongoDB connection error: ' + err);
	process.exit(-1);
	}
);

app.listen(app.get("port"), function() {
  console.log("App started on port : " + app.get("port"));
});
