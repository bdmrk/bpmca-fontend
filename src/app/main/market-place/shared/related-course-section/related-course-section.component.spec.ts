import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatedCourseSectionComponent } from './related-course-section.component';

describe('RelatedCourseSectionComponent', () => {
  let component: RelatedCourseSectionComponent;
  let fixture: ComponentFixture<RelatedCourseSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelatedCourseSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatedCourseSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
