import { UserSkillModule } from './user-skill.module';

describe('UserSkillModule', () => {
  let userSkillModule: UserSkillModule;

  beforeEach(() => {
    userSkillModule = new UserSkillModule();
  });

  it('should create an instance', () => {
    expect(userSkillModule).toBeTruthy();
  });
});
