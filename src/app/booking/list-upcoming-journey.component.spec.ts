import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUpcomingJourneyComponent } from './list-upcoming-journey.component';

describe('ListUpcomingJourneyComponent', () => {
  let component: ListUpcomingJourneyComponent;
  let fixture: ComponentFixture<ListUpcomingJourneyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListUpcomingJourneyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListUpcomingJourneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
