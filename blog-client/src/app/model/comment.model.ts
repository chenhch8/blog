export class Comment {
  _id: string;
  created_at: string;
  description: string;
  author: {
    _id: string,
    name: string,
    imgUrl: string
  }

  constructor(config) {
    this._id = config._id;
    this.author = config.author;
    this.created_at = config.created_at;
    this.description = config.description;
  }
}