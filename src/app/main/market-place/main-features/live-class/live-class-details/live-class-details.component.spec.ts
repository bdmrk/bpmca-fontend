import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveClassDetailsComponent } from './live-class-details.component';

describe('LiveClassDetailsComponent', () => {
  let component: LiveClassDetailsComponent;
  let fixture: ComponentFixture<LiveClassDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveClassDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveClassDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
