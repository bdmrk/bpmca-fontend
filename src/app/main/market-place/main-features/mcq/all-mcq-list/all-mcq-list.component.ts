import { Component, OnInit } from '@angular/core';
import { ApiCommonService } from '../../../../../service/common/api-common.service';
import { DataCommunicationService } from '../../../../../service/common/data-communication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-mcq-list',
  templateUrl: './all-mcq-list.component.html',
  styleUrls: ['./all-mcq-list.component.scss']
})
export class AllMcqListComponent implements OnInit {
  set_questions = [];

  constructor(
    private apiCommon: ApiCommonService,
    private dataCommunicate: DataCommunicationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.apiCommon.get('public/mcq').subscribe(
      res => {
        res.filter( item => {
          if (item.set_mcq_question.length > 0){
            this.set_questions.push(item);
          }
        })
      }
    )
  }

  mcqDetails(set): void{
    this.dataCommunicate.setPassedItemData(set);
    this.router.navigateByUrl('/mcq/mcq-details');
  }

}
