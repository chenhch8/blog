import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../../model/user.model';
import { HttpSearchService } from '../../service/utils.service';

@Component({
  selector: 'app-about-me-page',
  templateUrl: './about-me.html'
})
export class AboutMeComponent implements OnInit, OnDestroy {
  user: User;

  constructor(private httpSearch: HttpSearchService) {
  }

  ngOnInit() {
    this.getUserInfo();
  }

  ngOnDestroy() {
    this.user = null;
  }

  getUserInfo() {
    let user = localStorage.getItem('loginUser');
    if (!user) return;
    let userId = JSON.parse(user).id;
    this.httpSearch.query('/api/list/users/' + userId)
      .subscribe(res => {
        console.log(res)
        if (res.status === 'ok')
          this.user = new User(res.data);
      })
  }

}
