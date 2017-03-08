const { sendData, handleError } = require('../utils/');
const Users = require('../models/user.model');

module.exports = {
  isLogin,
  login,
  logout,
  register,
  update
}

function isLogin(req, res) {
  sendData(req, res, 'ok', { is_logined: req.session.user && true || false }, '登陆状态查询成功');
}

function login(req, res) {
  if (req.session.user) {
    return sendData(req, res, 'ok', {}, '不能重复登陆');
  }
  const { email, pwd } = req.body;
  Users.findByEmailAndPwd(email, pwd)
    .subscribe(
      result => {
        if (result.length == 0) {
          return sendData(req, res, 'USER_WRONG', {}, '账号或密码错误');
        }
        req.session.user = result[0].toObject();
        req.paramData.user = req.session.user;
        return sendData(req, res, 'ok', {}, '登陆成功');
      },
      err => {
        return handleError(req, res, 'DATABASE_QUERY_ERROR', err, '数据库查询错误');
      }
    )
}

function logout(req, res) {
  req.session.user = null;
  sendData(req, res, 'ok', {}, '注销成功');
  req.paramData.user = null;
}

function register(req, res) {
  const { email, pwd, name } = req.body;
  if (!/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(email)) {
    return sendData(req, res, 'EMAIL_ERROR', {}, '邮箱格式错误');
  }
  Users.find({ email })
    .do(result => {
      if (result.length > 0)
        sendData(req, res, 'EMAIL_EXITS', {}, '邮箱已被注册')
    })
    .filter(result => result.length == 0)
    .flatMap(result => Users.create({ email, pwd, name }))
    .subscribe(
      result => {
        console.log(result);
        return sendData(req, res, 'ok', {}, '注册成功');
      },
      err => {
        return handleError(req, res, 'DATABASE_QUERY_ERROR', err, '数据库查询错误');
      }
    )
}

function update(req, res) {
  const id = req.body.id;
  let params = {};
  Object.keys(req.body).forEach(key => {
    if (key !== 'id' && req.body[key] != 'none') {
      params[key] = req.body[key];
    }
  });
  console.log('param:', params);
  Users.updateById(id, params)
    .subscribe(
      result => {
        console.log(result);
        req.paramData.user.name = params.name;
        sendData(req, res, 'ok', {}, '更新成功');
      },
      err => handleError(req, res, 'DATABASE_QUERY_ERROR', err, '数据库查询错误')
    )
}

