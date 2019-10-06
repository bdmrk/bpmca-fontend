import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BecomeTutorAreaComponent } from './become-tutor-area.component';

describe('BecomeTutorAreaComponent', () => {
  let component: BecomeTutorAreaComponent;
  let fixture: ComponentFixture<BecomeTutorAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BecomeTutorAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BecomeTutorAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
