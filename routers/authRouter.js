const express = require('express');
const passport = require('passport');

const registerUser = require('./controllers/registerUser');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', passport.authenticate('local'), (req, res) => res.send(req.user));
router.get('/status', (req, res) => res.send(req.user ? { isLoggedIn: true } : { isLoggedIn: false }));
router.get('/logout', (req, res) => {
  req.logout();
  res.send(null);
});

module.exports = router;
