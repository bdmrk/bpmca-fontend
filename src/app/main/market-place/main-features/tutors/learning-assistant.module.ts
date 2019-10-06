import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AllTutorListComponent } from './all-tutor-list/all-tutor-list.component';
import { CategoryTutorListComponent } from './category-tutor-list/category-tutor-list.component';
import { SharedModule } from '../../shared/shared.module';
import { MatModuleModule } from '../../../mat-module/mat-module.module';
import { StarRatingModule } from 'angular-star-rating';

const routes:Routes = [
  
  {path: '', component: AllTutorListComponent},
  {path: 'class/:category_slug', component: CategoryTutorListComponent},
  {path: ':category_slug/:subcategory_slug', component: CategoryTutorListComponent},
  {path: '**', redirectTo: '/courses', pathMatch: 'prefix'}

]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    MatModuleModule,
    StarRatingModule
  ],
  
  declarations: [AllTutorListComponent,CategoryTutorListComponent]
})
export class LearningAssistantModule { }


