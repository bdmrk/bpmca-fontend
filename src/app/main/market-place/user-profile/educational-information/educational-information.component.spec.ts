import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationalInformationComponent } from './educational-information.component';

describe('EducationalInformationComponent', () => {
  let component: EducationalInformationComponent;
  let fixture: ComponentFixture<EducationalInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EducationalInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EducationalInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
