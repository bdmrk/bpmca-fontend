import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTutorListComponent } from './all-tutor-list.component';

describe('AllTutorListComponent', () => {
  let component: AllTutorListComponent;
  let fixture: ComponentFixture<AllTutorListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllTutorListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllTutorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
