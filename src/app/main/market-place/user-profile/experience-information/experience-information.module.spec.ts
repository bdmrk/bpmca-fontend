import { ExperienceInformationModule } from './experience-information.module';

describe('ExperienceInformationModule', () => {
  let experienceInformationModule: ExperienceInformationModule;

  beforeEach(() => {
    experienceInformationModule = new ExperienceInformationModule();
  });

  it('should create an instance', () => {
    expect(experienceInformationModule).toBeTruthy();
  });
});
