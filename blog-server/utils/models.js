module.exports = mongoose => {
  const Schemas = require('./schemas')(mongoose);
  let model = mongoose.model.bind(mongoose);
  return {
    users: model('users', Schemas.users),
    articles: model('articles', Schemas.articles),
    comments: model('comments', Schemas.comments)
  }
}