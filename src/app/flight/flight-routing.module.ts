import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddFlightComponent } from './add-flight.component';
import { EditFlightComponent } from './edit-flight.component';
import { ViewFlightComponent } from './view-flight.component';

const routes: Routes = [
  {
    path: '',
    component: ViewFlightComponent
  },
  
  {
    path: ':flightId/edit',
    component: EditFlightComponent,
    
  }, 
  
  {
    path: 'addFlight',
    component: AddFlightComponent,

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FlightRoutingModule { }
