var Users = require("../models/user");
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('../config/config');

module.exports = function(router) {
	/* GET users listing. */
	router.post('/register', function(req, res, next) {
	  Users.saveNewUser(req.body.email,req.body.password) 
	    .then(function(user) {
	     return res.json({data : user})
	    }, function() {
	      res.status(500).send({
	        success: false,
	        message: "Something went wrong while saving user details"
	      });
	    });
	});

	router.post('/authenticate', function(req, res, next) {

		// find the user
	  Users.findOne({
	    email: req.body.email
	  }, function(err, user) {

	    if (err) throw err;

	    if (!user) {
	      res.json({ success: false, message: 'Authentication failed. User not found.' });
	    } else if (user) {

	      // check if password matches
	      if (!user.validPassword(req.body.password)) {
	        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
	      } else {

	        // if user is found and password is right
	        // create a token
	        var token = jwt.sign(user, config.secret, {
	          expiresIn: "10h" // expires in 10 hours
	        });

	        // return the information including token as JSON
	        res.json({
	          success: true,
	          token: token
	        });
	      }   

	    }

	  });

	});
}
