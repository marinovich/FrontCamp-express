const News = require('../../db/models/News');

module.exports = function(req, res) {
  News.deleteOne({ id: req.params.id }, (error, news) => {
    error 
      ? next(error)
      : res.send(news);
  });
};
