const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');

function tokenForUser(user) {
  const timeStamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timeStamp }, config.secret);
}

exports.signin = function(req, res, next) {
  res.send( { toke: tokenForUser(req.user) });
};

exports.signup = function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(422).send({ error: 'You must provide an email and a password' });
  }

  // Check if user exists
  User.findOne( { email: email }, function(err, existingUser) {
    if (err) { return next(err); }

    // User exists
    if (existingUser) {
      return res.status(422).send( { error: 'Email is in use' });
    }

    const user = new User(
      {
        emai: email,
        password: password
      });

      user.save(function(err) {
        if (err) { return next(err); }

        res.json({ token: tokenForUser(user) });
      });

  });
};
