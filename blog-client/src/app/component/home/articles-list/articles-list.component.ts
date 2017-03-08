import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { HttpSearchService } from '../../../service/utils.service';
import { Router } from '@angular/router'

// let loadingGif: string = require('../../../assets/images/loading.gif');

@Component({
  selector: 'articles-list',
  templateUrl: './articles-list.html',
  inputs: ['userId']
})
export class ArticlesListComponent implements OnInit, OnChanges, OnDestroy {
  articles: any[];
  isLoading: boolean;
  userId: string;
  
  constructor(private searchService: HttpSearchService,
              private router: Router) {
    this.isLoading = true;
  }

  ngOnInit(): void {
    this.userId = JSON.parse(localStorage.getItem('curUser'))._id;
    this.getArticlesList();
  }

  ngOnDestroy(): void {
    this.articles = null;
  }

  ngOnChanges(value: any): void {
    let change = value.userId.currentValue;
    if (change) {
      this.userId = change;
      this.getArticlesList();
    }
  }

  getArticlesList() {
    if (!this.userId) return;
    this.searchService.query(`/api/list/users/${this.userId}/articles`)
      .subscribe(
        res => {
          if (res.status === 'ok') {
            this.articles = res.data;
          }
          this.isLoading = false;
        },
        err => {
          console.error('ERROR:', err);
          this.isLoading = false;
        }
      )
  }

  goToDetail(articleId) {
    this.router.navigate(['article', articleId]);
  }
}
