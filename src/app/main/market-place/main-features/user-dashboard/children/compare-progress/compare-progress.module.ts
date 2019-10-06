import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompareProgressComponent } from './compare-progress.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [CompareProgressComponent],
  imports: [
    CommonModule,
    ChartsModule
  ],
  exports:[
    CompareProgressComponent
  ]
})
export class CompareProgressModule { }
