import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorCategoryComponent } from './tutor-category.component';

describe('TutorCategoryComponent', () => {
  let component: TutorCategoryComponent;
  let fixture: ComponentFixture<TutorCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TutorCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
