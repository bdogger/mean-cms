var users = require('../../app/controllers/users.server.controller'),
  pages = require('../../app/controllers/pages.server.controller');

module.exports = function (app) {
  app.route('/api/pages')
    .post(users.requiresLogin, pages.create)
    .get(pages.list);

  app.route('/api/pages/:pageId')
    .get(pages.read)
    .put(users.requiresLogin, pages.update)
    .delete(users.requiresLogin, pages.delete);

  app.param('pageId', pages.pageById);
};