import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComplaintListComponent } from './complaint-list/complaint-list.component';
import { ComplaintAddComponent } from './complaint-add/complaint-add.component';
import { MatModuleModule } from '../../../../mat-module/mat-module.module';
import { Routes, RouterModule } from '@angular/router';
import { MatProgressButtonsModule } from 'mat-progress-buttons';
import { ComplaintDetailsComponent } from './complaint-details/complaint-details.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
const routes:Routes = [
  {path: '', component: ComplaintListComponent},
  {path: 'add', component: ComplaintAddComponent},
  {path: 'details', component: ComplaintDetailsComponent},
]

@NgModule({
  declarations: [ComplaintListComponent,ComplaintDetailsComponent, ComplaintAddComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatModuleModule,
    MatProgressButtonsModule,
    NgMultiSelectDropDownModule.forRoot(),

  ]
})
export class CustomerComplaintModule { }
