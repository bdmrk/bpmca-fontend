import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityAreaComponent } from './community-area.component';

describe('CommunityAreaComponent', () => {
  let component: CommunityAreaComponent;
  let fixture: ComponentFixture<CommunityAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunityAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
