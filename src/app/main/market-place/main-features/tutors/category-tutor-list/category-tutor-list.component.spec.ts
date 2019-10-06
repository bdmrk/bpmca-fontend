import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryTutorListComponent } from './category-tutor-list.component';

describe('CategoryTutorListComponent', () => {
  let component: CategoryTutorListComponent;
  let fixture: ComponentFixture<CategoryTutorListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryTutorListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryTutorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
