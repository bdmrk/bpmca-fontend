import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryLiveClassListComponent } from './category-live-class-list.component';

describe('CategoryLiveClassListComponent', () => {
  let component: CategoryLiveClassListComponent;
  let fixture: ComponentFixture<CategoryLiveClassListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryLiveClassListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryLiveClassListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
