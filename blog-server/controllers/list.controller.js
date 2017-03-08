const { sendData, handleError } = require('../utils/')
const User = require('../models/user.model');
const Article = require('../models/article.model');
const Comment = require('../models/comment.model');

module.exports = {
  parseParam,
  getAllUsers,
  getUser,
  getArticles,
  getAnArticle
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
  Article.find({ _id: article_id })
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

function getAllUsers(req, res) {
  User.findAllUsers()
    .map(result => {
      return result.map(item => {
        return {
          _id: item._id,
          name: item.name,
          email: item.email
        }
      })
    })
    .subscribe(
      result => sendData(req, res, 'ok', result, '获取用户列表成功'),
      err => handleError(req, res, 'DATABASE_QUERY_ERROR', err, '数据库查询错误')
    )
}

function getUser(req, res) {
  User.findById(req.params.user_id)
    .map(result => {
      return result.length && {
          _id: result[0]._id,
          name: result[0].name,
          email: result[0].email,
          imgUrl: result[0].imgUrl,
          phone: result[0].phone,
          job: result[0].job,
          hobbity: result[0].hobbity,
          address: result[0].address,
          description: result[0].description
      } || null;
    })
    .subscribe(
      result => sendData(req, res, 'ok', result, '获取用户信息成功'),
      err => handleError(req, res, 'DATABASE_QUERY_ERROR', err, '数据库查询错误')
    )
}

function getArticles(req, res) {
  Article.find({ author: req.params.user_id })
    .do(results => {
      if (results.length === 0) {
        sendData(req, res, 'ok', results, '文章列表获取成功');
      }
    })
    .filter(results => results.length > 0)
    .map(results => {
      // 裁剪正文，只返回前50个字符
      results.forEach(item => {
        if (item.description.length > 50)
          item.description = item.description.slice(0, 50).trim() + '......';
      })
      return results;
    })
    .subscribe(
      result => sendData(req, res, 'ok', result, '文章列表获取成功'),
      err => handleError(req, res, 'DATABASE_QUERY_ERROR', err, '数据库查询错误')
    )
}

/*
 * 获取一篇文章
 */
function getAnArticle(req, res) {
  Comment.findAllCommentsByArticleId(req.params.article_id)
    .map(result => {
      req.paramData.article.comments = result;
      return req.paramData.article;
    })
    .subscribe(
      result => sendData(req, res, 'ok', result, '文章获取成功'),
      err => handleError(req, res, 'DATABASE_QUERY_ERROR', err, '数据库查询错误')
    )
}
