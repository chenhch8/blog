import {
    Component,
    OnInit
} from '@angular/core';
import { NavLoginCommunicate } from '../../service/nav-login-communicate.service';
import { HttpSearchService } from '../../service/utils.service';
import { AlertPopService } from '../../service/alert-pop.service';
import { User } from '../../model/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.html'
})
export class AppComponent implements OnInit {
  isLogin: boolean;
  user: User;

  constructor(private navlogin: NavLoginCommunicate,
              private httpService: HttpSearchService,
              private alertService: AlertPopService) {
    this.isLogin = false;
    navlogin.message.subscribe(value => {
      this.isLogin = value;
      if (value) {
          this.user = JSON.parse(localStorage.getItem('loginUser'));
      }
    });
  }

  ngOnInit() {
    this.httpService.query('/user/isLogin')
      .subscribe(
        res => {
          if (res.status === 'ok' && res.data.is_logined) {
            this.user = JSON.parse(localStorage.getItem('loginUser'));
            this.isLogin = true;
          }
        }
      )
  }

  logout() {
    this.httpService.update('/user/logout')
      .subscribe(
        res => {
          if (res.status === 'ok') {
            localStorage.removeItem('loginUser');
            this.user = null;
            this.isLogin = false;
          }
          this.alertService.message.emit({ message: res.msg });
        },
        err => console.error(err)
      )
  }
}
