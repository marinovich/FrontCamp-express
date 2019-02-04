const News = require('../../db/models/News');

module.exports = function(req, res, next) {
  News.create({ ...req.body }, (error, news) => {
    error 
      ? next(error)
      : res.send(news);
  });
};
