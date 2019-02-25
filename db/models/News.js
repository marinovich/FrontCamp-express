const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const newsSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  publishedAt: String,
  author: String,
  description: String,
  urlToImage: String,
}, { versionKey: false });

module.exports = mongoose.model('News', newsSchema);
