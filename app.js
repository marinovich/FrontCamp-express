const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const express = require('express');
const session = require('express-session')
const mongoose = require('mongoose');
const passport = require('passport');

const newsRouter = require('./routers/newsRouter');
const authRouter = require('./routers/authRouter');
const requestLogger = require('./routers/middlewares/requestLogger');
const errorLogger = require('./routers/middlewares/errorLogger');
const User = require('./db/models/User');

const app = express();
const LocalStrategy = require('passport-local').Strategy;
const PORT = process.env.PORT || 5000;

// initiate database
mongoose.connect(
  // TODO: get rid of showing credentials
  process.env.DATABASE_URL,
  (error) => console.log(error),
);

// bodyParser Middleware
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // to support URL-encoded bodies
app.use(cookieParser());
app.enable('trust proxy');

// express Session
app.use(session({
  proxy: true,
  secret: 'secret',
  saveUninitialized: true,
  resave: true,
}));

// passport init
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy((username, password, done) => {
  User.getUserByUsername(username, (err, user) => {
    if (err) throw err;

    if (!user) {
      return done(null, false, { message: 'Unknown User' });
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
      if (err) throw err;

      if (isMatch) {
        return done(null, user);
      }

      return done(null, false, { message: 'Invalid password' });
    });
  });
}));

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser((id, done) => {
  User.getUserById(id, (err, user) => done(err, user));
});

app.set('views', './views')
app.set('view engine', 'pug');

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin || 'http://localhost');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  next();
});

// app requests' logger middleware
app.use('/', requestLogger);

app.use('/', authRouter);
app.use('/news', newsRouter);

// app error logger middleware
app.use(errorLogger);

app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}!`);
});
