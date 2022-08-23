import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AirportService } from '../shared/airport.service';
import { FlightService } from '../shared/flight.service';
import { ScheduledFlightService } from '../shared/scheduled-flight.service';
import { Airport } from './airport';
import { Flight } from './flight';
import { ScheduledFlight } from './scheduled-flight';

@Component({
  selector: 'app-schedule-flight',
  templateUrl: './schedule-flight.component.html',
  styleUrls: ['./schedule-flight.component.css']
})
export class ScheduleFlightComponent implements OnInit {
  airports!: Airport[];
  flights!: Flight[];
  private error! : string
  scheduledFlight!: ScheduledFlight; 
  addForm!:FormGroup;
  
  
id:number=0;
 
constructor(private _ActivatedRoute:ActivatedRoute,
  private formBuilder: FormBuilder,
  private router: Router, 
  private scheduledService: ScheduledFlightService,
  private airportService:AirportService, 
  private flightService:FlightService) { }
  
 
ngOnInit() {
 
  
  this.scheduledService.getFlight(308).subscribe(
    (data)=>{console.log(data);this.scheduledFlight=data;
      this.addForm = this.formBuilder.group({
        
        availableSeats: this.formBuilder.control('', Validators.required),
        flight: this.formBuilder.group({
          flightId: ['']
          
        }),
        schedule: this.formBuilder.group({
          arraivalTime: this.formBuilder.control(this.scheduledFlight.schedule.arraivalTime),
          departureTime: this.formBuilder.control(this.scheduledFlight.schedule.departureTime),
          destinationAirport: this.formBuilder.group({
          id: ['']
          
        }), 

        scheduleDate: [''],
        sourceAirport: this.formBuilder.group({
        id: ['']
        
      })
      }),
      cost: [''] ,
      scheduledStatus: ['SCHEDULED']
      
    });},
    (err)=>console.log(err)
  );

    this.airportService.getAllAirports().subscribe(
      (data)=>{this.airports = data;console.log(this.airports);},
      (err)=>this.error = err
    
    ) 
    
    this.flightService.getAllFlights().subscribe(
      (data)=>{this.flights = data;console.log(this.flights);},
      (err)=>this.error = err
    
    ) 
    
         
      
    }
    // changeFlightId(e: { target: { value: any; }; }) {
    //   this.scheduledFlight.flight.flightId.setValue(e.target.value, {
    //     onlySelf: true
    //   })
    // }
    get availableSeats(){
      return this.addForm.get('availableSeats') as FormControl;
    }
    
  onSubmit() {
    console.log("object is +++++++++"+this.addForm.value +"from onSubmit of edit customer component")
    this.scheduledService.createFlight(this.addForm.value)
      .pipe(first())
      .subscribe(
        data => {this.scheduledFlight =data;this.router.navigate(['/admin','scheduleFlight'])},
        (err)=>{console.log(err)}
         
      )}}