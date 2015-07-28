var User = require('../app/models/User');
var Promise = require('bluebird');

var authenticateService = {};

/**
* Have a token based authentication for mobile as well web app to work
**/
authenticateService.login = Promise.method( function signUp(user){

  var loginQuery = {
    email: user.email,
    password: user.password //TODO:- hash the password using encryption.hashPassword
  });

  // find the user
  User.find(loginQuery)
    .then(function(res){
      // generate a token here and send a token to client to store in session storage
      console.log(res);
      return res;
    })
    .catch(function(err){
      throw new Error(err);
    });
});

authenticateService.signUp = Promise.method( function signUp(user){
  // create a new user
  var newUser = User({
    email: user.email,
    password: user.password,
    admin: user.isAdmin ? true : false
  });

  // save the user
  newUser.save()
    .then(function(res){
      console.log(res);
      return res;
    })
    .catch(function(err){
      throw new Error(err);
    });
});


module.exports = authenticateService;
