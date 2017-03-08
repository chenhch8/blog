const { DBquery } = require('../utils/');

module.exports = {
  find,
  create,
  updateById,
  deleteById
}

/*
 * 根据特定条件查找相应的文章
 * @return {Observable}
 */
function find(value) {
  return DBquery.findWithPopulate('articles', { path: 'author', select: '_id email name imgUrl' }, Object.assign(value, { is_deleted: false }));
}

/*
 * 创建文章
 * @return {Observable}
 */
function create(value) {
  return DBquery.insert('articles', value);
}

/*
 * 更新文章
 * @return {Observable}
 */
function updateById(article_id, value) {
  return DBquery.update('articles', { _id: article_id }, { $set: value });
}

/*
 * 删除文章
 * @return {Observable}
 */
function deleteById(article_id) {
  // return DBquery.delete('articles', { _id: article_id });
  return DBquery.update('articles', { _id: article_id }, { $set: { is_deleted: true }})
}
