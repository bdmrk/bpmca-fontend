import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatedTutorSectionComponent } from './related-tutor-section.component';

describe('RelatedTutorSectionComponent', () => {
  let component: RelatedTutorSectionComponent;
  let fixture: ComponentFixture<RelatedTutorSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelatedTutorSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatedTutorSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
