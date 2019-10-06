import { Component, OnInit } from '@angular/core';
import { ApiCommonService } from '../../../../../service/common/api-common.service';
import { DataCommunicationService } from '../../../../../service/common/data-communication.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-all-board-questions',
  templateUrl: './all-board-questions.component.html',
  styleUrls: ['./all-board-questions.component.scss']
})
export class AllBoardQuestionsComponent implements OnInit {

  board_questions = [];

  constructor(
    private apiCommon: ApiCommonService,
    private dataCommunicate: DataCommunicationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.apiCommon.get('public/previous-question').subscribe(
      res => {
        // console.log(res);
        this.board_questions = res;
      }
    )
  }

  bqDetails(id,categoryBQlist): void{

    this.dataCommunicate.setPassedItemData(
      {
        id: id,
        categoryBQlist: categoryBQlist
      }

    );
    this.router.navigateByUrl('/bq/bqDetails');
  }

}
