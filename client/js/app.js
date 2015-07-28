'use strict';
angular.module('dtAuthenticate', [
	'ui.router',
	'sgProduct',
	'sgMessage',
	]).config(['$urlRouterProvider','$stateProvider',
  function($urlRouterProvider, $stateProvider) {

    $urlRouterProvider.otherwise("/login");

	  $stateProvider
	    .state('login', {
	      url: "/login",
	      templateUrl: "templates/login.html",
	      controller: "AuthenticationCtrl"
	    })
	    .state('register', {
	      url: "/signup",
	      templateUrl: "templates/register.html",
	      controller: "AuthenticationCtrl"
	    });
  }
]);
