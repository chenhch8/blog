const { sendData, handleError } = require('../utils/');
const Articles = require('../models/article.model');
const Comments = require('../models/comment.model');
const Rx = require('rx');

module.exports = {
  parseParam,
  createAnArticle
  // findArticleList,
  // findAnArticle
}

/*
 * 路由参数解析
 */
function parseParam(req, res, next, article_id) {
  // 此处需注意，当查询条件为_id时，mongoose会将string类型的_id强制转成ObjectId类型,
  // 若_id本身不符合ObjectId类型的一些格式要求，那么就会报错。故最好先校验下。
  if (!/^[0-9a-fA-F]{24}$/.test(article_id)) {
    return sendData(req, res, 'NO_ARTICLE_EXITS', {}, '文章不存在');
  }
  Articles.find({ _id: article_id })
    .subscribe(
      result => {
        if (result.length === 0)
          return sendData(req, res, 'NO_ARTICLE_EXITS', {}, '文章不存在');
        req.paramData.article = result[0].toObject();
        return next();
      },
      err => handleError(req, res, 'DATABASE_QUERY_ERROR', err, '数据库查询错误')
    )
}

/*
 * 创建新文章
 */
function createAnArticle(req, res) {
  let { title, description, imgUrl } = req.body;
  const author = req.paramData.user._id;
  title = title.trim(); description = description.trim();

  if (title === '' || description === '')
    return sendData(req, res, 'PARAM_ERROR1', {}, '标题和内容不能为空');

  Articles.create({ title, description, imgUrl, author })
    .subscribe(
      result => sendData(req, res, 'ok', {}, '文章创建成功'),
      err => handleError(req, res, 'DATABASE_QUERY_ERROR', err, '数据库查询错误')
    )
}

// /*
//  * 获取用户自己发表过的所有文章
//  */
// function findArticleList(req, res) {
//   Articles.find({ author: req.paramData.user._id })
//     .do(results => {
//       if (results.length === 0) {
//         sendData(req, res, 'ok', results, '文章列表获取成功');
//       }
//     })
//     .filter(results => results.length > 0)
//     .map(results => {
//       // 裁剪正文，只返回前50个字符
//       results.forEach(item => {
//         if (item.description.length > 50)
//           item.description = item.description.slice(0, 50).trim() + '......';
//       })
//       return results;
//     })
//     .subscribe(
//       result => sendData(req, res, 'ok', result, '文章列表获取成功'),
//       err => handleError(req, res, 'DATABASE_QUERY_ERROR', err, '数据库查询错误')
//     )
// }

// /*
//  * 获取一篇文章
//  */
// function findAnArticle(req, res) {
//   Comments.findAllCommentsByArticleId(req.paramData.article._id)
//     .map(result => {
//       req.paramData.article.comments = result;
//       return req.paramData.article;
//     })
//     .subscribe(
//       result => sendData(req, res, 'ok', result, '文章获取成功'),
//       err => handleError(req, res, 'DATABASE_QUERY_ERROR', err, '数据库查询错误')
//     )
// }
