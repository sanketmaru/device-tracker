"use strict";
var _ = require('underscore');
var authService = require('../services/authentication-service');
var logger = require("../../lib/logger");
var requestHandler = require("../../middleware/requesthandler");

/**
 * This action is used to sign in user
 *
 * .signin()
 *
 * @param req contains  username,password,orgId,userrole
 * @param res
 */
exports.login = function(req, res) {
  var authParams = _.pick(req.body, 'email', 'password');
  var referer = req.headers.referer;

  var serviceParams = _.extend(authParams, {
    referer: referer
  });
  requestHandler.handle(req, res, authService.authenticate, serviceParams);
};

exports.signUp = function(req, res){
  var authParams = _.pick(req.body, 'username', 'password', 'orgId', 'userrole');
  var referer = req.headers.referer;

  var serviceParams = _.extend(authParams, {
    referer: referer
  });
  requestHandler.handle(req, res, authService.authenticate, serviceParams);
};
