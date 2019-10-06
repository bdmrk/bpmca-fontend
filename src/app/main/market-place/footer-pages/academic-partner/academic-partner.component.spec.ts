import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicPartnerComponent } from './academic-partner.component';

describe('AcademicPartnerComponent', () => {
  let component: AcademicPartnerComponent;
  let fixture: ComponentFixture<AcademicPartnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcademicPartnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcademicPartnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
