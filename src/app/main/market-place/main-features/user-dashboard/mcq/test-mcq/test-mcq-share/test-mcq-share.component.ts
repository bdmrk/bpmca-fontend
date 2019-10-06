import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataCommunicationService } from '../../../../../../../service/common/data-communication.service';
import { ApiCommonService } from '../../../../../../../service/common/api-common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test-mcq-share',
  templateUrl: './test-mcq-share.component.html',
  styleUrls: ['./test-mcq-share.component.scss']
})
export class TestMcqShareComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  class_info: any;
  question_tests: any;

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
        this.apiCommon.get(`marketplace/dashboard/mcq-test/${data.id}`).subscribe(
          res => {
            this.question_tests = {
              'data': res.data,
              'test': data
            };
          }
        );
      }
    })
  }

  back(): void{

    this.dataCommunicate.setPassedItemData(this.class_info.previous_route_data);
    this.router.navigateByUrl('/user-dashboard/mcq-test/list');
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
