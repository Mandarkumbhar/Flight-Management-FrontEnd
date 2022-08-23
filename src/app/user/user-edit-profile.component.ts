import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-edit-profile',
  templateUrl: './user-edit-profile.component.html',
  styleUrls: ['./user-edit-profile.component.css']
})
export class UserEditProfileComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  saveProfile():void{
    this.router.navigateByUrl('/user/profile');
  }

}
