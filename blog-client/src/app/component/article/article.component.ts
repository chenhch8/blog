import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpSearchService, Utils } from '../../service/utils.service';
import { Article } from '../../model/article.model';
import { Comment } from '../../model/comment.model';
import { Observable } from 'rxjs';
import { AlertPopService } from '../../service/alert-pop.service';

@Component({
  selector: "article",
  templateUrl: './article.html'
})
export class ArticleComponent implements OnInit, OnDestroy {
  static LIMIT: number = 5; // 每页显示评论的数量
  article: Article;
  AllComments: Array<Comment>;  // 所有评论
  comments: Array<Comment>; // 每页显示的评论
  pageSize: Observable<number>;
  id: string; // 文章id
  pageId: number;

  constructor(private httpServer: HttpSearchService,
              private utils: Utils,
              private route: ActivatedRoute,
              private router: Router,
              private alertService: AlertPopService) {
    route.params.subscribe(params => this.id = params['id'])
    this.comments = null;
  }

  ngOnInit() {
    this.loadArticle();
  }

  ngOnDestroy() {
    // 释放内存，防止内存泄露
    this.article = null;
    this.AllComments = null;
    this.comments = null;
  }

  loadArticle(): void {
    this.httpServer.query('/api/list/articles/' + this.id)
      .subscribe(
        res => {
          if (res.status === 'ok') {
            this.article = new Article(res.data);
            this.AllComments = res.data.comments;
            this.pageSize = Observable.of(Math.ceil(this.AllComments.length / ArticleComponent.LIMIT));
            this.setPage(this.pageId || 0);
          }
        },
        err => {
          console.log("err:", err);
        }
      )
  }

  goBack(): void {
    this.router.navigate(['home']);
  }

  // 设置要显示的评论页
  setPage(start): void {
    this.pageId = start;
    this.comments = null;
    start *= ArticleComponent.LIMIT;
    this.comments = this.AllComments.slice(start, start + ArticleComponent.LIMIT);
  }

  // 提交评论
  submit(value): void {
      console.log('sdfdsfdsf');
    value = this.utils.rebuild(value);
    this.httpServer.updateByForm('/api/articles/' + this.id + '/comment', value)
      .subscribe(
        res => {
          if (res.status === 'ok') {
            this.AllComments.unshift({
                _id: res.data._id,
                created_at: res.data.created_at,
                description: res.data.description,
                author: res.user
            });
            this.alertService.message.emit({ message: res.msg, callback: this.loadArticle.bind(this)});
          } else {
              this.alertService.message.emit({ message: res.msg });
          }
        }
      )
  }
}