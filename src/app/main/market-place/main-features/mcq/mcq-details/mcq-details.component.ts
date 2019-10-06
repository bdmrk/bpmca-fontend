import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataCommunicationService } from '../../../../../service/common/data-communication.service';
import { Subscription } from 'rxjs';
import { ApiCommonService } from '../../../../../service/common/api-common-old.service';
import { MatTabChangeEvent } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mcq-details',
  templateUrl: './mcq-details.component.html',
  styleUrls: ['./mcq-details.component.scss']
})
export class McqDetailsComponent implements OnInit, OnDestroy {

  subcription: Subscription;
  question_sets = [];
  question_tests: any;
  more_mcq= [];
  class_info_set;

  mcq_type = 0;
  test_mcq: any;
  class_info_test: any;
  selectedQuestion: any;

  constructor(
    private dataCommunicate: DataCommunicationService,
    private apiCommon: ApiCommonService,
    private router:Router
  ) { }

  ngOnInit() {
    this.subcription = this.dataCommunicate.getPassedItemData.subscribe(data => {
      this.class_info_set = data;
      this.indexAll(this.class_info_set);
      this.selectedQuestion=this.class_info_set.id;

      // console.log(this.class_info_set);
    })
  }
  
  backtoMCQTestList() {
    this.router.navigateByUrl(`/mcq-test/${this.class_info_set.class_id}`);
  }
  backtoMCQPractice() {
    this.router.navigateByUrl(`/mcq/${this.class_info_set.class_id}`);
  }
  backtoBoardQuestion() {
    this.router.navigateByUrl(`/bq/${this.class_info_set.class_id}`);
  }
  indexAll(item){
    this.question_sets = [];
    this.more_mcq= [];

    if (item){

      let slugArray = {
        class_id: item.class_id ? item.class_id : null ,
        subject_id: item.subject_id ? item.subject_id : null ,
        set_id: item.id ? item.id : null ,
        chapter_no: item.chapter_no ? item.chapter_no : null,
        lesson_no: item.lesson_no ? item.lesson_no : null,
      };

      this.apiCommon.get(`public/mcq-questions/${JSON.stringify(slugArray)}`).subscribe(
        res => {
          this.question_sets = res.question_sets;
          this.more_mcq = res.more_mcq;
          this.test_mcq = res.test_mcq;
        }
      );
    }
  }
 

  getSetItem(item): void{
    this.class_info_set = item;
    this.selectedQuestion=item.id;
    this.indexAll(this.class_info_set);
  }

  getTestItem(item): void{
    this.selectedQuestion=item.id;
    this.class_info_test = item;
    this.test_mcq_http(item);
  }

  test_mcq_http(item) {
    this.question_tests = '';
    this.apiCommon.get(`marketplace/dashboard/mcq-test/${item.id}`).subscribe(
      res => {
        this.question_tests = {
          'data': res.data,
          'test': item
        };
      },
      error => {
        // console.log("Error");
      }
    );
  }

  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    this.mcq_type = tabChangeEvent.index;

    if (this.mcq_type === 1 && this.test_mcq[0]){
      this.test_mcq_http(this.test_mcq[0]);
      this.class_info_test = this.test_mcq[0];
    }
  }

  ngOnDestroy(): void {
    this.subcription.unsubscribe();
  }
}
