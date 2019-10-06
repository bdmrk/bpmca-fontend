import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { RouterModule } from '@angular/router';
import { MatModuleModule } from '../../mat-module/mat-module.module';

const routes = [
  {
    path: '',
    component: LoginComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatModuleModule,
  ],
  declarations: [LoginComponent]
})
export class LoginModule { }
