const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

/* GET list of books. */
router.get('/', userController.signin);

module.exports = router;
