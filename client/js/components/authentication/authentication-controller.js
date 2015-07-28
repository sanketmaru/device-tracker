angular.module('dtAuthentication')
	.controller('AuthenticationCtrl', ['$scope', 'authenticationService','UI_MESSAGE',
		function($scope, authenticationService, Message){

		$scope.currentTab = 'login';

    $scope.user = {};

		var ENTER_KEY_EVENT = 13;

    $scope.onClickTab = function (tabName) {
      $scope.currentTab = tabName;
    };

    $scope.isActiveTab = function(tabName) {
      return tabName === $scope.currentTab;
    };

    $scope.login = function(){
      console.log("submitting User");
    };

    $scope.signup = function(){
      console.log("submitting User");
    };

	}]);
