import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EatlEducationComponent } from './eatl-education.component';

describe('EatlEducationComponent', () => {
  let component: EatlEducationComponent;
  let fixture: ComponentFixture<EatlEducationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EatlEducationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EatlEducationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
