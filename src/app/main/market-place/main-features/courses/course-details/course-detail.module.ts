import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CourseDetailsComponent } from './course-details.component';
import { SharedModule } from '../../../shared/shared.module';
import { StarRatingModule } from 'angular-star-rating';
import { CoursePreviewComponent } from './course-preview/course-preview.component';
import { CourseContainComponent } from './course-contain/course-contain.component';
import { CourseCommentComponent } from './course-comment/course-comment.component';
import { CountdownModule } from 'ngx-countdown';
import { CourseReviewComponent } from './course-review/course-review.component';
import { MatModuleModule } from '../../../../mat-module/mat-module.module';
import { CourseDocumentsComponent } from './course-documents/course-documents.component';

const routes: Routes =
  [
    {path: ':slug', component: CourseDetailsComponent},
  ];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    StarRatingModule,
    MatModuleModule,
    CountdownModule
  ],
  declarations: [CourseDetailsComponent, CoursePreviewComponent, CourseContainComponent, CourseCommentComponent, CourseReviewComponent, CourseDocumentsComponent]
})
export class CourseDetailModule { }
