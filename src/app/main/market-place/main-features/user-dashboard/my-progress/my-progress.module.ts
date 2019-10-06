import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyProgressComponent } from './my-progress.component';
import { Routes, RouterModule } from '@angular/router';
import { MatModuleModule } from '../../../../mat-module/mat-module.module';
import { ProgressReportDialogComponent } from './progress-report-dialog/progress-report-dialog.component';
import { CompareProgressModule } from '../children/compare-progress/compare-progress.module';

const routes: Routes = [
  {
    path: '',
    component: MyProgressComponent
  }
]

@NgModule({
  declarations: [MyProgressComponent,ProgressReportDialogComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatModuleModule,
    CompareProgressModule
  ],
  entryComponents: [ProgressReportDialogComponent]
})
export class MyProgressModule { }
