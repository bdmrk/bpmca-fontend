import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserProfileComponent} from './user-profile.component';
import {GeneralInformationComponent} from './general-information/general-information.component';
import {EducationalInformationComponent} from './educational-information/educational-information.component';
import {ExperienceInformationComponent} from './experience-information/experience-information.component';
import {UserSkillComponent} from './user-skill/user-skill.component';
import {UserLanguageComponent} from './user-language/user-language.component';
import {AccountPasswordComponent} from './account-password/account-password.component';
import {RouterModule} from '@angular/router';

import {
    
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatProgressBarModule,
    MatNativeDateModule
} from '@angular/material';

import {MatProgressButtonsModule} from 'mat-progress-buttons';


import {AddComponent as LanguageAdd} from './user-language/add/add.component';
import {EditComponent as LanguageEdit} from './user-language/edit/edit.component';
import {DeleteComponent as LanguageDelete} from './user-language/delete/delete.component';

import {AddComponent as SkillAdd} from './user-skill/add/add.component';
import {EditComponent as SkillEdit} from './user-skill/edit/edit.component';
import {DeleteComponent as SkillDelete} from './user-skill/delete/delete.component';

import {AddComponent as EducationalInfoAdd} from './educational-information/add/add.component';
import {EditComponent as EducationalInfoEdit} from './educational-information/edit/edit.component';
import {DeleteComponent as EducationalInfoDelete} from './educational-information/delete/delete.component';

import {AddComponent as ExperienceInfoAdd} from './experience-information/add/add.component';
import {EditComponent as ExperienceInfoEdit} from './experience-information/edit/edit.component';
import {DeleteComponent as ExperienceInfoDelete} from './experience-information/delete/delete.component';

import { ProfileImageComponent } from './profile-image/profile-image.component';
import { TutorCategoryComponent } from './tutor-category/tutor-category.component';
import { UserCertificateComponent } from './user-certificate/user-certificate.component';
import { AddCertificateComponent } from './user-certificate/add-certificate/add-certificate.component';
import { EditCertificateComponent } from './user-certificate/edit-certificate/edit-certificate.component';
import { AuthGuard } from '../../../guard/auth.guard';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';


// Routes
const routes = [
    {
        path: '',
        component: UserProfileComponent,
        canActivate: [AuthGuard]
    }
];

@NgModule({
    imports: [
        
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatRippleModule,
        MatTableModule,
        MatToolbarModule,
        MatPaginatorModule,
        MatSortModule,
        MatGridListModule,
        MatSelectModule,
        MatProgressButtonsModule,
        MatDialogModule,
        MatCardModule,
        MatRadioModule,
        MatButtonToggleModule,
        MatTooltipModule,
        MatExpansionModule,
        MatListModule,
        MatTabsModule,
        MatProgressBarModule,
        
        MatNativeDateModule 
       
    ],
    declarations: [
        UserProfileComponent,
        GeneralInformationComponent,
        EducationalInformationComponent,
        ExperienceInformationComponent,
        UserSkillComponent,
        UserLanguageComponent,
        AccountPasswordComponent,
        SkillAdd,
        SkillEdit,
        SkillDelete,
        LanguageAdd,
        LanguageEdit,
        LanguageDelete,
        EducationalInfoAdd,
        EducationalInfoEdit,
        EducationalInfoDelete,
        ExperienceInfoAdd,
        ExperienceInfoEdit,
        ExperienceInfoDelete,
        ProfileImageComponent,
        TutorCategoryComponent,
        UserCertificateComponent,
        AddCertificateComponent,
        EditCertificateComponent,
    ],
    entryComponents: [
        SkillAdd,
        SkillEdit,
        SkillDelete,
        LanguageAdd,
        LanguageEdit,
        LanguageDelete,
        EducationalInfoAdd,
        EducationalInfoEdit,
        EducationalInfoDelete,
        ExperienceInfoAdd,
        ExperienceInfoEdit,
        ExperienceInfoDelete,
        AddCertificateComponent,
        EditCertificateComponent
    ],
    providers: [  
      MatDatepickerModule,  
    ],
})
export class UserProfileModule {
}
