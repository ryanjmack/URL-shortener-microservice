const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  url:  String,
  short_url: String
});

module.exports = mongoose.model('URL', urlSchema);
