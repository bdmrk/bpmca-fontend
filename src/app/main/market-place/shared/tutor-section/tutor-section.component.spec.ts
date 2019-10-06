import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorSectionComponent } from './tutor-section.component';

describe('TutorSectionComponent', () => {
  let component: TutorSectionComponent;
  let fixture: ComponentFixture<TutorSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TutorSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
