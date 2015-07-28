"use strict";
var logger = require('../lib/logger');
var errors = require('../lib/errors/');
var _ = require('underscore');

module.exports = {
  handle: function(req, res, next, params) {
    params = _.isArray(params) ? params : [params];
    next.apply(this, params).then(function(result) {
      res.status(200).jsonp({
        result: result
      });
    }, function(err) {
      logger.debug(err);
      if(!(err instanceof errors.Exception)) {
        err = new errors.InternalServer('SERVER_ERROR');
      }
      var errorPayLoad = err.payload();
      logger.error(err.printStackTrace());
      res.status(errorPayLoad.error.code).jsonp(errorPayLoad.error);
    });
  }
};
