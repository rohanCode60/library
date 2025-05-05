const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// ✅ MongoDB Connection
mongoose.connect('mongodb://localhost:27017/mylibrary')
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ MongoDB Error:", err));

// ✅ Middlewares
app.use(express.static(path.join(__dirname, 'public'))); // For CSS, images, etc.
app.use(express.json()); // ✅ To parse incoming JSON data (Postman ke liye)
app.use(bodyParser.urlencoded({ extended: true })); // For form data
app.use(methodOverride('_method')); // For PUT & DELETE in HTML forms

// ✅ View Engine Setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ✅ Routes
const bookRoutes = require('./routes/books');
app.use('/books', bookRoutes);

// ✅ Root Route
app.get('/', (req, res) => {
  res.redirect('/books');
});

// ✅ Server Start
app.listen(3000, () => {
  console.log("🚀 Server running at http://localhost:3000");
});
