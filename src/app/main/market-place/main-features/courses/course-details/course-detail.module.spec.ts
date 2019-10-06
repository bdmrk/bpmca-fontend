import { CourseDetailModule } from './course-detail.module';

describe('CourseDetailModule', () => {
  let courseDetailModule: CourseDetailModule;

  beforeEach(() => {
    courseDetailModule = new CourseDetailModule();
  });

  it('should create an instance', () => {
    expect(courseDetailModule).toBeTruthy();
  });
});
