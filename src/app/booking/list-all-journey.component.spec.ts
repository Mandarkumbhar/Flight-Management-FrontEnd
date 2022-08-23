import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAllJourneyComponent } from './list-all-journey.component';

describe('ListAllJourneyComponent', () => {
  let component: ListAllJourneyComponent;
  let fixture: ComponentFixture<ListAllJourneyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAllJourneyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAllJourneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
