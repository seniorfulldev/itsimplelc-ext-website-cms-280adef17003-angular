import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Career.DetailComponent } from './career.detail.component';

describe('Career.DetailComponent', () => {
  let component: Career.DetailComponent;
  let fixture: ComponentFixture<Career.DetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Career.DetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Career.DetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
