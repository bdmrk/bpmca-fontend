import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ApiCommonService } from '../../../../../../service/common/api-common.service';
import { UtilityService } from '../../../../../../service/utility/utility.service';
import { ToastrService } from 'ngx-toastr';
import { StorageService } from '../../../../../../service/common/storage.service';

@Component({
  selector: 'app-mcq-test',
  templateUrl: './mcq-test.component.html',
  styleUrls: ['./mcq-test.component.scss']
})
export class McqTestComponent implements OnInit {
  
  @Input() question_tests;
  mcq_question = [];
  mcq_test_result;

  // quiz start button
  start_quiz_btn = false;
  quizForm: FormGroup;

  // quiz left time
  leftTime = 0;
  index_value = 0;

  config;
  aws_link;

  constructor(
    private apiCommon: ApiCommonService,
    private utility: UtilityService,
    private _formBuilder: FormBuilder,
    private toastr: ToastrService,
    private storage: StorageService
    ) {
    this.config = {
      timeOut: 5000,
      closeButton: true,
      positionClass: 'toast-top-right',
      enableHtml: true,
    };

    this.aws_link = this.utility.aws_s3_bucket_path();
    this.quizForm = this._formBuilder.group({});
  }

  ngOnInit() {

    // this.leftTime = 10000;
    this.leftTime = this.question_tests['test']['time'];

    this.mcq_question = this.question_tests.data;

    this.mcq_question.filter( (item, index) => {
      if (typeof this.mcq_question[index]['questions'] === 'string'){
        this.mcq_question[index]['questions'] = JSON.parse(this.mcq_question[index]['questions']);
      }
      this.mcq_question[index]['givenAnswer'] = '-1';
      this.quizForm.addControl('quiz_option_' + index, new FormControl(''));
    });
  }

  loadMore(): void {
   this.index_value += 1; 
  }

  loadLess(): void {
    this.index_value -= 1; 
  }

  radioChange(event , index): any {
    this.mcq_question[index]['givenAnswer'] = event.value;
    // console.log(this.mcq_question);
  }

  submit(): void{

    let dataset = {
      'test': this.question_tests.test,
      'mcq_questions': this.mcq_question
    };


    this.apiCommon.store('manage/mcq-test-result' , dataset).subscribe(
      (res) => {
        if (res.status === 'success'){
          this.toastr.success(res.message, 'Success!', this.config);
          this.start_quiz_btn = false;
          this.quizForm.reset();
          this.mcq_question = [];
          this.index_value = 0;
          this.leftTime = 0;

          // result
          if (typeof res.result.answers === 'string'){
            res.result.answers = JSON.parse(res.result.answers);
          }
          let right = 0;
          let wrong = 0;
          let skipped = 0;
          res.result.answers.filter((item2,index2) => {
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
          res.result['right'] = right;
          res.result['skipped'] = skipped;
          res.result['wrong'] = wrong;
          this.mcq_test_result = res.result;
          this.mcq_test_result = res.result;
        }
      }
    );
  }


  start_quiz(): void{
    let storage = this.storage.getUserData();
    if(storage){
      this.start_quiz_btn = true;
      this.ngOnInit();
    }
    else{
      this.toastr.warning('Please login first.', 'Warning!', this.config);
    }
  }

  onStart(): void{
    this.start_quiz_btn = true;
  }

  onFinished(): void{
    this.submit();
  }

  onNotify(time: number): void{
    // console.log(time);
  }

}
