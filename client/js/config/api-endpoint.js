angular.module('dtConfig', [])
  .factory('Config', function(){

    return {

      endPoint: {
        login : '/api/users/login',
        signup : '/api/users/register'
      }

    }

  });
