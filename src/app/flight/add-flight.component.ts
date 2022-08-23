/*import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pm-flight-add',
  templateUrl: './flight-add.component.html',
  styleUrls: ['./flight-add.component.css']
})
export class FlightAddComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}



import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

import { Flight } from './flight';

@Component({
  selector: 'pm-flight-add',
  templateUrl: './flight-add.component.html',
  styleUrls: ['./flight-add.component.css']
})
export class FlightAddComponent implements OnInit {
  @ViewChild(NgForm, { static: false }) flightForm: NgForm;

  errorMessage: string;
  flight: Flight;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.parent.data.subscribe(data => {
      if (this.flightForm) {
        this.flightForm.reset();
      }

      this.flight = data['resolvedData'].flight;
    });
  }

}



import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

//import { MessageService } from '../messages/message.service';

import { Flight, FlightResolved } from '../scheduled-flight/flight';
import { FlightService } from '../shared/flight.service';

@Component({
  templateUrl: './add-flight.component.html',
  styleUrls: ['./add-flight.component.css']
})
export class AddFlightComponent implements OnInit {
  pageTitle = 'Flight Add';
  errorMessage!: string;

  private dataIsValid: { [key: string]: boolean } = {};
  flightForm!: NgForm;

  get isDirty(): boolean {
    return JSON.stringify(this.originalFlight) !== JSON.stringify(this.currentFlight);
  }

  private currentFlight!: Flight;
  private originalFlight!: Flight;

  get flight(): Flight {
    return this.currentFlight;
  }
  set flight(value: Flight) {
    this.currentFlight = value;
    // Clone the object to retain a copy
    this.originalFlight = { ...value };
  }

  constructor(private flightService: FlightService,
              //private messageService: MessageService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      if (this.flightForm) {
        this.flightForm.reset();
      }
      const resolvedData: FlightResolved = data['resolvedData'];
      this.errorMessage = resolvedData.error;
      this.onFlightRetrieved(resolvedData.flight);
    });
  }

  onFlightRetrieved(flight: Flight): void {
    this.flight = flight;

    if (!this.flight) {
      this.pageTitle = 'No flight found';
    } else {
      if (this.flight.flightId === 0) {
        this.pageTitle = 'Add Flight';
      } else {
        this.pageTitle = `Edit Flight: ${this.flight.carrierName}`;
      }
    }
  }

  deleteFlight(): void {
    if (this.flight.flightId === 0) {
      // Don't delete, it was never saved.
      this.onSaveComplete(`${this.flight.carrierName} was deleted`);
    } else {
      if (confirm(`Really delete the flight: ${this.flight.carrierName}?`)) {
        this.flightService.deleteFlight(this.flight.flightId).subscribe({
          next: () => this.onSaveComplete(`${this.flight.carrierName} was deleted`),
          error: err => this.errorMessage = err
        });
      }
    }
  }

  isValid(path?: string): boolean {
    this.validate();
    if (path) {
      return this.dataIsValid[path];
    }
    return (this.dataIsValid &&
      Object.keys(this.dataIsValid).every(d => this.dataIsValid[d] === true));
  }

  /*reset(): void {
    this.dataIsValid = null;
    this.currentFlight = null;
    this.originalFlight = null;
  }

  saveFlight(): void {
    if (this.isValid()) {
      if (this.flight.flightId === 0) {
        this.flightService.createFlight(this.flight).subscribe({
          next: () => this.onSaveComplete(`The new ${this.flight.carrierName} was saved`),
          error: err => this.errorMessage = err
        });
      } else {
        this.flightService.updateFlight(this.flight).subscribe({
          next: () => this.onSaveComplete(`The updated ${this.flight.carrierName} was saved`),
          error: err => this.errorMessage = err
        });
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }

  onSaveComplete(message?: string): void {
    /*if (message) {
      this.messageService.addMessage(message);
    }
    //this.reset();

    // Navigate back to the product list
    this.router.navigate(['/flight']);
  }

  validate(): void {
    // Clear the validation object
    this.dataIsValid = {};

    // 'info' tab
    if (this.flight.carrierName &&
      this.flight.carrierName.length >= 3 &&
      this.flight.flightModel) {
      this.dataIsValid['info'] = true;
    } else {
      this.dataIsValid['info'] = false;
    }

    /* 'tags' tab
    if (this.product.category &&
      this.product.category.length >= 3) {
      this.dataIsValid['tags'] = true;
    } else {
      this.dataIsValid['tags'] = false;
    }
  }

}
*/

import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Flight } from '../scheduled-flight/flight';
import {first} from "rxjs/operators";
import { FlightService } from '../shared/flight.service';
@Component({
  selector: 'app-add-flight',
  templateUrl: './add-flight.component.html',
  styleUrls: ['./add-flight.component.css']
})
export class AddFlightComponent implements OnInit {

  flight!:Flight;
  editForm!:FormGroup;
  id:number=0;
  submitted = false;
 
constructor(private ActivatedRoute:ActivatedRoute,private formBuilder: FormBuilder,private router: Router, private flightService: FlightService) { }
 
ngOnInit() {
 
  
        this.editForm = this.formBuilder.group({
          
          carrierName:['',Validators.required,
                          Validators.minLength(6),
                          Validators.maxLength(20)
                      ],
          flightModel:['',Validators.required],
          seatCapacity:[0,Validators.required]
          
        });
     
    
         
      
    }

    get f(): { [key: string]: AbstractControl } {
      return this.editForm.controls ;
    }

    get carrierName() {
      return this.editForm.get('carrierName') as FormControl;
    }

    get flightModel() {
      return this.editForm.get('flightModel') as FormControl;
    }

    get seatCapacity() {
      return this.editForm.get('seatCapacity') as FormControl;
    }

    onCancel(): void {
      this.router.navigate(['/admin','flights']);
    }

    onSubmit(): void {
      this.submitted=true;
      if (this.editForm.invalid) {
        return;
      }
      else{console.log(this.editForm.value +"from onSubmit of add flight")
      this.flightService.createFlight(this.editForm.value)
        .pipe(first())
        .subscribe(
          data => {this.flight =data;this.router.navigate(['/admin','flights'])},
          (err)=>{console.log(err)}
         
      )
      console.log(JSON.stringify(this.editForm.value, null, 2));
    }
      
      }}



