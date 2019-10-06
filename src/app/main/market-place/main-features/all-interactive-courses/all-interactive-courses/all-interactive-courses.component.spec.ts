import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllInteractiveCoursesComponent } from './all-interactive-courses.component';

describe('AllInteractiveCoursesComponent', () => {
  let component: AllInteractiveCoursesComponent;
  let fixture: ComponentFixture<AllInteractiveCoursesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllInteractiveCoursesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllInteractiveCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
