import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllFreeCoursesComponent } from './all-free-courses.component';

describe('AllFreeCoursesComponent', () => {
  let component: AllFreeCoursesComponent;
  let fixture: ComponentFixture<AllFreeCoursesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllFreeCoursesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllFreeCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
