import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewScheduledFlightComponent } from './view-scheduled-flight.component';

describe('ViewScheduledFlightComponent', () => {
  let component: ViewScheduledFlightComponent;
  let fixture: ComponentFixture<ViewScheduledFlightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewScheduledFlightComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewScheduledFlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
