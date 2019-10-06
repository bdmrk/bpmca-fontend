import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingAvailableSlotComponent } from './booking-available-slot.component';

describe('BookingAvailableSlotComponent', () => {
  let component: BookingAvailableSlotComponent;
  let fixture: ComponentFixture<BookingAvailableSlotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingAvailableSlotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingAvailableSlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
