import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryCourseListComponent } from './category-course-list/category-course-list.component';
import { AllCourseListComponent } from './all-course-list/all-course-list.component';
import { FreeYoutubeCourseComponent } from './common/free-youtube-course/free-youtube-course.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { AnimationCourseComponent } from './animation-course/animation-course.component';
import { AnimationCourseDetailsComponent } from './animation-course-details/animation-course-details.component';
import { MatModuleModule } from '../../../mat-module/mat-module.module';
const routes: Routes = [
  { path: '', component: AllCourseListComponent },
  { path: 'content', component: AnimationCourseDetailsComponent },
  { path: ':category_slug', component: CategoryCourseListComponent },
  { path: ':category_slug/:subcategory_slug', component: CategoryCourseListComponent },
  { path: '**', redirectTo: '/courses', pathMatch: 'prefix' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    MatModuleModule
  ],
  declarations: [AllCourseListComponent, CategoryCourseListComponent, CategoryCourseListComponent, FreeYoutubeCourseComponent, AnimationCourseComponent, AnimationCourseDetailsComponent]
})
export class CoursesModule { }
