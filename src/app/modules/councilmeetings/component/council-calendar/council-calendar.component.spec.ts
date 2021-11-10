import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CouncilCalendarComponent } from './council-calendar.component';

describe('CouncilCalendarComponent', () => {
  let component: CouncilCalendarComponent;
  let fixture: ComponentFixture<CouncilCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CouncilCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CouncilCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
