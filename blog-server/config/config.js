/*
 * 环境运行配置文件
 */
const path = require('path');

module.exports = {
  root: path.join(__dirname, '..'),
  url: 'http://localhost:3000',
  port: 3000,
  session: {
    sessionSecret: 'chenhch8-first-blog',
    url: 'mongodb://localhost/session',
    interval: 10 * 60 * 1000
  },
  db: {
    url: 'mongodb://chenhch8:chenhch8_dev@localhost/chenhch8_dev',
    options: {
      server: {
        poolSize: 5,
        keepAlive: 1
      },
      replset: {
        keepAlive: 1
      },
      user: 'chenhch8',
      pass: 'chenhch8_dev'
    }
  },
  default: {
    user: {
      imgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1489384970&di=5539eff62a381799ffa01b6a12cf57d2&imgtype=jpg&er=1&src=http%3A%2F%2Fwww.nvsay.com%2Fuploads%2Fallimg%2F161019%2F170-1610191525170-L.jpg'
    },
    article: {
      imgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1489385036&di=7e667865a18affebea5dfc9a0ce75b04&imgtype=jpg&er=1&src=http%3A%2F%2Fimage.uczzd.cn%2F3768551678672087207.jpg%3Fid%3D0'
    }
  }
}
