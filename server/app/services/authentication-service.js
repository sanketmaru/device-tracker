var User = require('../app/models/User');
var Promise = require('bluebird');

var userService = {};


userService.saveUser = Promise.method( function saveUser(user){
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
    })
    .catch(function(err){
      throw new Error(err);
    });
});


module.exports = userService;
