import {
  Component,
  EventEmitter,
  OnInit,
  OnDestroy,
  ViewChild,
  AfterViewChecked,
  ElementRef
} from '@angular/core';
import { User } from '../../../model/user.model';
import { HttpSearchService } from '../../../service/utils.service';

@Component({
  selector: 'users-list',
  templateUrl: './users-list.html',
  outputs: ['userId']
})
export class UsersListComponent implements OnInit, AfterViewChecked, OnDestroy {
  users: Array<User> = new Array<User>();
  userId: EventEmitter<User> = new EventEmitter<User>();
  @ViewChild('list') list: ElementRef;

  constructor(private httpService: HttpSearchService) {}

  ngOnInit() {
    this.getUsersList();
  }

  ngAfterViewChecked(): void {
    this.setActive(localStorage.getItem('curIndex'));
  }

  ngOnDestroy() {
    this.users = this.userId = null;
  }

  sendUser(user, index): void {
    localStorage.setItem('curUser', JSON.stringify(user));
    let temp = localStorage.getItem('curIndex');
    localStorage.setItem('curIndex', index + 1);
    this.setActive(index + 1, temp);
    this.userId.emit(user._id);
  }

  setActive(newIndex:any, oldIndex?:any): void {
    if (!newIndex) return;
    // console.log('hehe:', this.list.nativeElement.children[0], this.list.nativeElement.children[newIndex], newIndex);
    let li = this.list.nativeElement.children[newIndex];
    li &&  (li.className += ' active');
    if (oldIndex) {
      li = this.list.nativeElement.children[oldIndex];
      if (li) {
        li.className = li.className.split(' ').filter(name => name !== 'active').join(' ');
      }
    }
  }

  getUsersList(): void {
    this.httpService.query('/api/list/users')
      .subscribe(
        res => {
          if (res.status === 'ok')
            this.users = res.data
        }
      )
  }
}