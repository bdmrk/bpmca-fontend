import { Component, OnInit } from '@angular/core';
import { ApiCommonService } from '../../../../../service/common/api-common.service';

@Component({
  selector: 'app-all-interactive-courses',
  templateUrl: './all-interactive-courses.component.html',
  styleUrls: ['./all-interactive-courses.component.scss']
})
export class AllInteractiveCoursesComponent implements OnInit {

  navigation: any;
  public dataList;

  constructor(
      private apiCommon: ApiCommonService
  ) {
     
  }

  ngOnInit() {

      let slug ={
        interactive: true
      }

      this.apiCommon.get(`public/courses/${JSON.stringify(slug)}`).subscribe(
          (res) => {
              this.dataList = res;
          }
      );

  }

}
