import { MarketplaceQuizComponent } from './main-features/courses/course-details/marketplace-quiz/marketplace-quiz.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StarRatingModule } from "angular-star-rating";
import { MarketPlaceComponent } from './market-place.component';
import { HomePageComponent } from './home-page/home-page.component';
import { TutorDetailsComponent } from './main-features/tutors/tutor-details/tutor-details.component';
import { LiveClassDetailsComponent } from './main-features/live-class/live-class-details/live-class-details.component';
import { CartComponent } from './checkout/cart/cart.component';
//import { CheckoutComponent } from './checkout/checkout/checkout.component';
import { AboutUsComponent } from './footer-pages/about-us/about-us.component';
import { EBookComponent } from './main-features/e-book/e-book.component';
import { EbookSectionComponent } from './main-features/e-book/ebook-section/ebook-section.component';
import { AcademicPartnerComponent } from './footer-pages/academic-partner/academic-partner.component';
import { ContactUsComponent } from './footer-pages/contact-us/contact-us.component';
import { CorporatePartnersComponent } from './footer-pages/corporate-partners/corporate-partners.component';
import { EatlEducationComponent } from './footer-pages/eatl-education/eatl-education.component';
import { EdutubeAmbassadorsComponent } from './footer-pages/edutube-ambassadors/edutube-ambassadors.component';
import { HelpComponent } from './footer-pages/help/help.component';
import { PrivacyPolicyComponent } from './footer-pages/privacy-policy/privacy-policy.component';
import { SiteMapComponent } from './footer-pages/site-map/site-map.component';
import { MatModuleModule } from '../mat-module/mat-module.module';
import { SharedModule } from './shared/shared.module';
import { FeatureAreaComponent } from './home-page/feature-area/feature-area.component';
import { FindTutorAreaComponent } from './home-page/find-tutor-area/find-tutor-area.component';
import { ResourceAreaComponent } from './home-page/resource-area/resource-area.component';
import { CommunityAreaComponent } from './home-page/community-area/community-area.component';
import { TutorAreaComponent } from './home-page/tutor-area/tutor-area.component';
import { BecomeTutorAreaComponent } from './home-page/become-tutor-area/become-tutor-area.component';
import { SupportAreaComponent } from './home-page/support-area/support-area.component';
import { FooterAreaComponent } from './home-page/footer-area/footer-area.component';
import { AllLiveClassListComponent } from './main-features/live-class/all-live-class-list/all-live-class-list.component';
import { TutorAvailableSlotsComponent } from './main-features/tutors/tutor-available-slots/tutor-available-slots.component';
import { BookingAvailableSlotComponent } from './main-features/tutors/tutor-available-slots/booking-available-slot/booking-available-slot.component';
import { NctbComponent } from './footer-pages/nctb/nctb.component';
import { OurAppComponent } from './footer-pages/our-app/our-app.component';
import { QuestionBankComponent } from './footer-pages/question-bank/question-bank.component';
import { QuestionAndAnswerComponent } from './footer-pages/question-and-answer/question-and-answer.component';
import { HiringPartnersComponent } from './footer-pages/hiring-partners/hiring-partners.component';
import { HomeBannerComponent } from './home-page/home-banner/home-banner.component';
import { FreeCoursesComponent } from './home-page/free-courses/free-courses.component';
import { InteractiveContentsComponent } from './home-page/interactive-contents/interactive-contents.component';
import { CheckoutComponent } from './checkout/checkout/checkout.component';
import { CourseAreaComponent } from './home-page/course-area/course-area.component';
import { AuthGuard } from '../../guard/auth.guard';
import { CountdownModule } from 'ngx-countdown';


