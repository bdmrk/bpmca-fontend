import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveClassFilterSectionComponent } from './live-class-filter-section.component';

describe('LiveClassFilterSectionComponent', () => {
  let component: LiveClassFilterSectionComponent;
  let fixture: ComponentFixture<LiveClassFilterSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveClassFilterSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveClassFilterSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
