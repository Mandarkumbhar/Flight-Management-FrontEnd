/*
import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable, Subscription, fromEvent, merge } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { Flight } from './flight';
import { FlightService } from './flight.service';

import { GenericValidator } from '../shared/generic-validator';

@Component({
  templateUrl: './flight-edit.component.html'
})
export class FlightEditComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  pageTitle = 'Flight Edit';
  errorMessage: string;
  flightForm: FormGroup;

  flight: Flight;
  private sub: Subscription;

  // Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  get tags(): FormArray {
    return this.flightForm.get('tags') as FormArray;
  }

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private flightService: FlightService) {

    // Defines all of the validation messages for the form.
    // These could instead be retrieved from a file or database.
    this.validationMessages = {
      carrierName: {
        required: 'Carrier name is required.',
        minlength: 'Carrier name must be at least three characters.',
        maxlength: 'Carrier name cannot exceed 50 characters.'
      },
      flightModel: {
        required: 'Flight Model is required.'
      }
      starRating: {
        range: 'Rate the product between 1 (lowest) and 5 (highest).'
      }
    };

    // Define an instance of the validator for use with this form,
    // passing in this form's set of validation messages.
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    this.flightForm = this.fb.group({
      carrierName: ['', [Validators.required,
                         Validators.minLength(3),
                         Validators.maxLength(50)]],
      flightModel: ['', Validators.required],
      starRating: ['', NumberValidators.range(1, 5)],
      tags: this.fb.array([]),
      seseatCapacity: ''
    });

    // Read the product Id from the route parameter
    this.sub = this.route.paramMap.subscribe(
      params => {
        const flightId = +params.get('flightId');
        this.getFlight(flightId);
      }
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngAfterViewInit(): void {
    // Watch for the blur event from any input element on the form.
    // This is required because the valueChanges does not provide notification on blur
    const controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    // Merge the blur event observable with the valueChanges observable
    // so we only need to subscribe once.
    merge(this.flightForm.valueChanges, ...controlBlurs).pipe(
      debounceTime(800)
    ).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.flightForm);
    });
  }

  addTag(): void {
    this.tags.push(new FormControl());
  }

  deleteTag(index: number): void {
    this.tags.removeAt(index);
    this.tags.markAsDirty();
  }

  getFlight(flightId: number): void {
    this.flightService.getFlight(flightId)
      .subscribe({
        next: (flight: Flight) => this.displayFlight(flight),
        error: err => this.errorMessage = err
      });
  }

  displayFlight(flight: Flight): void {
    if (this.flightForm) {
      this.flightForm.reset();
    }
    this.flight = flight;

    if (this.flight.flightId === 0) {
      this.pageTitle = 'Add Flight';
    } else {
      this.pageTitle = `Edit Flight: ${this.flight.carrierName}`;
    }

    // Update the data on the form
    this.flightForm.patchValue({
      carrierName: this.flight.carrierName,
      flightModel: this.flight.flightModel,
      seatCapacity: this.flight.seatCapacity
    });
    //this.flightForm.setControl('tags', this.fb.array(this.flight.tags || []));
  }

  deleteFlight(): void {
    if (this.flight.flightId === 0) {
      // Don't delete, it was never saved.
      this.onSaveComplete();
    } else {
      if (confirm(`Really delete the flight: ${this.flight.carrierName}?`)) {
        this.flightService.deleteFlight(this.flight.flightId)
          .subscribe({
            next: () => this.onSaveComplete(),
            error: err => this.errorMessage = err
          });
      }
    }
  }

  saveFlight(): void {
    if (this.flightForm.valid) {
      if (this.flightForm.dirty) {
        const p = { ...this.flight, ...this.flightForm.value };

        if (p.flightId === 0) {
          this.flightService.createFlight(p)
            .subscribe({
              next: () => this.onSaveComplete(),
              error: err => this.errorMessage = err
            });
        } else {
          this.flightService.updateFlight(p)
            .subscribe({
              next: () => this.onSaveComplete(),
              error: err => this.errorMessage = err
            });
        }
      } else {
        this.onSaveComplete();
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }

  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.flightForm.reset();
    this.router.navigate(['/flights']);
  }
}





import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

//import { MessageService } from '../messages/message.service';

import { Flight, FlightResolved } from '../scheduled-flight/flight';
import { FlightService } from '../shared/flight.service';

@Component({
  templateUrl: './edit-flight.component.html',
  styleUrls: ['./edit-flight.component.css']
})
export class EditFlightComponent implements OnInit {
  pageTitle = 'Flight Edit';
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
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Flight } from '../scheduled-flight/flight';
import {first} from "rxjs/operators";
import { FlightService } from '../shared/flight.service';
@Component({
  selector: 'app-edit-flight',
  templateUrl: './edit-flight.component.html',
  styleUrls: ['./edit-flight.component.css']
})
export class EditFlightComponent implements OnInit {

  flight!:Flight;
  editForm!:FormGroup;
  id:number=0;
 
constructor(private ActivatedRoute:ActivatedRoute,private formBuilder: FormBuilder,private router: Router, private flightService: FlightService) { }
 
ngOnInit() {
 
  this.id = Number(this.ActivatedRoute.snapshot.paramMap.get("flightId"));
    console.log(this.id+" " +this.ActivatedRoute)
    this.flightService.getFlight(this.id).subscribe(
      (data)=>{console.log(data);this.flight=data;
        this.editForm = this.formBuilder.group({
          //flightIdLong: this.flight.flightId,
          //availableSeats: this.scheduledFlight.availableSeats,
          flightId:this.flight.flightId,
          carrierName:this.flight.carrierName,
          flightModel:this.flight.flightModel,
          seatCapacity:this.flight.seatCapacity
          
        });},
      (err)=>console.log(err)
    );
    
  
    


    }

  onCancel() {
    this.router.navigate(['/admin','flights']);
  }  

  onSubmit() {
    console.log(this.editForm.value +"from onSubmit of edit flight")
    this.flightService.updateFlight(this.editForm.value)
      .pipe(first())
      .subscribe(
        data => {this.flight =data;this.router.navigate(['/admin','flights'])},
        (err)=>{console.log(err)}
         
      )}}



