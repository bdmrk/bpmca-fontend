import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FreeYoutubeCourseComponent } from './free-youtube-course.component';

describe('FreeYoutubeCourseComponent', () => {
  let component: FreeYoutubeCourseComponent;
  let fixture: ComponentFixture<FreeYoutubeCourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FreeYoutubeCourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreeYoutubeCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
