import { Component, OnInit } from '@angular/core';
import { ApiCommonService } from '../../../../../service/common/api-common.service';
@Component({
  selector: 'app-all-content-list',
  templateUrl: './all-content-list.component.html',
  styleUrls: ['./all-content-list.component.scss']
})
export class AllContentListComponent implements OnInit {

  public dataList;
  constructor(
      private apiCommon: ApiCommonService
  ) { }

  ngOnInit() {

    this.apiCommon.get('public/courses?content_type=' + 1).subscribe(
         (res) => {
             this.dataList = res.data;
         }
     );
     
  }

}
