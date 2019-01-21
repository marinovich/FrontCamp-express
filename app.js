const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const router = require('./router');
const logger = require('./logger');

app.set('views', './views')
app.set('view engine', 'pug');

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true,
})); 

// express-winston logger makes sense BEFORE the router
app.use('/', (req, res, next) => {
  logger.log(
    'info', 
    `method: ${req.method}, params: ${JSON.stringify(req.params)}, body: ${JSON.stringify(req.body)}`,
  );

  next();
});

// Now we can tell the app to use our routing code:
app.use('/news', router);

// express-winston errorLogger makes sense AFTER the router.
app.use((err, req, res, next) => {
  logger.log('error', err);

  res.render('error', { error: { status: 404, message: err } });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
