const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// UI route for browser (to view books list)
router.get('/', async (req, res) => {
  const books = await Book.find();
  res.render('index', { books }); // ✅ IMPORTANT: render 'index.ejs'
});

// Show Add Book Form
router.get('/new', (req, res) => {
  res.render('new');
});

// Add New Book
router.post('/', async (req, res) => {
  const { title, author, year, img } = req.body;
  await Book.create({ title, author, year, img });
  res.redirect('/books');
});

// Show Edit Book Form
router.get('/:id/edit', async (req, res) => {
  const book = await Book.findById(req.params.id);
  res.render('edit', { book });
});

// Update Book
router.put('/:id', async (req, res) => {
  const { title, author, year, img } = req.body;
  await Book.findByIdAndUpdate(req.params.id, { title, author, year, img });
  res.redirect('/books');
});

// Delete Book
router.delete('/:id', async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.redirect('/books');
});

module.exports = router;
