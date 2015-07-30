angular.module('dtRequest', ['dtMessage'])
	.service('requestService', [ '$q', '$http', 'UI_MESSAGE',
	function($q, $http, Message){

    var _request = function() {
      var deferred = $q.defer();
      if(this.param.method === 'post' && !angular.isDefined(this.param.data)) {
        deferred.reject("defined method post require data");
      }

      var success = function(data) {
        deferred.resolve(data);
      };

      var error = function(results) {
        var err = (results && results.message) || Message.NO_SERVER;
        deferred.reject(err);
      };

      var params = _.extend({
        handleAs: "json"
      }, this.param);

      $http(params).success(success).error(error);
      return deferred.promise;
    };

    var _doGet = function(url, data) {
      this.param = {
        params: data,
        url: url,
        method: "get"
      };
      return _request.call(this, param);
    };

    var _doPost = function(url, data) {
      this.param = {
        data: data,
        url: url,
        method: "post"
      };
      return _request.call(this, param);
    };

    var _doDelete = function(url, data) {
      this.param = {
        data: data,
        params: data,
        url: url,
        method: "delete"
      };
      return _request.call(this, param);
    };

    this.post = function(url, data) {
      return _doPost(url, data)
    };

    this.get = function(url, data) {
      return _doGet(url, data)
    };

    this.delete = function(url, data) {
      return _doDelete(url, data);
    };

	}]);


