import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CouncilmeetingsComponent } from './councilmeetings.component';

describe('CouncilmeetingsComponent', () => {
  let component: CouncilmeetingsComponent;
  let fixture: ComponentFixture<CouncilmeetingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CouncilmeetingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CouncilmeetingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
