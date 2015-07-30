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
      authenticationService.login($scope.user)
        .then(function(res){
          alert("Success");
        }).catch(function(err){
          alert("err");
        });
    };

    $scope.signup = function(){
      authenticationService.signUp($scope.user)
        .then(function(res){
          alert("Success");
        }).catch(function(err){
          alert("err");
        });
    };

	}]);
