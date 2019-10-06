import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UtilityService } from '../../../../../../service/utility/utility.service';

@Component({
  selector: 'app-progress-report-dialog',
  templateUrl: './progress-report-dialog.component.html',
  styleUrls: ['./progress-report-dialog.component.scss']
})
export class ProgressReportDialogComponent implements OnInit {
  mcq_test_result: any;
  aws_link: any;

  constructor(
    public dialogRef: MatDialogRef<ProgressReportDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private utility: UtilityService
  ) { 
    this.aws_link = utility.aws_s3_bucket_path();
   }

  ngOnInit() {
    this.mcq_test_result = this.data.exam_report;
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
