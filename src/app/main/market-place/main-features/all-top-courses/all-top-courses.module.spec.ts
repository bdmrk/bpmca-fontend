import { AllTopCoursesModule } from './all-top-courses.module';

describe('AllTopCoursesModule', () => {
  let allTopCoursesModule: AllTopCoursesModule;

  beforeEach(() => {
    allTopCoursesModule = new AllTopCoursesModule();
  });

  it('should create an instance', () => {
    expect(allTopCoursesModule).toBeTruthy();
  });
});
