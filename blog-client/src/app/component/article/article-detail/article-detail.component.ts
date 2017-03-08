import { Component, OnDestroy } from '@angular/core';
import { Article } from '../../../model/article.model';

@Component({
  selector: "article-detail",
  templateUrl: './article-detail.html',
  inputs: ['article']
})
export class ArticleDetailComponent implements OnDestroy {
  article: Article = new Article({});
  constructor() {}

  ngOnDestroy() {
    this.article = null;
  }

}
