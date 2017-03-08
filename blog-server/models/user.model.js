const { DBquery } = require('../utils/');

module.exports = {
  create,
  findById,
  findAllUsers,
  findByEmailAndPwd,
  find,
  updateById
}

/*
 * 创建一个用户
 * @param  {Object} value
 * @return {Observable}
 */
function create(value) {
  return DBquery.insert('users', value);
}

function findAllUsers() {
  return DBquery.find('users', {});
}

/*
 * 根据用户Id查找相应的用户
 * @param  {String} user_id
 * @return {Observable}
 */
function findById(user_id) {
  return DBquery.find('users', { _id: user_id });
}

/*
 * 根据邮箱和密码查找相应用户
 * @param  {String} email
 * @param  {String} pwd
 * @return {Observable}
 */
function findByEmailAndPwd(email, pwd) {
  return DBquery.find('users', { email, pwd });
}

/*
 * 根据特定条件查找用户
 * @param  {Object} value
 * @return {Observable}
 */
function find(value) {
  return DBquery.find('users', value);
}

/*
 * 更新
 * @return {Observable}
 */
function updateById(user_id, value) {
  return DBquery.update('users', { _id: user_id }, { $set: value });
}