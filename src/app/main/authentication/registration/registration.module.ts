import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RegistrationComponent } from './registration.component';
import { MatModuleModule } from '../../mat-module/mat-module.module';

const routes = [
  {
    path: '',
    component: RegistrationComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatModuleModule
  ],
  declarations: [RegistrationComponent]
})
export class RegistrationModule { }
