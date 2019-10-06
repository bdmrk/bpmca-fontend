import { Component, OnInit } from '@angular/core';
import { ApiCommonService } from '../../../../../../service/common/api-common.service';
import { MatDialog } from '@angular/material';
import { McqExamReportDialogComponent } from './mcq-exam-report-dialog/mcq-exam-report-dialog.component';
import { DataCommunicationService } from '../../../../../../service/common/data-communication.service';

@Component({
  selector: 'app-children',
  templateUrl: './children.component.html',
  styleUrls: ['./children.component.scss']
})
export class ChildrenComponent implements OnInit {

  children: any;
  childOnDisplay: any;
  selectedIndex: number= -1;
  completed_exam = [];
  upcoming_exam: any;
  exam_report: any;
  score = 0;
  obtained_mark = 0;
  childResult: any;
  progressData = [];
  displayAllProgress=true;
  
  constructor(
    private apiCommon: ApiCommonService,
    public dialog: MatDialog,
    private dataService:DataCommunicationService
  ) {}

  ngOnInit() {
    this.apiCommon.get('public/children').subscribe(
      (res) => {
        this.children=res.data;
        this.childOnDisplay=res.data[0];
        this.selectedIndex=-1;
        this.mcq_exam_report();
        // this.getChartData(this.childOnDisplay.user_id,this.childOnDisplay.user.name);
      },
      (error) => {
      }
    );
   
    
  }
  ngAfterViewInit() {
    this.getChartData(this.childOnDisplay.user_id,this.childOnDisplay.user.name);
  }
  getChartData(id: any,user_name) {
    this.apiCommon.get(`student-progress?type=parent&s_id=${id}`).subscribe(
      (res) => {
        this.childResult = res.data;
        this.progressData[0] = {
          "data": this.childResult[0].scores ? this.childResult[0].scores.toString().split(",") : [],
          "label": user_name,
          "borderColor": "rgba(212, 33, 78, 1)",
          "backgroundColor": "rgba(255, 255, 255, 0)",
          "pointBackgroundColor": "rgba(212, 33, 78, 1)",
          "pointBorderColor": '#fff',
          "pointHoverBackgroundColor": 'rgba(212, 33, 78, 1)',
          "pointHoverBorderColor": 'rgba(148,159,177,0.8)',
          "pointRadius": 5,
          "pointHoverRadius":5 
        }
        
      },
      err =>{
        this.progressData[0] = {
          "data": [],
          "label": user_name
        }
      }
    )
  }

  mcq_exam_report(){

    let slug = {
      user_id: this.childOnDisplay.user_id,
      class_id: this.childOnDisplay.current_class_id
    }

    this.apiCommon.get(`marketplace/dashboard/parents-panel/${JSON.stringify(slug)}`).subscribe(
      res => {
  
        this.completed_exam =  res.completed_exam;
        this.upcoming_exam =  res.upcoming_exam;
        this.exam_report = res.exam_report;

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
      }
    )
  }

  getCompletedExam(item){

     this.dialog.open(McqExamReportDialogComponent, {
      maxWidth: '100vw',
      height: '100%',
      width: '100%',
      data: { exam_report: item, 'childOnDisplay': this.childOnDisplay },
    });
    
  }

  updateChildOnDisplay(index,user_id,user_name){
    this.displayAllProgress=false;
    this.getChartData(user_id,user_name);
    this.childOnDisplay=this.children[index];
    this.selectedIndex=index;
    this.mcq_exam_report();
  }

  onClickDisplayAllProgress(){
    this.displayAllProgress=true;
    this.selectedIndex=-1;
  }
}
