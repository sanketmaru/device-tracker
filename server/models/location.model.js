'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _httpStatus = require('http-status');

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _APIError = require('../helpers/APIError');

var _APIError2 = _interopRequireDefault(_APIError);

var _geolib = require('geolib');

var _geolib2 = _interopRequireDefault(_geolib);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * User Schema
 */
var LocationSchema = new _mongoose2.default.Schema({
  userId: {
    type: String,
    required: true
  },
  lat: {
    type: String,
    required: false
  },
  lng: {
    type: String,
    required: false
  },
  city: {
    type: String,
    required: false
  },
  streetName: {
    type: String,
    required: false
  },
  formattedAddress: {
    type: String,
    required: false
  },
  country: {
    type: String,
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
LocationSchema.method({});

/**
 * Statics
 */
LocationSchema.statics = {

  /**
   * Get locations by user Id
   * @param {userId} userId - The userId of user.
   * @returns {Promise<User, APIError>}
   */
  getByUserId: function getByUserId(userId) {
    return this.find({ userId: userId }).exec().then(function (locations) {
      if (locations) {
        return locations;
      }
      var err = new _APIError2.default('No such locations exists!', _httpStatus2.default.NOT_FOUND);
      return _bluebird2.default.reject(err);
    });
  },


  /**
   * find locations by Lat, Lng
   * @param {userId} userId - The userId of user.
   * @returns {Promise<User, APIError>}
   */
  getByLatLng: function getByLatLng(userId, lat, lng) {

    return this.getByUserId(userId) // by userId
    .then(function (locations) {
      var locationExist = false;
      for (var locKey in locations) {
        var loc = locations[locKey];

        var distance = _geolib2.default.getDistance({ latitude: lat, longitude: lng }, { latitude: loc.lat, longitude: loc.lng });

        if (distance < 5000) {
          // if lat lng is already its around 5000 mts dont store this lat lng
          locationExist = true;
          break;
        }
      }

      if (locationExist) {
        var err = new _APIError2.default('locations exists!', _httpStatus2.default.FOUND);
        return _bluebird2.default.reject(err);
      }
      return locations;
    });
  },


  /**
   * List users in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of users to be skipped.
   * @param {number} limit - Limit number of users to be returned.
   * @returns {Promise<User[]>}
   */
  list: function list() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$skip = _ref.skip,
        skip = _ref$skip === undefined ? 0 : _ref$skip,
        _ref$limit = _ref.limit,
        limit = _ref$limit === undefined ? 50 : _ref$limit;

    return this.find().sort({ createdAt: -1 }).skip(+skip).limit(+limit).exec();
  }
};

/**
 * @typedef User
 */
exports.default = _mongoose2.default.model('Location', LocationSchema);
//# sourceMappingURL=location.model.js.map
