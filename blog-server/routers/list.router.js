const router = require('express').Router();
const ltCtrl = require('../controllers/list.controller');

module.exports = app => app.use('/api/list', router);

router.param('article_id', ltCtrl.parseParam)

router.get('/users', ltCtrl.getAllUsers);

router.get('/users/:user_id', ltCtrl.getUser);

router.get('/users/:user_id/articles', ltCtrl.getArticles);

router.get('/articles/:article_id', ltCtrl.getAnArticle);