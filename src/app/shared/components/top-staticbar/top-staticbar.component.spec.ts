import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopStaticbarComponent } from './top-staticbar.component';

describe('TopStaticbarComponent', () => {
  let component: TopStaticbarComponent;
  let fixture: ComponentFixture<TopStaticbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopStaticbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopStaticbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
