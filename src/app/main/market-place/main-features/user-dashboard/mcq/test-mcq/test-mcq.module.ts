import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestMcqComponent } from './test-mcq.component';
import { Routes, RouterModule } from '@angular/router';
import { MatModuleModule } from '../../../../../mat-module/mat-module.module';
import { TestMcqListComponent } from './test-mcq-list/test-mcq-list.component';
import { TestMcqShareComponent } from './test-mcq-share/test-mcq-share.component';
import { McqShareModuleModule } from '../../../share-module/mcq-share-module/mcq-share-module.module';
import { TestMcqAnswerComponent } from './test-mcq-answer/test-mcq-answer.component';

const routes: Routes = [
  {
    path: '',
    component: TestMcqComponent
  },
  {
    path: 'list',
    component: TestMcqListComponent
  },
  {
    path: 'details',
    component: TestMcqShareComponent
  },
  {
    path: 'answer',
    component: TestMcqAnswerComponent
  }
];

@NgModule({
  declarations: [TestMcqComponent, TestMcqListComponent, TestMcqShareComponent, TestMcqAnswerComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatModuleModule,
    McqShareModuleModule
  ]
})
export class TestMcqModule { }
