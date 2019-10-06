import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllInteractiveCoursesComponent } from './all-interactive-courses/all-interactive-courses.component';
import { SharedModule } from '../../shared/shared.module';

const routes = [
  {
    path: '',
    component: AllInteractiveCoursesComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [AllInteractiveCoursesComponent]
})
export class AllInteractiveCoursesModule { }
