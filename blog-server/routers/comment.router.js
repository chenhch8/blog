const router = require('express').Router();
const Comment = require('../controllers/comment.controller');

module.exports = app => app.use('/:article_id/comment', router);

router.post('/', Comment.createAComment);
