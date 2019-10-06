import { Component, OnInit } from '@angular/core';
import { DataCommunicationService } from '../../../../../service/common/data-communication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-board-question-details',
  templateUrl: './board-question-details.component.html',
  styleUrls: ['./board-question-details.component.scss']
})
export class BoardQuestionDetailsComponent implements OnInit {
  subcription: any;
  bq_set_api: any;
  solution_image: any;
  question_image: any;
  set_id: any;
  relatedQuestion: any;
  classId: any;
  classID: any;
  selectedQuestion: any;

  
  constructor(
    private dataCommunicate: DataCommunicationService,
    private router:Router
  ) { }

  ngOnInit() {

    this.subcription = this.dataCommunicate.getPassedItemData.subscribe(data => {
    
      // this.classId=data.class.id;
      // console.log(data.categoryBQlist[0].classId);
      
      this.set_id=data.id;
      this.selectedQuestion =this.set_id;
      this.relatedQuestion= data.categoryBQlist;
      this.bq_set_api=this.relatedQuestion.filter(item => {
        if(this.set_id == item.id){
          return item;
        }
      });
      //  = data.categoryBQlist[this.set_id];
      this.question_image= JSON.parse(this.bq_set_api[0].question_image);
      this.solution_image= JSON.parse(this.bq_set_api[0].solution);
     
      this.classID=this.bq_set_api[0].class_id;
    })

  }

  getRelatedQuestion(id){
    this.bq_set_api=this.relatedQuestion.filter(item => {
      if(id == item.id){
        return item;
      }
    });
    this.selectedQuestion=id;
    this.question_image= JSON.parse(this.bq_set_api[0].question_image);
    this.solution_image= JSON.parse(this.bq_set_api[0].solution);
    // console.log(this.relatedQuestion);
    console.log(this.bq_set_api[0]);

  }

  ngOnDestroy(): void {
    this.subcription.unsubscribe();
  }

  backtoMCQTestList() {
    this.router.navigateByUrl(`/mcq-test/${this.classID}`);
  }
  backtoMCQPractice() {
    this.router.navigateByUrl(`/mcq/${this.classID}`);
  }
  backtoBoardQuestion() {
    this.router.navigateByUrl(`/bq/${this.classID}`);
  }

}
