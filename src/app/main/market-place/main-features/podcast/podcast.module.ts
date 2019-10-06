import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MatModuleModule } from '../../../mat-module/mat-module.module';
import { CategoryPodcastComponent } from './category-podcast/category-podcast.component';
import { AllPodcastComponent } from './all-podcast/all-podcast.component';
import { PodcastDetailsComponent } from './podcast-details/podcast-details.component';
import { PodcastContainComponent } from './podcast-details/podcast-contain/podcast-contain.component';
import { PodcastPreviewComponent } from './podcast-details/podcast-preview/podcast-preview.component';
import { PodcastDocumentsComponent } from './podcast-details/podcast-documents/podcast-documents.component';
import { PodcastReviewComponent } from './podcast-details/podcast-review/podcast-review.component';
import { StarRatingModule } from 'angular-star-rating';
import { PodcastCommentComponent } from './podcast-details/podcast-comment/podcast-comment.component';


const routes: Routes = [
  { path: '', component: AllPodcastComponent },
  { path: 'podcast-details', component: PodcastDetailsComponent },
  // { path: 'mcq-result', component: McqTestResultComponent },
  { path: ':category_slug', component: CategoryPodcastComponent },
];

@NgModule({
  declarations: [CategoryPodcastComponent, AllPodcastComponent, PodcastDetailsComponent, PodcastContainComponent, PodcastPreviewComponent, PodcastDocumentsComponent, PodcastReviewComponent, PodcastCommentComponent],
  imports: [
    CommonModule,
    MatModuleModule,
    RouterModule.forChild(routes),
    StarRatingModule,
  ],
})
export class PodcastModule { }
