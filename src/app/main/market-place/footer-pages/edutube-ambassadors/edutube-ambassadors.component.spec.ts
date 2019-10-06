import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdutubeAmbassadorsComponent } from './edutube-ambassadors.component';

describe('EdutubeAmbassadorsComponent', () => {
  let component: EdutubeAmbassadorsComponent;
  let fixture: ComponentFixture<EdutubeAmbassadorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdutubeAmbassadorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdutubeAmbassadorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
