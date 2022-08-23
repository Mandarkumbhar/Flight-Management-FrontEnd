import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAvailableFlightComponent } from './view-available-flight.component';

describe('ViewAvailableFlightComponent', () => {
  let component: ViewAvailableFlightComponent;
  let fixture: ComponentFixture<ViewAvailableFlightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAvailableFlightComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAvailableFlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
