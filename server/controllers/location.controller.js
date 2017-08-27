'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _location = require('../models/location.model');

var _location2 = _interopRequireDefault(_location);

var _httpStatus = require('http-status');

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _APIError = require('../helpers/APIError');

var _APIError2 = _interopRequireDefault(_APIError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Get locations by userId
 * @property {string} req.params.userId - The userId of user.
 * @returns {Location}
 */
function get(req, res) {
  return _location2.default.getByUserId(req.params.userId).then(function (locations) {
    return res.json(locations);
  }).catch(function (e) {
    return next(e);
  });
}

/**
 * Create new location
 * @property {string} req.body.lat - The latitude of user.
 * @property {string} req.body.lng - The longitude of user.
 * @returns {Location}
 */
function create(req, res, next) {
  var _ref;

  var location = new _location2.default((_ref = {
    userId: req.params.userId,
    lat: req.body.lat,
    lng: req.body.lng,
    city: req.body.city,
    state: req.body.state
  }, _defineProperty(_ref, 'city', req.body.city), _defineProperty(_ref, 'street', req.body.street), _ref));

  location.save().then(function (savedLocation) {
    return res.json(savedLocation);
  }).catch(function (e) {
    return next(e);
  });
}

function createLocation(location) {
  return _location2.default.getByLatLng(location.userId, location.lat, location.lng).then(function (locations) {
    // reverse geo code
    return global.geocoder.reverse({ lat: location.lat, lon: location.lng });
  }).then(function (res) {
    var geoResponse = res[0];
    var locationObj = new _location2.default({
      userId: location.userId,
      lat: location.lat,
      lng: location.lng,
      city: geoResponse.city,
      streetName: geoResponse.streetName,
      formattedAddress: geoResponse.formattedAddress
    });
    return locationObj.save();
  }).then(function (savedLocation) {
    return savedLocation;
  }).catch(function (e) {
    var err = new _APIError2.default('locations exists!', _httpStatus2.default.FOUND);
    return Promise.reject(err);
  });
}

exports.default = { create: create, get: get, createLocation: createLocation };
//# sourceMappingURL=location.controller.js.map
