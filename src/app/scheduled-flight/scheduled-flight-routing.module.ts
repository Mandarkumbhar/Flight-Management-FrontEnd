import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditScheduledFlightComponent } from './edit-scheduled-flight.component';
import { ScheduleFlightComponent } from './schedule-flight.component';
import { ViewScheduledFlightComponent } from './view-scheduled-flight.component';

const routes: Routes = [
  {
    path: '',
    component: ViewScheduledFlightComponent
  },
  {
    path: 'add',
    component: ScheduleFlightComponent
  },
  
  {
    path: ':scheduledFlightId/edit',
    component: EditScheduledFlightComponent
    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScheduledFlightRoutingModule { }
