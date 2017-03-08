import {
  Component,
  OnDestroy
} from '@angular/core';
import { AlertPopService } from '../../service/alert-pop.service';

@Component({
  selector: 'alert-pop',
  templateUrl: './alert-pop.html',
  inputs: ['modalId']
})
export class AlertPopComponent implements OnDestroy {
  modalId: string;
  message: string;
  callback: Function;
  constructor(private alertService: AlertPopService) {
    alertService.message.subscribe(
      value => {
        this.message = value.message;
        this.callback = value.callback;
      }
    )
  }
  
  startCallback() {
    // console.log('this.callback:', this.callback);
    if (this.callback) {
      this.callback();
      this.callback = null;
    }
  }

  ngOnDestroy() {
    console.log('pop destroy');
  }
}