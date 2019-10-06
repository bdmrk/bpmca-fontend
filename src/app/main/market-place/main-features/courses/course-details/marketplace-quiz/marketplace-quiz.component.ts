import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, ElementRef, Inject } from '@angular/core';
import { ApiCommonService } from '../../../../../../service/common/api-common.service';
import { UtilityService } from '../../../../../../service/utility/utility.service';
import { StorageService } from '../../../../../../service/common/storage.service';

@Component({
  selector: 'app-marketplace-quiz',
  templateUrl: './marketplace-quiz.component.html',
  styleUrls: ['./marketplace-quiz.component.scss']
})
export class MarketplaceQuizComponent implements OnInit {

  testQuestion = [];
  filter_testQuestion = [];
  aws_link;

  // quiz start button
  start_quiz_btn = false;
  quizForm: FormGroup;

  // quiz left time
  leftTime = 0;

  // pagination
  total;
  previous;
  next;
  index_value = 0;

  // disable
  previousDisable;
  nextDisable;

  config;
  constructor(
    private apiCommon: ApiCommonService,
    private utility: UtilityService,
    private _formBuilder: FormBuilder,
    private toastr: ToastrService,
    private eRef: ElementRef,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<MarketplaceQuizComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
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

      this.testQuestion = [];

      if (this.data.lecture_id) {

        this.apiCommon.get(`test/question?lecture_id=${this.data.lecture_id}`).subscribe(
          (res) => {
            if (res) {
              res.testQuestion.map((value , i) => {
                this.quizForm.addControl('quiz_option_' + i, new FormControl(''));
                this.leftTime += value.time_limit;
                this.testQuestion.push({
                  data: value,
                  testOptionJson: JSON.parse(value.question_options),
                  givenAnswer: { answer: '-1' , status: null}
                });
              });

              if (this.testQuestion.length > 0) {
                this.index_value = 0;
                this.total = 0;
                this.previous = false;
                this.next = false;
                this.total = this.testQuestion.length;

                if (this.total > 1) {
                  this.next = true;
                }
              }
            }
          }
        );
      }

  }

  loadMore(): void {

    if (this.total > 1) {
      this.total -= 1;
      this.index_value += 1;
      this.previous = true;
      this.previousDisable = false;
    }
    else{
      this.nextDisable = true;
    }
}

  loadLess(): void {

    if (this.index_value > 0) {
      this.total += 1;
      this.index_value -= 1;
      this.nextDisable = false;
    }
    else{
      this.previousDisable = true;
    }

  }

  radioChange(event , index): any {

    this.testQuestion[index].givenAnswer.answer = event.value.toString();

    var status = false;
    if (this.testQuestion[index].data.current_answers == this.testQuestion[index].givenAnswer.answer){
      status = true;
    }

    this.testQuestion[index].givenAnswer.status = status;
  }

  submit(): void{
    
    this.apiCommon.store('test/student-test' , this.testQuestion).subscribe(
      (res) => {
        if (res.status === 'success'){
          this.toastr.success(res.message, 'Success!', this.config);
          this.start_quiz_btn = false;
          this.closeDialog();
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

  closeDialog() {
    this.dialogRef.close();
  }

}
