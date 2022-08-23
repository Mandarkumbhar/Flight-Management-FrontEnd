import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Airport } from '../scheduled-flight/airport';
import { Flight } from '../scheduled-flight/flight';
import { ScheduledFlight } from '../scheduled-flight/scheduled-flight';
import { AirportService } from '../shared/airport.service';
import { FlightService } from '../shared/flight.service';
import { ScheduledFlightService } from '../shared/scheduled-flight.service';

@Component({
  selector: 'app-view-available-flight',
  templateUrl: './view-available-flight.component.html',
  styleUrls: ['./view-available-flight.component.css']
})
export class ViewAvailableFlightComponent implements OnInit {
  pageTitle = 'Available Flights:';
  addForm!:FormGroup;
  airports!: Airport[];
  flights!: Flight[];
  sFlight!: [];
  scheduleFlights!: ScheduledFlight[];
  private error! : string;
  errorMessage = '';
  source! : number;
  destination! : number;
  flightDate! : Date;
  showFlights = [];
 
  // fromLoc!: string;
  // toLoc!: string;
  // date! : Date;
  searchFlight!: FormGroup;
  
 
 
 
  _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredFlights = this.listFilter ? this.performFilter(this.listFilter) : this.flights;
  }
 
  filteredFlights: Flight[] = [];
 
 
  constructor(private formBuilder: FormBuilder,
              private router: Router, 
              private airportService:AirportService, 
              private flightService:FlightService,
              private route: ActivatedRoute,
              private scheduledFlightService: ScheduledFlightService) { 
                  
              }
 
  ngOnInit(): void {
    this.listFilter = this.route.snapshot.queryParamMap.get('filterBy') || '';
    this.addForm = this.formBuilder.group({ 
    
  });
 
  this.searchFlight = this.formBuilder.group({
    sourceAirport:['',Validators.required],
    destinationAirport:['',Validators.required],
    date:['',Validators.required],
  });
 
  this.flightService.getAllFlights().subscribe({
    next: flights => {
      this.flights = flights;
      this.filteredFlights = this.performFilter(this.listFilter);
    },
    error: err => this.errorMessage = err
  });
 
  // onClick(): void {
  //   console.log(`The show flight button was clicked!`),
  // }
  this.airportService.getAllAirports().subscribe(
    (data)=>{this.airports = data;console.log(this.airports);},
    (err)=>this.error = err
  
  ) 
 
  this.flightService.getAllFlights().subscribe(
    (data)=>{this.flights = data;console.log(this.flights);},
    (err)=>this.error = err
  
  )   
  
 
  }
 
  performFilter(filterBy: string): Flight[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.flights.filter((flight: Flight) =>
      flight.carrierName.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }
 
  onSubmit() {
    console.log(this.searchFlight.value);
    console.log("this is the date");
    console.log(this.searchFlight.get('date')?.value);
    //this.source = Number(this.searchFlight.get('sourceAirport'));
    //this.destination = Number(this.searchFlight.get('destinationAirport'));
    //flightDate1: any = (this.searchFlight.get('scheduledDate'));
 
    this.scheduledFlightService.getFlightByDate(this.searchFlight.get('sourceAirport')?.value, this.searchFlight.get('destinationAirport')?.value, this.searchFlight.get('date')?.value).subscribe(
      (flights)=>{console.log("this is flight info");console.log(flights);this.scheduleFlights=flights},
      
    );
  }
  
  // onSubmit() {
  //   console.log(this.searchFlight.value);
  //   this.scheduledFlightService.getFlightByDate(this.sourceAirport, this.destinationAirport, this.scheduledDate).subscribe({
 
  //   }
     
  // )
  //}
 
}


 
// -------------
// (resp) => {
//   console.log(resp);
//   this.studentDetails = resp;
// },
// (err) => {
//   console.log(err);
// }
// );


 
// {
//   next: flights => {
//     this.scheduleFlights = flights;
    
//     },
 
//   }
