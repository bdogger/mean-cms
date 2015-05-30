angular.module('samuraiSoftware')
.factory('authenticationService', ['$window', function($window){
    var user = $window.user;

    return  {
      user: user
    };
  }]);