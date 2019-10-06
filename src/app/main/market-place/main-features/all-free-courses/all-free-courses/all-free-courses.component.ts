import { Component, OnInit } from '@angular/core';
import { ApiCommonService } from '../../../../../service/common/api-common.service';

@Component({
  selector: 'app-all-free-courses',
  templateUrl: './all-free-courses.component.html',
  styleUrls: ['./all-free-courses.component.scss']
})
export class AllFreeCoursesComponent implements OnInit {

  public dataList;

  constructor(
      private apiCommon: ApiCommonService
  ) {}

  ngOnInit() {

      let slug = {
        free_youtube: true
      }

      this.apiCommon.get(`public/courses/${JSON.stringify(slug)}`).subscribe(
          (res) => {
              this.dataList = res;
          }
      );

  }
}
