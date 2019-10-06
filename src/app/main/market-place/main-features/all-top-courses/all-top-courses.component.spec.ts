import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTopCoursesComponent } from './all-top-courses.component';

describe('AllTopCoursesComponent', () => {
  let component: AllTopCoursesComponent;
  let fixture: ComponentFixture<AllTopCoursesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllTopCoursesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllTopCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
