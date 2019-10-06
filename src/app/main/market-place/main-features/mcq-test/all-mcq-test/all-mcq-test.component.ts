import { Component, OnInit } from '@angular/core';
import { ApiCommonService } from '../../../../../service/common/api-common.service';
import { DataCommunicationService } from '../../../../../service/common/data-communication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-mcq-test',
  templateUrl: './all-mcq-test.component.html',
  styleUrls: ['./all-mcq-test.component.scss']
})
export class AllMcqTestComponent implements OnInit {
  test_questions = [];

  constructor(
    private apiCommon: ApiCommonService,
    private dataCommunicate: DataCommunicationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.apiCommon.get('public/mcq-test').subscribe(
      res => {
       // console.log(res);
        res.filter( item => {
          if (item.test_mcq_question.length > 0){
            this.test_questions.push(item);
          }
        })
      }
    )
  }

  mcqDetails(set): void{
    this.dataCommunicate.setPassedItemData(set);
    this.router.navigateByUrl('/mcq-test/mcq-test-detail');
  }

}
