const config = require('../config/config');
const mongoose = require('mongoose');
const Models = require('./models')(mongoose);
const Rx = require('rx');

mongoose.connect(config.db.url, config.db.options);
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));

var DBquery = {
  insert: (chose, ...params) => {
    // create -> return a Promise
    return toObservable(Models[chose].create(...params));
  },
  find: (chose, ...params) => {
    // find -> return a query object, so call exec() to convert the query object to a Promise
    return toObservable(Models[chose].find(...params).exec());
  },
  delete: (chose, ...params) => {
    // remove -> return a Promise
    return toObservable(Models[chose].remove(...params));
  },
  update: (chose, ...params) => {
    // update -> return a query object
    return toObservable(Models[chose].update(...params, { multi: true}));
  },
  findWithPopulate: (chose, options, ...params) => {
    // populate -> return a query object
    return toObservable(Models[chose].find(...params).populate(options).exec());
  }
}

exports = module.exports = {
  sendData,
  DBquery,
  handleError,
  toObservable
}

function sendData(req, res, status, data, msg) {
  let time = new Date();
  let user = getParamData(req);
  return res.json({
    status,
    data,
    time,
    msg,
    user
  });
}

function getParamData(req) {
  const user = req.paramData.user;
  return user && {
    id: user._id,
    name: user.name,
    imgUrl: user.imgUrl
  } || null;
}

function toObservable(fn) {
  // return Rx.Observable.fromNodeCallback(fn, that);
  return Rx.Observable.fromPromise(fn);
}

function handleError(req, res, status, err, msg) {
  let time = new Date();
  if (err) console.error(err);
  else
    throw new Error('handleError 传入的 err 为 null');
  let data = null;
  let stack = err.stack;
  if (process.env.NODE_ENV === 'production') {
    stack = undefined;
  }
  res.json({
    status,
    data,
    time,
    msg,
    stack
  });
}