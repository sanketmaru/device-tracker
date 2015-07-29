"use strict";
var authenticationCtrl = require("../app/controllers/authentication-controller"),
  auth = require('../middleware/auth');

module.exports = function(router) {

  router.route('/users/login').post(auth.isAuthenticated, authenticationCtrl.login);
  router.route('/users/register').post(authenticationCtrl.signUp);

};
