import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardsCommissionsComponent } from './boards-commissions.component';

describe('BoardsCommissionsComponent', () => {
  let component: BoardsCommissionsComponent;
  let fixture: ComponentFixture<BoardsCommissionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardsCommissionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardsCommissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
