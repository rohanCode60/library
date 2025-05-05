
const mongoose = require('mongoose');
const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  year: Number,
  img: String
});
module.exports = mongoose.model('Book', bookSchema);
