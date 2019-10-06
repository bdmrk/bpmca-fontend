import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataCommunicationService } from '../../../../../service/common/data-communication.service';
import { Subscription } from 'rxjs';
import { ApiCommonService } from '../../../../../service/common/api-common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mcq-test-details',
  templateUrl: './mcq-test-details.component.html',
  styleUrls: ['./mcq-test-details.component.scss']
})
export class McqTestDetailsComponent implements OnInit, OnDestroy {
  mcqTestSubscription: Subscription;
  question_tests: { 'data': any; 'test': any; };
  dataMCQSet: any;
  related_test: any;
  selectedQuestion: any;

  constructor(
    private dataService:DataCommunicationService,
    private apiCommon:ApiCommonService,
    private router :Router
    ) { }

  ngOnInit() {

    this.mcqTestSubscription= this.dataService.getPassedItemData.subscribe(
      (data)=>{
        
        this.dataMCQSet=data;
        this.getTestQuestion(data);
    
      }
    );

  }

  backtoMCQTestList() {
    this.router.navigateByUrl(`/mcq-test/${this.dataMCQSet.class_id}`);
  }
  backtoMCQPractice() {
    this.router.navigateByUrl(`/mcq/${this.dataMCQSet.class_id}`);
  }
  backtoBoardQuestion() {
    this.router.navigateByUrl(`/bq/${this.dataMCQSet.class_id}`);
  }

  getTestQuestion(data) {

    this.apiCommon.get(`public/mcq-test/${data.class_id}/${data.subject_id}/${data.id}`).subscribe(
      res => {
        this.question_tests = {
          'data': res.question_sets,
          'test': data
        };
        this.related_test = res.more_test;
        this.selectedQuestion = res.test_mcq.id;
        console.log(this.selectedQuestion);
      }
    );

  }
  getTestItem(data){
    this.dataMCQSet=data;
    this.selectedQuestion=this.dataMCQSet.id;
    this.apiCommon.get(`public/mcq-test/${data.class_id}/${data.subject_id}/${data.id}`).subscribe(
      res => {
        this.question_tests = {
          'data': res.question_sets,
          'test': data
        };
        this.related_test = res.more_test;
        
      //  console.log(res);
      }
    );
  }

  ngOnDestroy(){
    this.mcqTestSubscription.unsubscribe();
  }


}
