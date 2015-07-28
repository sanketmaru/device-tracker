'use strict';
angular.module('dtAuthentication', [
	'ui.router',
	'dtRequest',
	'dtMessage',
	]).config(['$urlRouterProvider','$stateProvider',
  function($urlRouterProvider, $stateProvider) {

    $urlRouterProvider.otherwise("/login");

	  $stateProvider
	    .state('login', {
	      url: "/login",
	      templateUrl: "../templates/login.html",
	      controller: "AuthenticationCtrl"
	    })
	    .state('signup', {
	      url: "/signup",
	      templateUrl: "../templates/signup.html",
	      controller: "AuthenticationCtrl"
	    });
  }
]);
