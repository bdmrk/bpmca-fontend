import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { McqTestComponent } from './mcq-test/mcq-test.component';
import { McqPracticeComponent } from './mcq-practice/mcq-practice.component';
import { MatModuleModule } from '../../../../mat-module/mat-module.module';
import { McqTestAnswerComponent } from './mcq-test-answer/mcq-test-answer.component';
import { CountdownModule } from 'ngx-countdown';

@NgModule({
  declarations: [McqPracticeComponent, McqTestComponent, McqTestAnswerComponent],
  imports: [
    CommonModule,
    MatModuleModule,
    CountdownModule
  ],
  exports: [McqPracticeComponent, McqTestComponent, McqTestAnswerComponent]
})
export class McqShareModuleModule { }
