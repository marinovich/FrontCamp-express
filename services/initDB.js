const mongoose = require('mongoose');

const newsData = require('../db/newsData');
const News = require('../db/models/News');

module.exports = () => {
  mongoose.connect('mongodb://localhost/news');  

  //delete news collection if it exists
  News.collection.remove({}, (error, result) => {
    // TODO: decide what to do with result and error
    console.log(result);
    console.error(error);
  });
  // insert news collection from JSON
  News.collection.insertMany(newsData.sources, (error, result) => {
    // TODO: decide what to do with result and error
    console.log(result);
    console.error(error);
  });
};
