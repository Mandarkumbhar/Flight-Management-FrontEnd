import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddFlightComponent } from '../flight/add-flight.component';
import { ViewFlightComponent } from '../flight/view-flight.component';
import { ScheduleFlightComponent } from '../scheduled-flight/schedule-flight.component';
import { ViewScheduledFlightComponent } from '../scheduled-flight/view-scheduled-flight.component';
import { AdminGuard } from '../service/admin.guard';
import { AdminHomeComponent } from './admin-home.component';
import { AdminWelcomeComponent } from './admin-welcome.component';
import { ViewBookingComponent } from './view-booking.component';

const routes: Routes = [
  {
    path: '',
    component: AdminHomeComponent, canActivate:[AdminGuard],
    children: [
      
      { path: '', component: AdminWelcomeComponent },
      {
        path: 'flights',
        
        loadChildren: () =>
          import('../flight/flight-routing.module').then(m => m.FlightRoutingModule)
      },
      {
        path: 'scheduleFlight',
        
        loadChildren: () =>
          import('../scheduled-flight/scheduled-flight-routing.module').then(m => m.ScheduledFlightRoutingModule)
      },
      //{ path: 'flights', component: ViewFlightComponent },
      //{ path: 'addFlight', component: AddFlightComponent },
      //{ path: 'scheduleFlight', component: ScheduleFlightComponent },
      //{ path: 'scheduledFlights', component: ViewScheduledFlightComponent },
      { path: 'bookings', component: ViewBookingComponent },
      
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
