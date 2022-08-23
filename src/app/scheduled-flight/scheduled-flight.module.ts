import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScheduledFlightRoutingModule } from './scheduled-flight-routing.module';
import { ScheduleFlightComponent } from './schedule-flight.component';
import { ViewScheduledFlightComponent } from './view-scheduled-flight.component';
import { EditScheduledFlightComponent } from './edit-scheduled-flight.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ScheduleFlightComponent,
    ViewScheduledFlightComponent,
    EditScheduledFlightComponent
  ],
  imports: [
    CommonModule,
    ScheduledFlightRoutingModule,
    ReactiveFormsModule
  ]
})
export class ScheduledFlightModule { }
