const config = require('../config/config');
const router = require('express').Router();
const User = require(config.root + '/controllers/user.controll');

module.exports = app => app.use('/user', router);

router.get('/isLogin', User.isLogin);

router.post('/login', User.login);

router.post('/logout', User.logout);

router.post('/register', User.register);

router.post('/update', User.update);