// Routes
const routes = [
    {
        path: '',
        component: MarketPlaceComponent,
        children: [
            {
                path: '', component: HomePageComponent,
            },
            {
                path: 'user-dashboard',
                loadChildren: './main-features/user-dashboard/user-dashboard.module#UserDashboardModule'
          
            },
            {
                path: 'courses',
                loadChildren: './main-features/courses/courses.module#CoursesModule'
            },
            {
                path: 'mcq',
                loadChildren: './main-features/mcq/mcq.module#McqModule'
            },
            {
                path: 'mcq-test',
                loadChildren: './main-features/mcq-test/mcq-test.module#McqTestModule'
            },
            {
                path: 'bq',
                loadChildren: './main-features/board-questions/board-questions.module#BoardQuestionsModule'
            },
            {
                path: 'course',
                loadChildren: './main-features/courses/course-details/course-detail.module#CourseDetailModule'
            },
            {
                path: 'podcast',
                loadChildren: './main-features/podcast/podcast.module#PodcastModule'
            },
            {
                path: 'free-courses',
                loadChildren: './main-features/all-free-courses/all-free-courses.module#AllFreeCoursesModule'
            },
            {
                path: 'top-courses',
                loadChildren: './main-features/all-top-courses/all-top-courses.module#AllTopCoursesModule'
            },
            {
                path: 'video-courses',
                loadChildren: './main-features/video-courses/video-courses/video-courses.module#VideoCoursesModule'
            },
            {
                path: 'interactive-contents',
                loadChildren: './main-features/all-interactive-courses/all-interactive-courses.module#AllInteractiveCoursesModule'
            },
            {
                path: 'contents',
                loadChildren: './main-features/contents/contents.module#ContentsModule'
            },
            {
                path: 'tutors',
                loadChildren: './main-features/tutors/learning-assistant.module#LearningAssistantModule'
            },
          
            {
                path: 'tutor',
                children: [
                    { path: ':slug', component: TutorDetailsComponent },
                    { path: '**', redirectTo: '/courses', pathMatch: 'prefix' }
                ]
            },
            {
                path: 'live-classes',
                loadChildren: './main-features/live-class/live-class.module#LiveClassModule'

            },
            {
                path: 'live-class',
                children: [
                    { path: ':slug', component: LiveClassDetailsComponent },
                    { path: '**', redirectTo: '/courses', pathMatch: 'prefix' }
                ]
            },
            {
                path: 'cart',
                component: CartComponent
            },
            {
                path: 'checkout',
                // path: 'checkout/:trxId',
                component: CheckoutComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'terms-and-conditions',
                loadChildren: './terms/terms/terms.module#TermsModule'
            },
            {
                path: 'search-result',
                loadChildren: './search-result/search-result/search-result.module#SearchResultModule'
            },
            {
                path: 'login', 
                loadChildren: '../authentication/login/login.module#LoginModule'
            },
            {
                path: 'registration',
                loadChildren: '../authentication/registration/registration.module#RegistrationModule'
            },
            {
                path: 'password-reset',
                loadChildren: '../authentication/password-reset/password-reset.module#PasswordResetModule'
            },
            {
                path: 'password-reset-confirmation',
                loadChildren: '../authentication/password-reset-confirmation/password-reset-confirmation.module#PasswordResetConfirmationModule',
            },
            {
                path: 'password-change',
                loadChildren: '../authentication/password-change/password-change.module#PasswordChangeModule'
            },
            {
                path: 'about-us',
                component: AboutUsComponent
            },
            {
                path: 'e-book',
                component: EBookComponent
            },
            {
                path: 'ebooks-sections',
                component: EbookSectionComponent
            },
            {
                path: 'academic-partner',
                component: AcademicPartnerComponent
            },
            {
                path: 'contact-us',
                component: ContactUsComponent
            },
            {
                path: 'corporate-partners',
                component: CorporatePartnersComponent
            },
            {
                path: 'eatl-education',
                component: EatlEducationComponent
            },
            {
                path: 'education-ambassadors',
                component: EdutubeAmbassadorsComponent
            },
            {
                path: 'help',
                component: HelpComponent
            },
            {
                path: 'privacy-policy',
                component: PrivacyPolicyComponent
            },
            {
                path: 'site-map',
                component: SiteMapComponent
            },
        ]
    },


];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MatModuleModule,
        StarRatingModule,
        SharedModule,
        CountdownModule
    ],
    declarations: [
        HomePageComponent,
        FeatureAreaComponent,
        FindTutorAreaComponent,
        CourseAreaComponent,
        ResourceAreaComponent,
        CommunityAreaComponent,
        TutorAreaComponent,
        BecomeTutorAreaComponent,
        SupportAreaComponent,
        FooterAreaComponent,
        TutorDetailsComponent,
        AllLiveClassListComponent,
        LiveClassDetailsComponent,
        CartComponent,
        CheckoutComponent,
        MarketPlaceComponent,
        TutorAvailableSlotsComponent,
        BookingAvailableSlotComponent,
        AboutUsComponent,
        ContactUsComponent,
        EatlEducationComponent,
        NctbComponent,
        OurAppComponent,
        QuestionBankComponent,
        QuestionAndAnswerComponent,
        AcademicPartnerComponent,
        CorporatePartnersComponent,
        HiringPartnersComponent,
        EdutubeAmbassadorsComponent,
        PrivacyPolicyComponent,
        HelpComponent,
        SiteMapComponent,
        HomeBannerComponent,
        EBookComponent,
        EbookSectionComponent,
        FreeCoursesComponent,
        InteractiveContentsComponent,
        MarketplaceQuizComponent
    ],
    entryComponents: [
        BookingAvailableSlotComponent,
        MarketplaceQuizComponent
    ],
})
export class MarketPlaceModule {
}
