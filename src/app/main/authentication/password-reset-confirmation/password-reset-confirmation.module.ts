import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PasswordResetConfirmationComponent } from './password-reset-confirmation.component';
import { MatModuleModule } from '../../mat-module/mat-module.module';

const routes = [
  {
    path: '',
    component: PasswordResetConfirmationComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatModuleModule
  ],
  declarations: [PasswordResetConfirmationComponent]
})
export class PasswordResetConfirmationModule { }
