import { Component } from '@angular/core';

@Component({
  selector: 'home',
  templateUrl: './home.html'
})
export class HomeComponent {
  userId: string;
  constructor() {
    
  }
  getUserId(userId) {
    this.userId = userId;
  }
}
