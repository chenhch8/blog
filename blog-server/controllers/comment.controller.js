const { sendData, handleError } = require('../utils/');
const Comments = require('../models/comment.model');

module.exports = {
  createAComment
}

/*
 * 创建一个新评论
 */
function createAComment(req, res) {
  const article = req.paramData.article._id;
  const author = req.paramData.user._id;
  let { description } = req.body;
  description = description.trim();
  if (!description) {
    return sendData(req, res, 'PARAMS_ERROR', {}, '评论内容不可为空');
  }
  Comments.create({ article, author, description })
    .subscribe(
      result => sendData(req, res, 'ok', { _id: result._id, created_at: result.created_at, description: result.description }, '评论创建成功'),
      err => handleError(req, res, 'DATABASE_QUERY_ERROR', err, '数据库查询错误')
    )
}
