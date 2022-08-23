import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminHomeComponent } from './admin-home.component';
import { AdminWelcomeComponent } from './admin-welcome.component';
import { ViewBookingComponent } from './view-booking.component';


@NgModule({
  declarations: [
    AdminHomeComponent,
    AdminWelcomeComponent,
    ViewBookingComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
