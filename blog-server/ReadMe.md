# 个人博客服务端篇
1. 说明：服务端是用nodejs搭建，框架采用express。之前使用express框架时，都是直接在直接生成的基础代码上添加自己的逻辑，但对它的一些写好的逻辑则没有深入的去了解，例如为什么我们能通过`req.body / req.params `等待方式就能获取到前端传来的参数，以及`cookie`的解析又是如何建立的。于是趁者现在这个机会，我打算利用express重新设计服务端的架构，不采用它自己生成的架构，以此熟悉下服务端搭建的整个流程。废话不多说，下面就先开始吧。
2. 本人还算是个新人，若下面说的有什么问题，还希望能提出来，让我们大家一起学习学习。
3. 适合人群：对express有一定基础的人。这里我只会记录我之前不太了解部分的知识点，一些关于express的基础知识，我就不再记录说明了
## 项目架构
1. 项目的目录结果如下：项目采用的架构是MVC，但由于前端采用的Angular2实现，所以服务端只需要关注MVC中的M和C即可。
```
├── config          // 存放项目运行环境的配置文件 
├── controllers     // 存放MVC中C层的代码
├── models          // 存放MVC中M层的代码
├── node_modules
├── package.json
├── ReadMe.md
├── routers         // 存放路由文件
└── server.js       // 入口文件
```
### cookie篇
1. cookie是在客户端记录信息确定用户身份。
2. 配置
```javascript
var cookieParser = require('cookie-parser');
// 设置cookie中间件
app.use(cookieParser());
```
### session篇
1. session，简单来说就是服务端用于“识别”客户端身份的，但是现今CS模型直接的沟通，大部分都是采用HTTP协议来进行的，而HTTP又是一种无状态协议，也就是说靠HTTP本身，是无法实现服务端识别记录客户端的身份的。为了解决这个问题，session就应运而生了。
2. 在这里为什么需要session呢？
每个博客主都有权对自己发表过的文章进行操作，但却无法对他人的文章进行增、删的、改等等。那么如何识别博客主本人呢。显然常规的做法是先登陆，登陆成功后才能对自己发表的文章进行操作。于是，session在这里是用于记录用户登陆是否已经登陆了，从而避免前端每次操作都需要再登陆一次的尴尬境地。
3. 下面开始session的搭建。这里我使用的是`express-session`模块。由于默认下session是存在内存中的，但在实际中该做法不可取，于是在这里我使用mongodb数据库来保存session。
直接上关键代码：
```javascript
var app = require('express')();
var session = require('express-session');
var mongodbStore = require('connect-mongo')(session);
var sessionStore = new mongodbStore({
    // 保存路径
    url: 'mongodb://localhost/session',
    // 过期检查间隔（ms）
    interval: 120000
})；
app.use(session(getSessionOptions()));
function getSessionOptions() {
  return {
    // 设置 cookie 中，保存 session 的字段名称，默认为 connect.sid 
    name: 'chenhch-blog-id',
    // session 的存储方式，默认存放在内存中
    store: sessionStore,
    // 通过设置的 secret 字符串，来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
    secret: config.session.sessionSecret,
    // 指每次请求都重新设置session cookie，默认为 true
    resave: false,
    // 指无论有没有session cookie，每次请求都设置个session cookie 
    saveUninitialized: true,
    // 设置存放 session id 的 cookie 的相关选项
    cookie: {
      path: '/',
      httpOnly: true,
      // 应用在https
      secure: false,
      maxAge: 5*60*1000
    }
  }
}
```
更多使用详情请见: https://github.com/donpark/session-mongoose
### body Parser 篇
1. body parse是用于解析提取用户提交信息的。应用层中的数据包称为message，即为报文，在express中，有一个中间件`body-parser`，就是用于解析message中的请求数据的。在express中，使用它很简单，如下：
```javascript
var bodyParser = require('body-parser');
// 解析json请求
app.use(bodyParser.json());
// 解析form请求
app.use(bodyParser.urlencoded({ extended: true }));
```
### mongoose 篇
1. 过程：$$ schema \rightarrow model \rightarrow  $$
2. 说明：
	* schema： 声明所存的json的键名以及对于的值类型，类似sql创建表时的声明表字段步骤
	* model：是一个我们想要生成的json文档的类，类似sql中的创建表步骤
3. 添加方法：
	* 方法一：在schema阶段——对schema的返回对象的methods属性中添加方法，注意是在model前。
