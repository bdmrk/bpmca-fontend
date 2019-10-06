import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryTestMcqlistComponent } from './category-test-mcqlist/category-test-mcqlist.component';
import { Routes, RouterModule } from '@angular/router';
import { MatModuleModule } from '../../../mat-module/mat-module.module';
import { McqDetailsComponent } from './mcq-details/mcq-details.component';
import { McqShareModuleModule } from '../share-module/mcq-share-module/mcq-share-module.module';
import { AllMcqListComponent } from './all-mcq-list/all-mcq-list.component';
import { McqTestResultComponent } from './mcq-test-result/mcq-test-result.component';

const routes: Routes = [
  { path: '', component: AllMcqListComponent },
  { path: 'mcq-details', component: McqDetailsComponent },
  { path: 'mcq-result', component: McqTestResultComponent },
  { path: ':category_slug', component: CategoryTestMcqlistComponent },
];

@NgModule({
  declarations: [CategoryTestMcqlistComponent, McqDetailsComponent, AllMcqListComponent, McqTestResultComponent],
  imports: [
    CommonModule,
    MatModuleModule,
    RouterModule.forChild(routes),
    McqShareModuleModule
  ]
})

export class McqModule { }
