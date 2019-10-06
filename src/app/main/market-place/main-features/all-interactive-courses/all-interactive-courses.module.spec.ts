import { AllInteractiveCoursesModule } from './all-interactive-courses.module';

describe('AllInteractiveCoursesModule', () => {
  let allInteractiveCoursesModule: AllInteractiveCoursesModule;

  beforeEach(() => {
    allInteractiveCoursesModule = new AllInteractiveCoursesModule();
  });

  it('should create an instance', () => {
    expect(allInteractiveCoursesModule).toBeTruthy();
  });
});
