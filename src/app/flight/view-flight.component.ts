import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Flight } from '../scheduled-flight/flight';
import { FlightService } from '../shared/flight.service';

@Component({
  selector: 'app-view-flight',
  templateUrl: './view-flight.component.html',
  styleUrls: ['./view-flight.component.css']
})
export class ViewFlightComponent implements OnInit {

  pageTitle = 'Flight List';
  errorMessage = '';

  _listFilter = '';
  //editForm: any;
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredFlights = this.listFilter ? this.performFilter(this.listFilter) : this.flights;
  }

  filteredFlights: Flight[] = [];
  flights: Flight[] = [];

  constructor(private flightService: FlightService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
   
    this.listFilter = this.route.snapshot.queryParamMap.get('filterBy') || '';

    this.flightService.getAllFlights().subscribe({
      next: flights => {
        this.flights = flights;
        this.filteredFlights = this.performFilter(this.listFilter);
      },
      error: err => this.errorMessage = err
    });
  }

  performFilter(filterBy: string): Flight[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.flights.filter((flight: Flight) =>
      flight.carrierName.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  onDelete(flight:Flight): void {
          this.flightService.deleteFlight(flight.flightId)
             .subscribe( data => {
               console.log("Flight deleted")
                    this.filteredFlights = this.filteredFlights.filter(u => u !== flight);
                   })
                   //this.router.navigate(['/admin','flights']);     
    };

  

  
  

}
