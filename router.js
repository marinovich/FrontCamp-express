const express = require('express');
const newsData = require('./newsData');
const router = express.Router();

router.get('/', function (req, res, next) {
  const newsList = newsData.sources;

  if (!Array.isArray(newsList)) {
    return next('Something is going wrong.');
  }

  res.send(newsList);
});

router.get('/:id', function (req, res, next) {
  const newsSource = newsData.sources.find(news => news.id === req.params.id);

  if (!newsSource) {
    return next('Sorry, cant find that');
  }

  res.send(newsSource);
});

router.post('/', function(req, res) {
  const { id, name, url } = req.body;
  
  if (!id || !name || !url) {
    res.status(404).send('Please, provide all necessary data: id, name, url');
  }

  newsData.sources.push({ ...req.body });

  res.status(200).send('Information successfully added');
});

router.put('/:id', function(req, res) {
  const newsSource = newsData.sources.find(news => news.id === req.params.id);

  if (!newsSource) {
    res.next('Unfortunately, source data didn\'t find');
  }

  newsData.sources = newsData.sources.map(news => {
    if (news.id !== req.params.id) {
      return news;
    }

    return { ...news, ...req.body };
  });

  res.status(200).send('Data successfully changed');
});

router.delete('/:id', function(req, res) {
  const newsSource = newsData.sources.find(news => news.id === req.params.id);

  if (!newsSource) {
    res.next('Unfortunately, source data didn\'t find');
  }

  newsData.sources = newsData.sources.filter(news => news.id !== req.params.id);

  res.status(200).send('Data successfully deleted');
});

module.exports = router;
