angular.module('dtAuthentication')
	.controller('AuthenticationCtrl', ['$scope', 'AuthenticationService','UI_MESSAGE',
		function($scope, AuthenticationService, Message){

		$scope.currentTab = 'home';

		var ENTER_KEY_EVENT = 13;

    $scope.onClickTab = function (tabName) {
      $scope.currentTab = tabName;
    };

    $scope.isActiveTab = function(tabName) {
      return tabName === $scope.currentTab;
    };

    $scope.login = function(){
    	ProductService.get()
    		.then(function(products){
    			$scope.products = products;
    		})
    		.catch(function(err){
    			alert(err.message || Message.ERROR);
    		})
    };

    $scope.register = function(){
      ProductService.get()
        .then(function(products){
          $scope.products = products;
        })
        .catch(function(err){
          alert(err.message || Message.ERROR);
        })
    };

    $scope.selectProduct = function(product){
    	$scope.searchText = "";
    	$scope.product = product;
    	$scope.readOnly = true;
    };

    $scope.editProduct = function(event){

    	if(event.keyCode === ENTER_KEY_EVENT){

        if(!$scope.product.sellingPrice || !$scope.product.name){
          alert(Message.REQUIRED_ERROR);
          return;
        }

        if(!ProductService.validSellingPrice($scope.product)){
          alert(Message.SELLING_PRICE_ERROR);
          return;
        }

    		ProductService.edit($scope.product)
    		.then(function(result){
    			alert(Message.UPDATE_SUCCESS);
          $scope.getProducts();
    		}).catch(function(err){
    			alert(err.message || Message.ERROR);
    		});
    	}

    };

    //initialized
		$scope.getProducts();

	}]);
