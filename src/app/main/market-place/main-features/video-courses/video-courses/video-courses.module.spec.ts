import { VideoCoursesModule } from './video-courses.module';

describe('VideoCoursesModule', () => {
  let videoCoursesModule: VideoCoursesModule;

  beforeEach(() => {
    videoCoursesModule = new VideoCoursesModule();
  });

  it('should create an instance', () => {
    expect(videoCoursesModule).toBeTruthy();
  });
});
