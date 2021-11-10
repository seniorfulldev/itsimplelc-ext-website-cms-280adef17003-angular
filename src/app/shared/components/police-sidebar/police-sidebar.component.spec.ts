import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoliceSidebarComponent } from './police-sidebar.component';

describe('PoliceSidebarComponent', () => {
  let component: PoliceSidebarComponent;
  let fixture: ComponentFixture<PoliceSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoliceSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoliceSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
