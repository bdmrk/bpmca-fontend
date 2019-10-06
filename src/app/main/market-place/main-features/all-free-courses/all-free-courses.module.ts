import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllFreeCoursesComponent } from './all-free-courses/all-free-courses.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

const routes = [
  {
    path: '',
    component: AllFreeCoursesComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [AllFreeCoursesComponent]
})
export class AllFreeCoursesModule { }
