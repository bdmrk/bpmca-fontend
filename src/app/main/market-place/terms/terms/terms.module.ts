import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TermsComponent } from '../terms.component';
import { RouterModule } from '@angular/router';
import { MatModuleModule } from '../../../mat-module/mat-module.module';

const routes = [
  {
    path: '',
    component: TermsComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatModuleModule
  ],
  declarations: [TermsComponent]
})
export class TermsModule { 
}
