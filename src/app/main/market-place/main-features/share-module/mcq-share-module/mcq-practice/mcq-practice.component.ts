import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { UtilityService } from '../../../../../../service/utility/utility.service';

@Component({
  selector: 'app-mcq-practice',
  templateUrl: './mcq-practice.component.html',
  styleUrls: ['./mcq-practice.component.scss']
})
export class McqPracticeComponent implements OnInit {

  @Input() question_sets;
  ansBtnText = "Show Answer";
  mcq_question = [];
  answer: { 'index': any, 'option': any; 'image_option': any; };
  aws_url;
  showAnswerDiv: boolean = false;
  showAnswerDivIndex = -1;
  showAnswerDivToggle = true;
  showAnswerDivToggleId = 0;
  showAnswerButtonTitle = false;

  constructor(
    private utility: UtilityService
  ) {
    this.aws_url = utility.aws_s3_bucket_path();
  }

  ngOnInit() {
    this.mcq_question = this.question_sets;
    this.mcq_question.filter((item, index) => {
      this.mcq_question[index]['questions'] = JSON.parse(this.mcq_question[index]['questions']);
    })



  }


  showAnswer(item, i, questionId): void {
    if (questionId != this.showAnswerDivToggleId) {
      this.showAnswerDivToggleId = questionId;
      this.showAnswerDivToggle = true;
      this.showAnswerButtonTitle = true;
    }
    else {
      this.showAnswerDivToggle = !this.showAnswerDivToggle;
      this.showAnswerButtonTitle = !this.showAnswerButtonTitle;
    }

    switch (item.answer) {
      case '1':
        this.answer = { 'index': i, 'option': item.options.option1, 'image_option': item.options.image_option_1 };
        break;
      case '2':
        this.answer = { 'index': i, 'option': item.options.option2, 'image_option': item.options.image_option_2 };
        break;
      case '3':
        this.answer = { 'index': i, 'option': item.options.option3, 'image_option': item.options.image_option_3 };
        break;
      case '4':
        this.answer = { 'index': i, 'option': item.options.option4, 'image_option': item.options.image_option_4 };
        break;
      default:
        this.answer = null;
    }
    this.showAnswerDiv = false;
    this.showAnswerDivIndex = i;
    this.showAnswerDiv = true;
  }
}
