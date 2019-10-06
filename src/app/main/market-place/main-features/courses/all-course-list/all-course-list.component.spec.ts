import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCourseListComponent } from './all-course-list.component';

describe('AllCourseListComponent', () => {
  let component: AllCourseListComponent;
  let fixture: ComponentFixture<AllCourseListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllCourseListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllCourseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
