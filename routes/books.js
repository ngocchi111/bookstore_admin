const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

router.get('/books', bookController.list);

router.get('/books/:id', bookController.details);

router.post('/books/:id', bookController.postUpdata);

router.post('/books', bookController.postUpdata1);

router.get('/books/insert', bookController.insert);

router.post('/books/insert', bookController.postInsert);

module.exports = router;