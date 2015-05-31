angular.module('samuraiSoftware')
  .controller('IndexController', ['$scope', '$sce', 'Pages', function ($scope, $sce, Pages) {

    var results = Pages.homePage({}, function () {
      $scope.page = results[0];
      $scope.trustedContent = $sce.trustAsHtml($scope.page.content);
    });

  }]);