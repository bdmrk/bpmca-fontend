import { Component, OnInit, Input } from '@angular/core';
import { ApiCommonService } from '../../../../../../service/common/api-common-old.service';
import { UtilityService } from '../../../../../../service/utility/utility.service';

@Component({
  selector: 'app-mcq-test-answer',
  templateUrl: './mcq-test-answer.component.html',
  styleUrls: ['./mcq-test-answer.component.scss']
})
export class McqTestAnswerComponent implements OnInit {

  @Input() mcq_test_result;
  aws_link: String;
  dataset = [];

  constructor(
    private apicommon: ApiCommonService,
    private utility: UtilityService,
  ) { 
    this.aws_link = this.utility.aws_s3_bucket_path();
   }

  ngOnInit() {
    this.dataset = this.mcq_test_result;
  }

}
