'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressValidation = require('express-validation');

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _locationValidation = require('../../config/location-validation');

var _locationValidation2 = _interopRequireDefault(_locationValidation);

var _location = require('../controllers/location.controller');

var _location2 = _interopRequireDefault(_location);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router(); // eslint-disable-line new-cap

router.route('/:userId')
/** GET /api/locations/:userId - Get user */
.get(_location2.default.get)

/** POST /api/locations/:userId - Update user */
.post((0, _expressValidation2.default)(_locationValidation2.default.createLocation), _location2.default.create);

exports.default = router;
//# sourceMappingURL=location.route.js.map
