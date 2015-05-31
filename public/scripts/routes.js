angular.module('samuraiSoftware')
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/',
      {
        controller: 'IndexController',
        templateUrl: '/views/home.client.view.html'
      })
      .when('/pages', {
        templateUrl: '/views/pages/list-pages.client.view.html'
      })
      .when('/pages/create', {
        templateUrl: '/views/pages/create-page.client.view.html'
      })
      .when('/:seoTitle', {
        templateUrl: '/views/pages/view-page.client.view.html'
      })
      .when('/pages/:pageId/edit', {
        templateUrl: '/views/pages/edit-page.client.view.html'
      })
      .otherwise({redirectTo: '/'});
  }]);