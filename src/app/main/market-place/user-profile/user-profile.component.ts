import { StorageService } from './../../../service/common/storage.service';
import { Component, OnInit } from '@angular/core';
import { ApiCommonService } from '../../../service/common/api-common.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  user_route: any;
  user_data: any;
  user_type: any;

  constructor(
    private apiCommon: ApiCommonService,
    private storage: StorageService
    ) {
    this.user_route = 'user-settings/profile-data';
    this.user_type = this.storage.getUserData().type;
   }

  ngOnInit() {

    this.apiCommon.get(this.user_route).subscribe(
      (res) => {
        this.user_data = res.data;
      },
      (err) => {

      }
  );
  }

}
