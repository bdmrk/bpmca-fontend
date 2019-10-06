import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseFilterSectionComponent } from './course-filter-section.component';

describe('CourseFilterSectionComponent', () => {
  let component: CourseFilterSectionComponent;
  let fixture: ComponentFixture<CourseFilterSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseFilterSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseFilterSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
