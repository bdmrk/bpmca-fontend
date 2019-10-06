import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NctbComponent } from './nctb.component';

describe('NctbComponent', () => {
  let component: NctbComponent;
  let fixture: ComponentFixture<NctbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NctbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NctbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
