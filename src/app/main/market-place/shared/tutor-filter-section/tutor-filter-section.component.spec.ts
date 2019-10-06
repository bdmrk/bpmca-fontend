import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorFilterSectionComponent } from './tutor-filter-section.component';

describe('TutorFilterSectionComponent', () => {
  let component: TutorFilterSectionComponent;
  let fixture: ComponentFixture<TutorFilterSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TutorFilterSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorFilterSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
