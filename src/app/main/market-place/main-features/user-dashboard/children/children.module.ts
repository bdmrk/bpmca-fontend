import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChildrenComponent } from './children/children.component';
import { MatProgressButtonsModule } from 'mat-progress-buttons';
import { AddChildrenComponent } from './add-children/add-children.component';
import { RouterModule, Routes } from '@angular/router';
import { MatModuleModule } from '../../../../mat-module/mat-module.module';
import { McqExamReportDialogComponent } from './children/mcq-exam-report-dialog/mcq-exam-report-dialog.component';
import { AllProgressReportComponent } from './all-progress-report/all-progress-report.component';
import { CompareProgressModule } from './compare-progress/compare-progress.module';

const routes:Routes = [
  {path: '', component: ChildrenComponent},
  {path: 'add', component: AddChildrenComponent},
  {path: 'child', component: ChildrenComponent},
]

@NgModule({
  declarations: [ChildrenComponent,AddChildrenComponent, McqExamReportDialogComponent, AllProgressReportComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatModuleModule,
    MatProgressButtonsModule,
    CompareProgressModule
  ],
  entryComponents: [McqExamReportDialogComponent]
})
export class ChildrenModule { }
