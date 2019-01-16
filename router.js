const express = require('express');
const newsData = require('./newsData');
const router = express.Router();

router.get('/', function (req, res, next) {
  const newsList = newsData.sources;

  if (!Array.isArray(newsList)) {
    return next('Something is going wrong.');
  }
  
  res.render('index', { title: 'Hey', message: 'News IDs', newsData: newsList});
});

router.get('/:id', function (req, res, next) {
  const newsSource = newsData.sources.find(news => news.id === req.params.id);

  if (!newsSource) {
    return next('Something is going wrong.');
  }

  res.render('source', { newsData: newsSource });
});

router.post('/', function(req, res) {
  res.send(newsData);
});

module.exports = router;
