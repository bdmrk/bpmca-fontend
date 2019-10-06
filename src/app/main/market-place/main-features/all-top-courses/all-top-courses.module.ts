import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AllTopCoursesComponent } from './all-top-courses.component';
import { SharedModule } from '../../shared/shared.module';
import { MatModuleModule } from '../../../mat-module/mat-module.module';

const routes = [
  {
    path: '',
    component: AllTopCoursesComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatModuleModule,
    SharedModule
  ],
  declarations: [AllTopCoursesComponent]
})
export class AllTopCoursesModule { }
