import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpSearchService, Utils } from '../../service/utils.service';
import { Observable } from 'rxjs';
import { NavLoginCommunicate } from '../../service/nav-login-communicate.service';
import { AlertPopService } from '../../service/alert-pop.service';

@Component({
  selector: 'login',
  templateUrl: './login.html'
})
export class LoginComponent {
  constructor(private httpService: HttpSearchService,
              private utils: Utils,
              private navlogin: NavLoginCommunicate,
              private router: Router,
              private alertService: AlertPopService) {
  }

  login(value): void {
    value.remember = value.remember ? value.remember : false;
    this.httpService
      .updateByForm('/user/login', this.utils.rebuild(value))
      .subscribe(
        res => {
          if (res.status === 'ok') {
              localStorage.setItem('loginUser', JSON.stringify(res.user));
            this.navlogin.message.emit(true);
          }
          this.alertService.message.emit({ message: res.msg, callback: this.navToHome.bind(this) });
        }
      )
  }

  navToHome() {
    this.router.navigate(['/home']);
  }
}