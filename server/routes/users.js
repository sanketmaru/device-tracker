"use strict";
var authenticationCtrl = require("../app/controllers/authentication-controller"),
  middleware = require('../middleware'),
  isAuthenticated = middleware.auth.isAuthenticated;

module.exports = function(router) {

  router.route('/users/login').post(isAuthenticated, authenticationCtrl.login);
  router.route('/users/register').post(authenticationCtrl.signUp);

};
