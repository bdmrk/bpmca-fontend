import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportAreaComponent } from './support-area.component';

describe('SupportAreaComponent', () => {
  let component: SupportAreaComponent;
  let fixture: ComponentFixture<SupportAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupportAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
