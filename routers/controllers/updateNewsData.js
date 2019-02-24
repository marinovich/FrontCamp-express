const News = require('../../db/models/News');

module.exports = function(req, res, next) {
  News.updateOne({ id: req.params.id }, { ...req.body }, (error, news) => {
    error 
      ? next(error)
      : res.send(news);
  });
};
