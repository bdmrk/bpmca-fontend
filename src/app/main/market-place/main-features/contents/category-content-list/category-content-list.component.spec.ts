import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryContentListComponent } from './category-content-list.component';

describe('CategoryContentListComponent', () => {
  let component: CategoryContentListComponent;
  let fixture: ComponentFixture<CategoryContentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryContentListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryContentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
