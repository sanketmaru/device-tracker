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
	      controller: "LoginCtrl"
	    })
	    .state('register', {
	      url: "/edit",
	      templateUrl: "templates/register.html",
	      controller: "RegisterCtrl"
	    });
  }
]);
