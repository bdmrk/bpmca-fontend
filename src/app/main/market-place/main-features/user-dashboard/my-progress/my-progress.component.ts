import { Component, OnInit } from '@angular/core';
import { ApiCommonService } from '../../../../../service/common/api-common-old.service';
import { StorageService } from '../../../../../service/common/storage.service';
import { ProgressReportDialogComponent } from './progress-report-dialog/progress-report-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-my-progress',
  templateUrl: './my-progress.component.html',
  styleUrls: ['./my-progress.component.scss']
})
export class MyProgressComponent implements OnInit {
  completed_exam: any;
  score = 0;
  obtained_mark = 0;
  user: any;
  exam_report: any;
  upcoming_exam: any;
  progressData = [];
  examResult: any;

  constructor(
    private apiCommon: ApiCommonService,
    private storage: StorageService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.mcq_exam_report();
  }

  mcq_exam_report(){

    let user_id = this.storage.getUserData();
    let slug = {
      user_id: user_id.id
    }

    this.apiCommon.get(`marketplace/dashboard/parents-panel/${JSON.stringify(slug)}`).subscribe(
      res => {
        console.log(res);
        this.completed_exam = res.completed_exam;
        this.upcoming_exam = res.upcoming_exam;
        this.exam_report = res.exam_report;
        this.examResult = res.exam_report.student_progress;
        // console.log(this.examResult.scores.toString().split(","));
        this.progressData[0] = {
          "data": this.examResult.scores ? this.examResult.scores.toString().split(",") : [],
          "label": this.examResult.user_name
        }
    
        console.log(this.progressData[0]);



        this.completed_exam.filter(value => {
          value.mcq_test_result.filter( item => {
            let right = 0;
            let wrong = 0;
            let skipped = 0;
            if (typeof item.answers === 'string'){
              item.answers = JSON.parse(item.answers);
            }
            item.answers.filter( item2 => {
              this.score += 1;
              if (item2.givenAnswer === '-1'){
                skipped += 1;
              }
              else if (item2.givenAnswer === item2.questions.answer){
                this.obtained_mark += 1;
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
        })
        // console.log(this.completed_exam);
      },
      err => {
        this.progressData[0]=[];
      }
    )
  }

  getCompletedExam(item){

    this.dialog.open(ProgressReportDialogComponent, {
     maxWidth: '100vw',
     height: '100%',
     width: '100%',
     data: { exam_report: item },
   });
   
 }

}
