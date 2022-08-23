import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingRoutingModule } from './booking-routing.module';
import { ViewAvailableFlightComponent } from './view-available-flight.component';
import { BookingComponent } from './booking.component';
import { BookingListComponent } from './booking-list.component';
import { DisplayTicketComponent } from './display-ticket.component';
import { ListAllJourneyComponent } from './list-all-journey.component';
import { ListPastJourneyComponent } from './list-past-journey.component';
import { ListUpcomingJourneyComponent } from './list-upcoming-journey.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ViewAvailableFlightComponent,
    BookingComponent,
    BookingListComponent,
    DisplayTicketComponent,
    ListAllJourneyComponent,
    ListPastJourneyComponent,
    ListUpcomingJourneyComponent
  ],
  imports: [
    CommonModule,
    BookingRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class BookingModule { }
