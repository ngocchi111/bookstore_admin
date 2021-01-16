const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { updata, user } = require('../models/userModel');
const passport = require('../passport');

router.get('/', userController.home);

router.get('/signin', userController.signin);

router.post('/signin',  passport.authenticate('local', {successRedirect: '/',
failureRedirect: '/signin',
failureFlash: false,
}));

router.get('/logout', function(req,res) {
    req.logout();
    res.redirect('/sign')
})

router.get('/infor', userController.infor);

router.post('/infor', userController.postInfor);

router.get('/users', userController.users);

router.get('/users/:id', userController.user)

router.post('/users/:id', userController.updateUser);

module.exports = router;
