import { Component, OnInit } from '@angular/core';
import { ApiCommonService } from '../../../../../service/common/api-common-old.service';

@Component({
  selector: 'app-mcq-test-result',
  templateUrl: './mcq-test-result.component.html',
  styleUrls: ['./mcq-test-result.component.scss']
})
export class McqTestResultComponent implements OnInit {
  mcq_test_result: any;

  constructor(
    private apiCommon: ApiCommonService
  ) { }

  ngOnInit() {

    this.apiCommon.get(`manage/mcq-test-result`).subscribe(
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
      }
    );

  }

}
