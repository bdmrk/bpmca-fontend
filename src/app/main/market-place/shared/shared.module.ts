import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { StarRatingModule } from "angular-star-rating";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RatingComponent } from './rating/rating.component';
import { AddRatingComponent } from './rating/add-rating/add-rating.component';
import { CourseListComponent } from './course-list/course-list.component';
import { CourseCardComponent } from './course-card/course-card.component';
import { TutorListComponent } from './tutor-list/tutor-list.component';
import { TutorCardComponent } from './tutor-card/tutor-card.component';
import { LiveClassFilterSectionComponent } from './live-class-filter-section/live-class-filter-section.component';
import { LiveClassSectionComponent } from './live-class-section/live-class-section.component';
import { RelatedLiveClassSectionComponent } from './related-live-class-section/related-live-class-section.component';
import { CourseFilterSectionComponent } from './course-filter-section/course-filter-section.component';
import { CourseSectionComponent } from './course-section/course-section.component';
import { TutorSectionComponent } from './tutor-section/tutor-section.component';
import { TutorFilterSectionComponent } from './tutor-filter-section/tutor-filter-section.component';
import { RelatedCourseSectionComponent } from './related-course-section/related-course-section.component';
import { RelatedTutorSectionComponent } from './related-tutor-section/related-tutor-section.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { ProfileSummaryCardComponent } from './profile-summary-card/profile-summary-card.component';
import { MatModuleModule } from '../../mat-module/mat-module.module';
import { MatBadgeModule } from '@angular/material';
@NgModule({
  imports: [
    CommonModule,
    MatModuleModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    StarRatingModule,
    MatBadgeModule
  ],
  declarations: [
    RatingComponent,
    AddRatingComponent,
    CourseListComponent,
    CourseCardComponent,
    TutorListComponent,
    TutorCardComponent,
    LiveClassFilterSectionComponent,
    LiveClassSectionComponent,
    RelatedLiveClassSectionComponent,
    CourseFilterSectionComponent,
    CourseSectionComponent,
    TutorSectionComponent, 
    TutorFilterSectionComponent,
    RelatedCourseSectionComponent,
    RelatedTutorSectionComponent,
    FooterComponent, HeaderComponent,
    ProfileSummaryCardComponent
  ],

  entryComponents: [AddRatingComponent],

  exports: [
    RatingComponent, 
    AddRatingComponent, 
    CourseListComponent, 
    CourseCardComponent, 
    TutorListComponent, 
    TutorCardComponent, 
    LiveClassFilterSectionComponent,
    LiveClassSectionComponent, 
    RelatedLiveClassSectionComponent, 
    CourseFilterSectionComponent,
    CourseSectionComponent, 
    TutorSectionComponent, 
    TutorFilterSectionComponent, 
    RelatedCourseSectionComponent, 
    RelatedTutorSectionComponent,
    FooterComponent, 
    HeaderComponent, 
    ProfileSummaryCardComponent
  ]
})
export class SharedModule { }
