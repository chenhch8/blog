import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpSearchService, Utils } from '../../service/utils.service';
import { AlertPopService } from '../../service/alert-pop.service';

@Component({
  selector: 'register',
  templateUrl: './register.html'
})
export class RegisterComponent {
  constructor(private httpServe: HttpSearchService,
              private utils: Utils,
              private router: Router,
              private alertService: AlertPopService) {}

  registe(value): void {
    this.httpServe.updateByForm('/user/register', this.utils.rebuild(value))
      .subscribe(
        res => {
          if (res.status === 'ok') {
            return this.alertService.message.emit({ message: res.msg, callback: this.navToHome.bind(this) });
          }
          return this.alertService.message.emit({ message: res.msg })
        }
      )
  }

  navToHome() {
    this.router.navigate(['/login']);
  }
}