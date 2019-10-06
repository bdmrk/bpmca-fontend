import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoCoursesComponent } from '../video-courses.component';
import { RouterModule } from '@angular/router';
import { MatModuleModule } from '../../../../mat-module/mat-module.module';

const routes = [
  {
    path: '',
    component: VideoCoursesComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatModuleModule
  ],
  declarations: [VideoCoursesComponent]
})
export class VideoCoursesModule {
}
