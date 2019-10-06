import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllLiveClassListComponent } from './all-live-class-list.component';

describe('AllLiveClassListComponent', () => {
  let component: AllLiveClassListComponent;
  let fixture: ComponentFixture<AllLiveClassListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllLiveClassListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllLiveClassListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
