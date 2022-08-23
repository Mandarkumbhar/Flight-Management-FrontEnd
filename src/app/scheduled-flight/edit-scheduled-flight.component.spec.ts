import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditScheduledFlightComponent } from './edit-scheduled-flight.component';

describe('EditScheduledFlightComponent', () => {
  let component: EditScheduledFlightComponent;
  let fixture: ComponentFixture<EditScheduledFlightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditScheduledFlightComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditScheduledFlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
