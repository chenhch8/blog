import { Component, OnInit } from '@angular/core';
import { HttpSearchService, Utils } from '../../service/utils.service';
import { AlertPopService } from '../../service/alert-pop.service';

@Component({
  selector: 'app-my-blog-page',
  templateUrl: './my-blog.html'
})
export class MyBlogComponent implements OnInit {
  title: string;
  description: string;
  imgUrl: string

  constructor(private httpSearch: HttpSearchService,
              private alertService: AlertPopService,
              private utils: Utils) {
  }

  ngOnInit() {
  }

  onSubmit() {
      let body: string = this.utils.rebuild(this.get());
    this.httpSearch
      .updateByForm('/api/articles/creation', body)
      .subscribe(
        res => {
          if (res.status === 'ok') {
            this.description = this.title = this.imgUrl = '';
          }
          this.alertService.message.emit({ message: res.msg });
        },
        err => {
          console.error(err);
          this.alertService.message.emit({ message: '提交失败' });
        }
      )
  }

  get() {
    let temp = {
      title: this.title,
      description: this.description
    };
    if (this.imgUrl)
      temp = Object.assign(temp, { imgUrl: this.imgUrl });
    console.log(temp);
    return temp;
  }
}
