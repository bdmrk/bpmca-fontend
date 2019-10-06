import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatedLiveClassSectionComponent } from './related-live-class-section.component';

describe('RelatedLiveClassSectionComponent', () => {
  let component: RelatedLiveClassSectionComponent;
  let fixture: ComponentFixture<RelatedLiveClassSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelatedLiveClassSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatedLiveClassSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
