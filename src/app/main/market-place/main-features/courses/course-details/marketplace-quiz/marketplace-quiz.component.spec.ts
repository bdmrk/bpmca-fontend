import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketplaceQuizComponent } from './marketplace-quiz.component';

describe('MarketplaceQuizComponent', () => {
  let component: MarketplaceQuizComponent;
  let fixture: ComponentFixture<MarketplaceQuizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketplaceQuizComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketplaceQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
