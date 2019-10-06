import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveClassSectionComponent } from './live-class-section.component';

describe('LiveClassSectionComponent', () => {
  let component: LiveClassSectionComponent;
  let fixture: ComponentFixture<LiveClassSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveClassSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveClassSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
