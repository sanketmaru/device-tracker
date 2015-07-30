// Load MongoDB driver
var mongoose = require('mongoose');

// Define our User schema
var UserSchema = new mongoose.Schema({
  email: String,
  photo: String,
  password: String //TODO:- has the password
});

// We bind the user model to the UserSchema
module.exports = mongoose.model('User', UserSchema);
