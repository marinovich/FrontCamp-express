const express = require('express');
const winston = require('winston');
const expressWinston = require('express-winston');
const app = express();
const router = require('./router');

app.set('views', './views')
app.set('view engine', 'pug');

// express-winston logger makes sense BEFORE the router
app.use(expressWinston.logger({
  transports: [
    new winston.transports.Console()
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json(),
  )
}));

// Now we can tell the app to use our routing code:
app.use(router);

// express-winston errorLogger makes sense AFTER the router.
app.use(expressWinston.errorLogger({
  transports: [
    new winston.transports.Console()
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json(),
  )
}));

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
