import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDashboardComponent } from './user-dashboard.component';
import { RouterModule } from '@angular/router';
import { MatModuleModule } from '../../../mat-module/mat-module.module';
import { AuthGuard } from '../../../../guard/auth.guard';
import { ChildrenClassComponent } from './children-class/children-class.component';

//import { ChartsModule } from 'ng2-charts';

const routes = [
  {
    path: '',
    component: UserDashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'parents-panel',
        loadChildren: './children/children.module#ChildrenModule',
      },
      {
        path: 'my-progress',
        loadChildren: './my-progress/my-progress.module#MyProgressModule',
      },
      {
        path: 'mcq-test',
        loadChildren: './mcq/test-mcq/test-mcq.module#TestMcqModule',
      },
      {
        path: 'mcq-practice',
        loadChildren: './mcq/practice-mcq/practice-mcq.module#PracticeMcqModule',
      },
      {
        path: 'profile-edit',
        loadChildren: '../../user-profile/user-profile.module#UserProfileModule',
      },
      {
        path: 'profile',
        loadChildren: './view-profile/view-profile.module#ViewProfileModule',
      },
      {
        path: 'student-class',
        component: ChildrenClassComponent,
      },
      {
        path: 'complaint',
        loadChildren: './customer-complaint/customer-complaint.module#CustomerComplaintModule',
      },
    ]
  },

];
@NgModule({
  declarations: [UserDashboardComponent, ChildrenClassComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MatModuleModule,
    //ChartsModule
  ]
})
export class UserDashboardModule {}
