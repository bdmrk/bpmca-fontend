import { LearningAssistantModule } from './learning-assistant.module';

describe('LearningAssistantModule', () => {
  let learningAssistantModule: LearningAssistantModule;

  beforeEach(() => {
    learningAssistantModule = new LearningAssistantModule();
  });

  it('should create an instance', () => {
    expect(learningAssistantModule).toBeTruthy();
  });
});
