module.exports = mongoose => {
  const config = require('../config/config');
  let schema = mongoose.Schema;
  const ObjectId = mongoose.Schema.Types.ObjectId;
  return {
    users: schema({
      name: {type: String, default: '' },
      gender: { type: Boolean, default: '' },
      email: String,
      pwd: String,
      created_at: { type: Date, default: Date.now },
      address: { type: String, default: '' },
      phone: { type: String, default: '' },
      imgUrl: { type: String, default: config.default.user.imgUrl },
      birthday: { type: String, default: '' },
      job: { type: String, default: '' },
      hobbity: { type: String, default: '' }
    }),

    articles: schema({
      title: String,
      description: String,
      author: { type: ObjectId, ref: 'users'},
      created_at: { type: Date, default: Date.now },
      imgUrl: { type: String, default: config.default.article.imgUrl },
      is_deleted: { type: Boolean, default: false }
    }),

    comments: schema({
      author: { type: ObjectId, ref: 'users' },
      article:  { type: ObjectId, ref: 'articles'},
      created_at: { type: Date, default: Date.now },
      description: String
    })
  }
}
