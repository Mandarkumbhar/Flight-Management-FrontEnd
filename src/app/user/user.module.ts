import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserHomeComponent } from './user-home.component';
import { UserWelcomeComponent } from './user-welcome.component';
import { UserProfileComponent } from './user-profile.component';
import { UserEditProfileComponent } from './user-edit-profile.component';


@NgModule({
  declarations: [
    UserHomeComponent,
    UserWelcomeComponent,
    UserProfileComponent,
    UserEditProfileComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
