import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PasswordResetComponent } from './password-reset.component';
import { MatModuleModule } from '../../mat-module/mat-module.module';

const routes = [
  {
    path: '',
    component: PasswordResetComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatModuleModule
  ],
  declarations: [PasswordResetComponent]
})
export class PasswordResetModule { }
