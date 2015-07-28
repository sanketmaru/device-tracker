// Load MongoDB driver
var mongoose = require('mongoose');

// Define our User schema
var UserSchema = new mongoose.Schema({
  emailId: String,
  photo: String
});

// We bind the user model to the UserSchema
module.exports = mongoose.model('User', UserSchema);
