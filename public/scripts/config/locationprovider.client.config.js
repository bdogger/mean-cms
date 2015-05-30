angular.module('samuraiSoftware')
  .config(['$locationProvider', function ($locationProvider) {
    $locationProvider.hashPrefix('!');
  }]);