const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

router.get('/', bookController.list);

router.get('/detail/:id', bookController.details);

router.post('/detail/:id', bookController.postUpdata);

router.post('/', bookController.postUpdata1);

router.get('/insert', bookController.insert);

router.post('/insert', bookController.postInsert);

module.exports = router;