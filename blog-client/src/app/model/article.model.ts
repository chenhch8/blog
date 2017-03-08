export class Article {
  id: number;
  title: string;
  description: string;
  author: Object;
  date: string;

  constructor(config) {
    this.id = config.id || '';
    this.title = config.title || '';
    this.description = config.description || '';
    this.author = config.author || '';
    this.date = config.date || '';
  } 
}