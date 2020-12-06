const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

router.get('/:status', bookController.index);

router.get('/:status/:id', bookController.details);

router.post('/:status/:id', bookController.postUpdata);

router.post('/:status', bookController.postUpdata1);

router.get('/:status/:id/insert', bookController.insert);

router.post('/:status/:id/insert', bookController.postInsert);

module.exports = router;