import { Component, OnInit } from '@angular/core';
import { ScheduledFlightService } from '../shared/scheduled-flight.service';
import { ScheduledFlight } from './scheduled-flight';

@Component({
  selector: 'app-view-scheduled-flight',
  templateUrl: './view-scheduled-flight.component.html',
  styleUrls: ['./view-scheduled-flight.component.css']
})
export class ViewScheduledFlightComponent implements OnInit {
  scheduledFlights!: ScheduledFlight[];
  errorMessage = '';
  constructor(private scheduledFlightService:ScheduledFlightService) { }

  ngOnInit(): void {
    this.scheduledFlightService.getAllFlights().subscribe({
      next: flights => {
        this.scheduledFlights = flights;
        
      },
      error: err => this.errorMessage = err
    });
  }
  onDelete(flight:ScheduledFlight): void {
    this.scheduledFlightService.cancelFlight(flight)
       .subscribe( data => {
         console.log("Flight cancelled")
              this.ngOnInit();
             })
             //this.router.navigate(['/admin','flights']);     
};

}
