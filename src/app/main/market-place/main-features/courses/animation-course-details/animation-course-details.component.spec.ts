import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimationCourseDetailsComponent } from './animation-course-details.component';

describe('AnimationCourseDetailsComponent', () => {
  let component: AnimationCourseDetailsComponent;
  let fixture: ComponentFixture<AnimationCourseDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimationCourseDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimationCourseDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
