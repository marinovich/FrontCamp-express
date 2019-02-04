const express = require('express');

const getAllNews = require('./controllers/getAllNews');
const getNewsById = require('./controllers/getNewsById');
const addNewsData = require('./controllers/addNewsData');
const updateNewsData = require('./controllers/updateNewsData');
const deleteNewsData = require('./controllers/deleteNewsData');

const router = express.Router();

router.all('*', (req, res, next) => {
  req.isAuthenticated()
    ? next()
    : res.send('There is no access. Use /register or /login');
});

router.get('/', getAllNews);
router.get('/:id', getNewsById);
router.post('/', addNewsData);
router.put('/:id', updateNewsData);
router.delete('/:id', deleteNewsData);

module.exports = router;
