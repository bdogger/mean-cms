angular.module('samuraiSoftware')
  .controller('IndexController', ['$scope', 'authenticationService', 'Pages', function($scope, authenticationService, Pages) {
    $scope.user = authenticationService.user;
  }]);