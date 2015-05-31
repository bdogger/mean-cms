var Page = require('mongoose').model('Page');

exports.create = function (req, res, next) {
  var page = new Page(req.body);

  page.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      if (page.homePage) {
        Page.update({_id: {$ne: page.id}, homePage: true}, {$set: {homePage: false}}, {multi: true}).exec();
      }
      res.json(page);
    }
  });

};

exports.list = function (req, res, next) {
  var query = {};
  if (req.query.home) {
    query.homePage = true;
  } else if (req.query.seoTitle) {
    query.seoTitle = req.query.seoTitle;
  }

  Page.find(query).sort('-created').exec(function (err, pages) {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      res.json(pages);
    }
  });
};

exports.read = function (req, res) {
  res.json(req.page);
};

exports.pageById = function (req, res, next, id) {
  Page.findById(id).exec(function (err, page) {
    if (err) return next(err);
    if (!page) return next(new Error('Failed to load article ' + id));

    req.page = page;
    next();
  });
};

exports.update = function (req, res, next) {
  var isHomePage = req.body.homePage;

  Page.findByIdAndUpdate(
    req.page.id,
    req.body,
    function (err, page) {
      if (err) {
        return next(err);
      } else {
        if (isHomePage) {
          Page.update({_id: {$ne: page.id}, homePage: true}, {$set: {homePage: false}}, {multi: true}).exec();
        }
        res.json(page);
      }
    });
};

exports.delete = function (req, res, next) {
  req.page.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      res.json('');
    }
  });
};

var getErrorMessage = function (err) {
  if (err.errors) {
    for (var errName in err.errors) {
      if (err.errors[errName].message) {
        return err.errors[errName].message;
      }
    }
  } else {
    return 'Unknown server error';
  }
};