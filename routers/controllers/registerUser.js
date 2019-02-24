const User = require('../../db/models/User');

module.exports = function (req, res, next) {
  const { password, password2, name, email, username } = req.body;

  if (password === password2){
    const newUser = new User({
      name,
      email,
      username,
      password,
    });

    User.createUser(newUser, (err, user) => {
      err
        ? next(err)
        : res.send(user).end();
    });
  } else {
    res.status(401).send("{errors: \"Passwords don't match\"}").end();
  }
};
