import { LiveClassModule } from './live-class.module';

describe('LiveClassModule', () => {
  let liveClassModule: LiveClassModule;

  beforeEach(() => {
    liveClassModule = new LiveClassModule();
  });

  it('should create an instance', () => {
    expect(liveClassModule).toBeTruthy();
  });
});
