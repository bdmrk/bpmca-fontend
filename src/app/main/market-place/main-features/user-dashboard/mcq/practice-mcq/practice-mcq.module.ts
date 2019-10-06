import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PracticeMcqComponent } from './practice-mcq.component';
import { MatModuleModule } from '../../../../../mat-module/mat-module.module';
import { PracticeMcqSetComponent } from './practice-mcq-set/practice-mcq-set.component';
import { McqShareModuleModule } from '../../../share-module/mcq-share-module/mcq-share-module.module';
import { PracticeMcqShareComponent } from './practice-mcq-share/practice-mcq-share.component';

const routes: Routes =[
  {
    path: '',
    component: PracticeMcqComponent
  },
  {
    path: 'sets',
    component: PracticeMcqSetComponent
  },
  {
    path: 'details',
    component: PracticeMcqShareComponent
  }
];

@NgModule({
  declarations: [PracticeMcqComponent, PracticeMcqSetComponent, PracticeMcqShareComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatModuleModule,
    McqShareModuleModule
  ]
})
export class PracticeMcqModule { }
