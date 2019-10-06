import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataCommunicationService } from '../../../../../../../service/common/data-communication.service';
import { ApiCommonService } from '../../../../../../../service/common/api-common.service';
import { Router } from '@angular/router';
import { UtilityService } from '../../../../../../../service/utility/utility.service';

@Component({
  selector: 'app-test-mcq-answer',
  templateUrl: './test-mcq-answer.component.html',
  styleUrls: ['./test-mcq-answer.component.scss']
})
export class TestMcqAnswerComponent implements OnInit {

  subscription: Subscription;
  class_info: any;
  mcq_test_result: any;
  studentTest = [];
  aws_link: any;

  constructor(
    private dataCommunicate: DataCommunicationService,
    private apiCommon: ApiCommonService,
    private router: Router,
    private utility: UtilityService
  ) { 
    this.aws_link = utility.aws_s3_bucket_path();
   }

  ngOnInit() {

    this.subscription = this.dataCommunicate.getPassedItemData.subscribe(data => {
      this.class_info = data;
      if (data){

        let slug = {
          class_id: data.course_category_id,
          subject_id: data.id
        }

        this.apiCommon.get(`manage/mcq-test-result/${JSON.stringify(slug)}`).subscribe(
          res => {
            res.data.filter( (item,index) => {
              item.answers = JSON.parse(item.answers);
              let right = 0;
              let wrong = 0;
              let skipped = 0;
              item.answers.filter((item2,index2) => {
                if (item2.givenAnswer === '-1'){
                  skipped += 1;
                }
                else if (item2.givenAnswer === item2.questions.answer){
                  right += 1;
                }
                else{
                  wrong += 1;
                }
              })
              item['right'] = right;
              item['skipped'] = skipped;
              item['wrong'] = wrong;
            })
            this.mcq_test_result = res.data;

            // quiz
            res.studentTest.filter((value, i) => {

              const answer = JSON.parse(value.answers);
    
              var right = 0;
              var wrong = 0;
              var skipped = 0;
    
              answer.filter((val) => {
                if (val.givenAnswer.status === true) {
                  right += 1;
                }
                else if (val.givenAnswer.status === false) {
                  wrong += 1;
                }
                else {
                  skipped += 1;
                }
              });
    
              this.studentTest.push({
                data: value,
                answers: answer,
                right: right,
                wrong: wrong,
                skipped: skipped,
              });
            });

          }
        );
      }
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
