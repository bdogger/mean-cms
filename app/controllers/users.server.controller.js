var User = require('mongoose').model('User');

exports.create = function (req, res, next) {
  var user = new User(req.body);
};

var getErrorMessage = function (err) {
  var messages = [];

  if (err.code) {
    switch (err.code) {
      case 11000:
      case 11001:
        messages.push('Username already exists');
        break;
      default:
        messages.push('Something went wrong');
    }
  } else {
    for (var errName in err.errors) {
      if (err.errors[errName].message) messages.push(err.errors[errName].message);
    }
  }
  return messages;
};

exports.renderSignin = function (req, res, next) {
  if (!req.user) {
    res.render('authentication/signin',
      {title: 'Sign-in Form', messages: req.flash('error') || req.flash('info')});
  } else {
    return res.redirect('/');
  }
};

exports.renderSignup = function (req, res, next) {
  if (!req.user) {
    res.render('authentication/signup', {
      title: 'Sign-up Form',
      messages: req.flash('error')
    });
  } else {
    return res.redirect('/');
  }
};

exports.signup = function (req, res, next) {
  if (!req.user) {
    var user = new User(req.body);
    var message = null;

    user.provider = 'local';

    user.save(function (err) {
      if (err) {
        message = getErrorMessage(err);

        req.flash('error', message);
        return res.redirect('/signup');
      }
    });
  } else {
    return res.redirect('/');
  }
};

exports.signout = function (req, res) {
  req.logout();
  res.redirect('/');
};

exports.list = function (req, res, next) {
  User.find({}, function (err, users) {
    if (err) {
      return next(err);
    } else {
      res.json(users);
    }
  });
};

exports.read = function (req, res) {
  res.json(req.user);
};

exports.userById = function (req, res, next, id) {
  User.findOne({
    _id: id
  }, function (err, user) {
    if (err) {
      return next(err);
    } else {
      req.user = user;
      next();
    }
  });
};

exports.update = function (req, res, next) {
  User.findByIdAndUpdate(
    req.user.id,
    req.body,
    function (err, user) {
      if (err) {
        return next(err);
      } else {
        res.json(user);
      }
    });
};

exports.delete = function (req, res, next) {
  req.user.remove(function (err) {
    if (err) {
      return next(err);
    }
    else {
      res.json(req.user);
    }
  });
};

exports.requiresLogin = function(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.status(401).send({
      message: 'User is not logged in'
    });
  }

  next();
};
