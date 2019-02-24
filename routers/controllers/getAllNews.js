const News = require('../../db/models/News');

module.exports = function (req, res, next) {
  News.find({}, (error, news) => {
    error 
      ? next(error)
      : res.send(news);
  });
};
