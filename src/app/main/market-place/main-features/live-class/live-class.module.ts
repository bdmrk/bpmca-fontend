import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryLiveClassListComponent } from './category-live-class-list/category-live-class-list.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';


const routes:Routes = 
  [
    {path: '', component: CategoryLiveClassListComponent},
    {path: ':category_slug', component: CategoryLiveClassListComponent},
    {path: ':category_slug/:subcategory_slug', component: CategoryLiveClassListComponent},
    {path: '**', redirectTo: '/courses', pathMatch: 'prefix'}
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
    
  ],
  exports:[RouterModule],
  declarations: [CategoryLiveClassListComponent]
})
export class LiveClassModule { 
 
}
