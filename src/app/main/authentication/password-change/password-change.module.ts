import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PasswordChangeComponent } from './password-change.component';
import { MatModuleModule } from '../../mat-module/mat-module.module';

const routes = [
  {
    path: '',
    component: PasswordChangeComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatModuleModule
  ],
  declarations: [PasswordChangeComponent]
})
export class PasswordChangeModule { }
