import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingListComponent } from '../booking/booking-list.component';
import { BookingComponent } from '../booking/booking.component';
import { DisplayTicketComponent } from '../booking/display-ticket.component';
import { ViewAvailableFlightComponent } from '../booking/view-available-flight.component';
import { UserGuard } from '../service/user.guard';
import { UserEditProfileComponent } from './user-edit-profile.component';
import { UserHomeComponent } from './user-home.component';
import { UserProfileComponent } from './user-profile.component';
import { UserWelcomeComponent } from './user-welcome.component';

const routes: Routes = [
  {
    path: '',
    component: UserHomeComponent, canActivate:[UserGuard],
    children: [
      
      { path: '', component: UserWelcomeComponent},
      { path: 'flights', component:  ViewAvailableFlightComponent},
      { path: 'bookings', component:  BookingListComponent},
      { path: 'profile', component:  UserProfileComponent},
      { path: 'bookNow', component:  BookingComponent},
      { path: 'ticket', component:  DisplayTicketComponent},
      { path: 'edit', component:  UserEditProfileComponent}

      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
