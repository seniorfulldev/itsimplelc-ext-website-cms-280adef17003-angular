import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AisSearchComponent } from './ais-search.component';

describe('AisSearchComponent', () => {
  let component: AisSearchComponent;
  let fixture: ComponentFixture<AisSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AisSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AisSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
