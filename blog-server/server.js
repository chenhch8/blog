/*
 * 配置开发环境参数，如果没有指定，默认为'development'
 */
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var config = require('./config/config');
var app = require('./config/express')();
var http = require('http');

/**
 * 创建Http服务器
 */
var server = http.createServer(app);

server.listen(config.port, function() {
  console.log('The NODE_ENV is: ' + process.env.NODE_ENV);
  console.log('Server run on port: ' + config.port);
});
