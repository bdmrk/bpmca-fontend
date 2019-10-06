import { Component, OnInit } from '@angular/core';
import { ApiCommonService } from '../../../../../../service/common/api-common.service';

@Component({
  selector: 'app-all-progress-report',
  templateUrl: './all-progress-report.component.html',
  styleUrls: ['./all-progress-report.component.scss']
})
export class AllProgressReportComponent implements OnInit {
  childResult=[];
  progressData: any;

  constructor(private apiCommon:ApiCommonService) { }

  ngOnInit() {
    this.apiCommon.get('student-progress?type=parent').subscribe(
      res => {
        this.childResult = res.data;
        // console.log(this.childResult);
        this.progressData = this.childResult.map((item) => {
          return {
            "data": item['scores'] ? item['scores'].toString().split(",") : [],
            "label": item['user_name'],    
          }
        });

      }
    )
  }



}
