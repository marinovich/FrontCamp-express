const logger = require('../../services/logger');

module.exports = (req, res, next) => {
  logger.log(
    'info', 
    `method: ${req.method}, params: ${JSON.stringify(req.params)}, body: ${JSON.stringify(req.body)}`,
  );

  next();
};
