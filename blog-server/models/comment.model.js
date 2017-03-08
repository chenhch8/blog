const { DBquery } = require('../utils/');

module.exports = {
  findAllCommentsByArticleId,
  create
}

/*
 * 查找一篇文章下的所有评论
 * @parma  {Object} value
 * @return {Observable}
 */
function findAllCommentsByArticleId(article) {
  return DBquery.findWithPopulate('comments', { path: 'author', select: '_id email name imgUrl' }, { article });
}

/*
 * 创建评论
 * @parma  {Object} value
 * @return {Observable}
 */
function create(value) {
  return DBquery.insert('comments', value);
}
