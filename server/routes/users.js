"use strict";
var authenticationCtrl = require("../app/controllers/authentication-controller"),
  auth = require('../middleware/auth');

module.exports = function(router) {

  router.route('/users/login').post(authenticationCtrl.login);
  router.route('/users/register').post(authenticationCtrl.signUp);

};
