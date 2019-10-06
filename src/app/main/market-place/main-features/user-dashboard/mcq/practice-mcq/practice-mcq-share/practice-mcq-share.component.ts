import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataCommunicationService } from '../../../../../../../service/common/data-communication.service';
import { ApiCommonService } from '../../../../../../../service/common/api-common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-practice-mcq-share',
  templateUrl: './practice-mcq-share.component.html',
  styleUrls: ['./practice-mcq-share.component.scss']
})
export class PracticeMcqShareComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  question_sets = [];
  class_info;

  constructor(
    private dataCommunicate: DataCommunicationService,
    private apiCommon: ApiCommonService,
    private router: Router
  ) { }

  ngOnInit() {
    this.subscription = this.dataCommunicate.getPassedItemData.subscribe(data => {
      this.class_info = data;
      // console.log(data);
      if (data){
        this.apiCommon.get(`marketplace/dashboard/mcq-practice/${data.id}`).subscribe(
          res => {
            // console.log(res);
            this.question_sets = res.data;
          }
        );
      }
    })
  }

  back(): void{

    this.dataCommunicate.setPassedItemData(this.class_info.previous_route_data);
    this.router.navigateByUrl('/user-dashboard/mcq-practice/sets');
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  
}
