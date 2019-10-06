import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorAvailableSlotsComponent } from './tutor-available-slots.component';

describe('TutorAvailableSlotsComponent', () => {
  let component: TutorAvailableSlotsComponent;
  let fixture: ComponentFixture<TutorAvailableSlotsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TutorAvailableSlotsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorAvailableSlotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
