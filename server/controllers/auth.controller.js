'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _httpStatus = require('http-status');

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _APIError = require('../helpers/APIError');

var _APIError2 = _interopRequireDefault(_APIError);

var _config = require('../../config/config');

var _config2 = _interopRequireDefault(_config);

var _user = require('../models/user.model');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// sample user, used for authentication
// const user = {
//   username: 'react',
//   password: 'express'
// };

/**
 * Returns jwt token if valid username and password is provided
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function login(req, res, next) {
  // Ideally you'll fetch this from the db
  // Idea here was to show how jwt works with simplicity
  console.log('Username is', req.body.username);

  _user2.default.getByUsernamePassword(req.body.username, req.body.password).then(function (user) {
    var token = _jsonwebtoken2.default.sign({
      username: user[0].username
    }, _config2.default.jwtSecret);

    return res.json({
      token: token,
      username: user[0].username,
      _id: user[0].id
    });
  }).catch(function (e) {
    var err = new _APIError2.default('Authentication error', _httpStatus2.default.UNAUTHORIZED, true);
    next(err);
  });
}

/**
 * This is a protected route. Will return random number only if jwt token is provided in header.
 * @param req
 * @param res
 * @returns {*}
 */
function getRandomNumber(req, res) {
  // req.user is assigned by jwt middleware if valid token is provided
  return res.json({
    user: req.user,
    num: Math.random() * 100
  });
}

exports.default = { login: login, getRandomNumber: getRandomNumber };
//# sourceMappingURL=auth.controller.js.map
