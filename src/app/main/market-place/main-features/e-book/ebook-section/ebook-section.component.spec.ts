import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EbookSectionComponent } from './ebook-section.component';

describe('EbookSectionComponent', () => {
  let component: EbookSectionComponent;
  let fixture: ComponentFixture<EbookSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EbookSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EbookSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
