import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataCommunicationService } from '../../../../../../../service/common/data-communication.service';
import { ApiCommonService } from '../../../../../../../service/common/api-common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-practice-mcq-set',
  templateUrl: './practice-mcq-set.component.html',
  styleUrls: ['./practice-mcq-set.component.scss']
})
export class PracticeMcqSetComponent implements OnInit, OnDestroy{

  subscription: Subscription;
  setMCQlist = [];
  class_info;

  constructor(
    private dataCommunicate: DataCommunicationService,
    private apiCommon: ApiCommonService,
    private router: Router
  ) { }

  ngOnInit() {
    this.subscription = this.dataCommunicate.getPassedItemData.subscribe(item => {
      this.class_info = item;
      if (item){
        this.apiCommon.get(`marketplace/dashboard/mcq-practice/${item.course_category_id}/${item.id}`).subscribe(
          res => {
            this.setMCQlist = res.data;
            // console.log(res);
          }
        )
      }
    });
  }

  mcqDetails(set): void{
    set['previous_route_data'] = this.class_info;
    this.dataCommunicate.setPassedItemData(set);
    this.router.navigateByUrl('/user-dashboard/mcq-practice/details');
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
