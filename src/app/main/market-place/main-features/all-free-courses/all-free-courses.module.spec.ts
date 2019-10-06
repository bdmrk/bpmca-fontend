import { AllFreeCoursesModule } from './all-free-courses.module';

describe('AllFreeCoursesModule', () => {
  let allFreeCoursesModule: AllFreeCoursesModule;

  beforeEach(() => {
    allFreeCoursesModule = new AllFreeCoursesModule();
  });

  it('should create an instance', () => {
    expect(allFreeCoursesModule).toBeTruthy();
  });
});
