import { EducationalInformationModule } from './educational-information.module';

describe('EducationalInformationModule', () => {
  let educationalInformationModule: EducationalInformationModule;

  beforeEach(() => {
    educationalInformationModule = new EducationalInformationModule();
  });

  it('should create an instance', () => {
    expect(educationalInformationModule).toBeTruthy();
  });
});
