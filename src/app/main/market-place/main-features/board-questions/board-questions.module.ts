import { Routes, RouterModule } from '@angular/router';
import { CategoryBoardQuestionComponent } from './category-board-question/category-board-question.component';
import { BoardQuestionDetailsComponent } from './board-question-details/board-question-details.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatModuleModule } from '../../../mat-module/mat-module.module';
import { AllBoardQuestionsComponent } from './all-board-questions/all-board-questions.component';

const routes: Routes = [
    { path: '', component: AllBoardQuestionsComponent },
    { path: 'bqDetails', component: BoardQuestionDetailsComponent },
    { path: ':category_slug', component: CategoryBoardQuestionComponent },

  
  ];

@NgModule({
  declarations: [
    BoardQuestionDetailsComponent,
    CategoryBoardQuestionComponent,
    AllBoardQuestionsComponent
  ],
  imports: [
    CommonModule,
    MatModuleModule,
    RouterModule.forChild(routes)
  ]
})



export class BoardQuestionsModule { }
