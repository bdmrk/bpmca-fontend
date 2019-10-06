import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiCommonService } from '../../../../../../../service/common/api-common.service';
import { DataCommunicationService } from '../../../../../../../service/common/data-communication.service';

@Component({
  selector: 'app-test-mcq-list',
  templateUrl: './test-mcq-list.component.html',
  styleUrls: ['./test-mcq-list.component.scss']
})
export class TestMcqListComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  class_info: any;
  testMCQlist: any;

  constructor(
    private apiCommon: ApiCommonService,
    private datacommunicate: DataCommunicationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.subscription = this.datacommunicate.getPassedItemData.subscribe(item => {
      this.class_info = item;
      if (item){
        this.apiCommon.get(`marketplace/dashboard/mcq-test/${item.course_category_id}/${item.id}`).subscribe(
          res => {
            this.testMCQlist = res.data;
          }
        )
      }
    });
  }

  mcqDetails(test): void{
    test['previous_route_data'] = this.class_info;
    this.datacommunicate.setPassedItemData(test);
    this.router.navigateByUrl('/user-dashboard/mcq-test/details');
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
