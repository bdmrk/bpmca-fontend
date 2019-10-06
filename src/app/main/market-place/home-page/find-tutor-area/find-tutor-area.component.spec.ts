import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindTutorAreaComponent } from './find-tutor-area.component';

describe('FindTutorAreaComponent', () => {
  let component: FindTutorAreaComponent;
  let fixture: ComponentFixture<FindTutorAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindTutorAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindTutorAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
