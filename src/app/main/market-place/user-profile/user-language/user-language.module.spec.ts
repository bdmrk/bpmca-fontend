import { UserLanguageModule } from './user-language.module';

describe('UserLanguageModule', () => {
  let userLanguageModule: UserLanguageModule;

  beforeEach(() => {
    userLanguageModule = new UserLanguageModule();
  });

  it('should create an instance', () => {
    expect(userLanguageModule).toBeTruthy();
  });
});
