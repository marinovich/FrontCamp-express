const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const newsSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  description: String,
  category: String,
  language: String,
  county: String,
}, { versionKey: false });

module.exports = mongoose.model('News', newsSchema);
