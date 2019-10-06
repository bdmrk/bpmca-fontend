import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UtilityService } from '../../../../../../../service/utility/utility.service';

@Component({
  selector: 'app-mcq-exam-report-dialog',
  templateUrl: './mcq-exam-report-dialog.component.html',
  styleUrls: ['./mcq-exam-report-dialog.component.scss']
})
export class McqExamReportDialogComponent implements OnInit {
  mcq_test_result: any;
  childOnDisplay: any;
  aws_link: any;

  constructor(
    public dialogRef: MatDialogRef<McqExamReportDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private utility: UtilityService
  ) { 
    this.aws_link = utility.aws_s3_bucket_path();
   }

  ngOnInit() {
    this.mcq_test_result = this.data.exam_report;
    this.childOnDisplay = this.data.childOnDisplay;
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
