const User = require('../models/user');

exports.signup = function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  // Check if user exists
  User.findOne( { email: email }, function(err, existingUser) {
    
  });
};
