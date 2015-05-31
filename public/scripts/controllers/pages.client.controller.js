angular.module('samuraiSoftware')
  .controller('PagesController',
  ['$scope', '$routeParams', '$location', '$sce', '$window', 'authenticationService', 'Pages',
    function ($scope, $routeParams, $location, $sce, $window, authenticationService, Pages) {
      $scope.options = {
        allowedContent: true
      };

      $scope.authenticated = authenticationService;

      $scope.create = function () {
        var page = new Pages({
          title: this.title,
          homePage: this.homePage,
          seoTitle: this.seoTitle,
          content: this.content
        });

        page.$save(function (response) {
          $location.path('pages/' + response._id);
        }, function (errorResponse) {
          $scope.error = errorResponse.data.message;
        });
      };

      $scope.find = function () {
        if (authenticationService.user != null) {
          $scope.pages = Pages.query();
        }
      };

      $scope.findOne = function () {
        $scope.page = Pages.get({
          pageId: $routeParams.pageId
        }, function () {
          $scope.trustedContent = $sce.trustAsHtml($scope.page.content);
        });
      };

      $scope.findOneView = function () {
        var pages = Pages.bySeoTitle({
          seoTitle: $routeParams.seoTitle
        }, function () {
          $scope.page = pages[0];
          $window.document.title = $scope.page.title;
          $scope.trustedContent = $sce.trustAsHtml($scope.page.content);
        });
      };

      $scope.update = function () {
        $scope.page.$update(function () {
            $location.path('/' + $scope.page.seoTitle);
          },
          function (errorResponse) {
            $scope.error = errorResponse.data.message;
          });
      };

      $scope.delete = function (page) {
        if (page) {
          page.$remove(function () {
            for (var i in $scope.pages) {
              if ($scope.pages[i] === page) {
                $scope.pages.splice(i, 1);
              }
            }
          });
        } else {
          $scope.page.$remove(function () {
            $location.path('pages')
          });
        }
      }

    }]);