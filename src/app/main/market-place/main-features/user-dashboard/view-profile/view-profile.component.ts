import { Component, OnInit, Input } from '@angular/core';

import { from } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ApiCommonService } from '../../../../../service/common/api-common.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss']
})

export class ViewProfileComponent implements OnInit {

  @Input() user_id;
  showBtn = true;

  user_data: any;
  user_route: any;

  imagePreview: any;

  experience_route: any;
  experience_data: any;

  general_information_route: any;
  general_information_data: any;

  education_route: any;
  education_data: any;

  language_route: any;
  language_data: any;

  skill_route: any;
  skill_data: any;
  authUserId: any;


  constructor(
    private route:ActivatedRoute,
    private apiCommon: ApiCommonService,
    
  ) {
    this.imagePreview = 'assets/img/placeholder.jpg';
    this.experience_route = 'user-settings/experience';
    this.general_information_route = 'user-settings/general-information';
    this.education_route = 'user-settings/education';
    this.language_route = 'user-settings/language';
    this.skill_route = 'user-settings/skill';
    this.authUserId = this.getUserData().id;
  }

  ngOnInit() {
 
    this.route
      .queryParams
      .subscribe(params => {
        this.user_id = params['id'] || this.authUserId;
      });

    if (this.user_id && this.authUserId != this.user_id) {
      this.showBtn = false;
    }

    this.user_id ? this.user_route = `user-settings/profile-data?user_id=${this.user_id}` : this.user_route = 'user-settings/profile-data';

    this.apiCommon.get(this.user_route).subscribe(
      (res) => {
        this.user_data = res.data;
     
      },
      (err) => {

      }
    );

  }
  public getUserData(): any {
    const token: string = <string>localStorage.getItem('accessToken');
    if (token) {
        const payload = this.payload(token);
        const userData = { 'id': payload.id, 'name': payload.name , 'email': payload.email, 'type': payload.type, 'profile_image': payload.profile_image };
        return userData;
    }
}
  public payload(token): any {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  }

}
