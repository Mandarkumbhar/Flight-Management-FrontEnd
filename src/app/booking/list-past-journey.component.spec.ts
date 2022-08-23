import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPastJourneyComponent } from './list-past-journey.component';

describe('ListPastJourneyComponent', () => {
  let component: ListPastJourneyComponent;
  let fixture: ComponentFixture<ListPastJourneyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPastJourneyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPastJourneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
