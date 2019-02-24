const logger = require('../../services/logger');

module.exports = (err, req, res, next) => {
  logger.log('error', err);

  res.render('error', { error: { status: 404, message: err } });
};
