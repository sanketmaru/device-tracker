angular.module('dtAuthentication')
  .service('authenticationService', ['$q', 'requestService', 'Config',
  function($q, requestService, Config){

    this.login = function(){
      var deferred = $q.defer();
      requestService.post(Config.endPoint.login, user)
        .then(function(res){
          deferred.resolve(res);
        }).catch(function(err){
          deferred.reject(err);
        });
      return deferred.promise;

    };


    this.signUp = function(user){
      var deferred = $q.defer();
      requestService.post(Config.endPoint.signup, user)
        .then(function(res){
          deferred.resolve(res);
        }).catch(function(err){
          deferred.reject(err);
        });
      return deferred.promise;
    };




  }]);
