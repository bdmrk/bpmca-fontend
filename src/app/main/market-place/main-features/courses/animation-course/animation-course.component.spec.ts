import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimationCourseComponent } from './animation-course.component';

describe('AnimationCourseComponent', () => {
  let component: AnimationCourseComponent;
  let fixture: ComponentFixture<AnimationCourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimationCourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimationCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
