import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AllContentListComponent } from './all-content-list/all-content-list.component';
import { SharedModule } from '../../shared/shared.module';
import { CategoryContentListComponent } from './category-content-list/category-content-list.component';


const routes: Routes = [
  {path: '', component: AllContentListComponent},
  {path: ':category_slug', component: CategoryContentListComponent},
  // {path: 'details/:category_slug', component: ContentDetailsComponent},
  {path: '**', redirectTo: '/contents', pathMatch: 'prefix'}
];



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
  ],
  declarations: [AllContentListComponent, CategoryContentListComponent]
})
export class ContentsModule { }

