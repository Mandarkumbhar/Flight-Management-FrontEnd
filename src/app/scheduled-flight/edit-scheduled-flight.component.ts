import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ScheduledFlightService } from '../shared/scheduled-flight.service';
import { ScheduledFlight } from './scheduled-flight';
import {first} from "rxjs/operators";
import { Airport } from './airport';
import { Flight } from './flight';
import { AirportService } from '../shared/airport.service';
import { FlightService } from '../shared/flight.service';

@Component({
  selector: 'app-edit-scheduled-flight',
  templateUrl: './edit-scheduled-flight.component.html',
  styleUrls: ['./edit-scheduled-flight.component.css']
})
export class EditScheduledFlightComponent implements OnInit {
  airports!: Airport[];
  flights!: Flight[];
  private error! : string
  scheduledFlight!:ScheduledFlight;
editForm!:FormGroup;
id:number=0;
 
constructor(private _ActivatedRoute:ActivatedRoute,
  private formBuilder: FormBuilder,
  private router: Router, 
  private scheduledService: ScheduledFlightService,
  private airportService:AirportService, 
  private flightService:FlightService) { }
 
ngOnInit() {
 
  this.id = Number(this._ActivatedRoute.snapshot.paramMap.get("scheduledFlightId"));
    console.log(this.id+" " +this._ActivatedRoute)
    this.scheduledService.getFlight(this.id).subscribe(
      (data)=>{console.log(data);this.scheduledFlight=data;
        this.editForm = this.formBuilder.group({
          scheduledFlightIdLong: this.formBuilder.control(this.scheduledFlight.scheduledFlightIdLong),
          availableSeats: this.formBuilder.control(this.scheduledFlight.availableSeats),
          flight: this.formBuilder.group({
            flightId: this.formBuilder.control(this.scheduledFlight.flight.flightId)
            
          }),
          schedule: this.formBuilder.group({
            arraivalTime: this.formBuilder.control(this.scheduledFlight.schedule.arraivalTime),
            departureTime: this.formBuilder.control(this.scheduledFlight.schedule.departureTime),
            destinationAirport: this.formBuilder.group({
            id: this.formBuilder.control(this.scheduledFlight.schedule.destinationAirport.id)
            
          }), 

          scheduleDate: this.formBuilder.control(this.scheduledFlight.schedule.scheduleDate),
          sourceAirport: this.formBuilder.group({
          id: this.formBuilder.control(this.scheduledFlight.schedule.sourceAirport.id)
          
        })
        }),
        cost: this.formBuilder.control(this.scheduledFlight.cost ),
        scheduledStatus: "SCHEDULED"
        
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
  onSubmit() {
    console.log("object is +++++++++"+this.editForm.value +"from onSubmit of edit customer component")
    this.scheduledService.updateFlight(this.editForm.value)
      .pipe(first())
      .subscribe(
        data => {this.scheduledFlight =data;this.router.navigate(['/admin','scheduleFlight'])},
        (err)=>{console.log(err)}
         
      )}}



