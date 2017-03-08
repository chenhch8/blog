import { Component, OnDestroy } from '@angular/core';
import { Comment } from '../../../model/comment.model';

@Component({
  selector: 'article-comment',
  templateUrl: './article-comment.html',
  inputs: ['comment']
})
export class ArticleCommentComponent implements OnDestroy {
  comment: Comment = new Comment({});
  constructor() {}

  ngOnDestroy() {
    this.comment = null;
  }
}
