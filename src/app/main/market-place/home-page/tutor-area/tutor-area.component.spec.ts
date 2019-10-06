import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorAreaComponent } from './tutor-area.component';

describe('TutorAreaComponent', () => {
  let component: TutorAreaComponent;
  let fixture: ComponentFixture<TutorAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TutorAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
