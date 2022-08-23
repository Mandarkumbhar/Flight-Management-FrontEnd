import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  userHome():void{
    this.router.navigateByUrl('/user');

  }
  flights():void{
    this.router.navigateByUrl('/user/flights');
  }
  bookings():void{
    this.router.navigateByUrl('/user/bookings');
  }
  profile():void{
    this.router.navigateByUrl('/user/profile');
  }

}
