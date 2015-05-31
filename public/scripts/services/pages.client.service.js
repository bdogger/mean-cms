angular.module('samuraiSoftware')
  .factory('Pages', ['$resource', function ($resource) {
    return $resource('/api/pages/:pageId', {
      pageId: '@_id'
    }, {
      update: {
        method: 'PUT'
      },
      bySeoTitle: {
        method: 'GET',
        isArray: true,
        params: {seoTitle: '@seoTitle'}
      },
      homePage: {
        method: 'GET',
        isArray: true,
        params: {home: true}
      }
    });
  }]);