'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

var _config = require('./config/config');

var _config2 = _interopRequireDefault(_config);

var _express = require('./config/express');

var _express2 = _interopRequireDefault(_express);

var _location = require('./server/controllers/location.controller');

var _location2 = _interopRequireDefault(_location);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NodeGeocoder = require('node-geocoder');

// config should be imported before importing any other file


var debug = require('debug')('express-mongoose-es6-rest-api:index');
var server = require('http').Server(_express2.default);

// socket connection
var io = require('socket.io')(server);

io.on('connection', function (socket) {

  socket.on('disconnect', function () {
    console.log('The user is disconnected');
  });

  socket.on('add-location', function (message) {
    _location2.default.createLocation(message).then(function (location) {
      io.emit('location', { location: location });
    }).catch(function (e) {
      io.emit('location-present');
    });
  });
});
// make bluebird default Promise
Promise = require('bluebird'); // eslint-disable-line no-global-assign

// plugin bluebird promise in mongoose
_mongoose2.default.Promise = Promise;

// connect to mongo db
var mongoUri = _config2.default.mongo.host;
_mongoose2.default.connect(mongoUri, { server: { socketOptions: { keepAlive: 1 } } });
_mongoose2.default.connection.on('error', function () {
  throw new Error('unable to connect to database: ' + mongoUri);
});

// print mongoose logs in dev env
if (_config2.default.MONGOOSE_DEBUG) {
  _mongoose2.default.set('debug', function (collectionName, method, query, doc) {
    debug(collectionName + '.' + method, _util2.default.inspect(query, false, 20), doc);
  });
}

// module.parent check is required to support mocha watch
// src: https://github.com/mochajs/mocha/issues/1912
if (!module.parent) {
  // listen on port config.port
  server.listen(_config2.default.port, function () {
    console.info('server started on port ' + _config2.default.port + ' (' + _config2.default.env + ')'); // eslint-disable-line no-console
  });
}

var options = {
  provider: 'google',

  // Optional depending on the providers
  httpAdapter: 'https', // Default
  apiKey: _config2.default.geocodeKey, // for Mapquest, OpenCage, Google Premier
  formatter: null // 'gpx', 'string', ...
};

var geocoder = NodeGeocoder(options);

global.geocoder = geocoder;
exports.default = _express2.default;
//# sourceMappingURL=index.js.map
