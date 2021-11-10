import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GgMapComponent } from './gg-map.component';

describe('GgMapComponent', () => {
  let component: GgMapComponent;
  let fixture: ComponentFixture<GgMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GgMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GgMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
