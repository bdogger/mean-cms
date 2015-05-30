angular.module('samuraiSoftware')
.directive('pagesHeader', ['Pages', function(Pages){
    return {
      templateUrl: '/templates/pages.client.header.html',
      restrict: 'E',
      link: function(scope) {
        scope.pages = Pages.query();
      }
    }
  }]);