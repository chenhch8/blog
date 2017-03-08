const router = require('express').Router();
const Article = require('../controllers/article.controller');
const cmRtr = require('./comment.router');

module.exports = app => app.use('/api/articles', router);

router.param('article_id', Article.parseParam);

// router.get('/:article_id', Article.findAnArticle);

router.post('/creation', Article.createAnArticle);

cmRtr(router);