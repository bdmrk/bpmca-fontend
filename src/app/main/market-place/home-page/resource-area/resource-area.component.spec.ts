import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceAreaComponent } from './resource-area.component';

describe('ResourceAreaComponent', () => {
  let component: ResourceAreaComponent;
  let fixture: ComponentFixture<ResourceAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourceAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
