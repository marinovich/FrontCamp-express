const User = require('../db/models/User');

module.exports = () => {
  const newUser = new User({
    name: 'User',
    email: '',
    username: 'User',
    password: 'User2019',
  });

  User.createUser(newUser, (err, user) => err ? console.error(err) : console.log(user));
};
