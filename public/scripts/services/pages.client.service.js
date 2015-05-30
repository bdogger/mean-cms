angular.module('samuraiSoftware')
  .factory('Pages', ['$resource', function ($resource) {
    return $resource('/api/pages/:pageId', {
      pageId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }]);