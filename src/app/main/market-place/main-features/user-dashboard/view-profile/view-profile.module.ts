import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewProfileComponent } from './view-profile.component';
import { RouterModule } from '@angular/router';
import { MatCardModule, MatChipsModule } from '@angular/material';

const routes = [
  {
    path: '',
    component: ViewProfileComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatChipsModule
  ],
  exports: [
    ViewProfileComponent
  ],
  declarations: [ViewProfileComponent],
})
export class ViewProfileModule { }
