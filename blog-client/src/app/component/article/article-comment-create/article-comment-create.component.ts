import {
  Component,
  OnDestroy,
  EventEmitter
} from '@angular/core';
import { User } from '../../../model/user.model';

@Component({
  selector: 'article-comment-create',
  templateUrl: './article-comment-create.html',
  outputs: ['comment']
})
export class ArticleCommentCreateComponent implements OnDestroy{
  user: User;
  comment: EventEmitter<{ [key: string]: string }> = new EventEmitter<{ [key: string]: string }>();
  textInput: any;

  constructor() {
    let user = JSON.parse(localStorage.getItem('loginUser'));
    if (user) {
      this.user = user;
    } else {
      this.user = new User({});
    }
  }

  onSubmit(): void {
    this.comment.emit({ description: this.textInput });
    this.textInput = '';
  }

  ngOnDestroy() {
    this.user = null;
    this.comment = null;
  }
}