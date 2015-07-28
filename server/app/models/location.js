// Load MongoDB driver
var mongoose = require('mongoose');

// Define our location schema
var LocationSchema = new mongoose.Schema({
  longitude: Number,
  latitude: Number,
  message: String,
  userId: String
});

// We bind the Location model to the LocationSchema
module.exports = mongoose.model('Location', LocationSchema);
