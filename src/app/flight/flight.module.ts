/*import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';



// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';


import { FlightListComponent } from './flight-list.component';
import { FlightDetailComponent } from './flight-detail.component';
import { FlightEditComponent } from './flight-edit.component';
import { FlightResolver } from './flight-resolver.service';

import { SharedModule } from '../shared/shared.module';
import { FlightEditGuard } from './flight-edit.guard';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: 'flights', component: FlightListComponent },
      { path: 'flights/:flightId', component: FlightDetailComponent },
      {
        path: 'flights/:flightId/edit',
        canDeactivate: [FlightEditGuard],
        component: FlightEditComponent
      }
    ])
  ],
  declarations: [
    FlightListComponent,
    FlightDetailComponent,
    FlightEditComponent
  ]
})
export class FlightModule { }
*/
import { NgModule } from '@angular/core';
//import { RouterModule } from '@angular/router';

import { ViewFlightComponent } from './view-flight.component';
import { EditFlightComponent } from './edit-flight.component';
import { AddFlightComponent } from './add-flight.component';
//import { FlightResolver } from './flight-resolver.service';

//import { FlightEditGuard } from './flight-edit.guard';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlightRoutingModule } from './flight-routing.module';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FlightRoutingModule
    /*RouterModule.forChild([
      {
        path: '',
        component: ViewFlightComponent
      },
      {
        path: ':flightId/edit',
        component: EditFlightComponent,
        //canDeactivate: [FlightEditGuard],
        //resolve: { resolvedData: FlightResolver },
      }  
    ])*/
  ],
  declarations: [
    ViewFlightComponent,
    EditFlightComponent,
    AddFlightComponent
  ]
})
export class FlightModule { }






