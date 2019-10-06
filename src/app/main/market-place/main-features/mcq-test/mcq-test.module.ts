import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatModuleModule } from '../../../mat-module/mat-module.module';
import { RouterModule, Routes } from '@angular/router';
import { CategoryTestMcqComponent } from './category-test-mcq/category-test-mcq.component';
import { McqTestDetailsComponent } from './mcq-test-details/mcq-test-details.component';
import { McqShareModuleModule } from '../share-module/mcq-share-module/mcq-share-module.module';
import { AllMcqTestComponent } from './all-mcq-test/all-mcq-test.component';



const routes: Routes = [
  { path: '', component: AllMcqTestComponent  },
  { path: 'mcq-test-detail', component: McqTestDetailsComponent },
  { path: ':category_slug', component: CategoryTestMcqComponent },
];


@NgModule({
  declarations: [CategoryTestMcqComponent, McqTestDetailsComponent, AllMcqTestComponent],
  imports: [
    CommonModule,
    MatModuleModule,
    RouterModule.forChild(routes),
    McqShareModuleModule
  ]
})
export class McqTestModule { }
