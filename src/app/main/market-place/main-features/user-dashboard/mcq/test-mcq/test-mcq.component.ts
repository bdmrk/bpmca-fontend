import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { ApiCommonService } from '../../../../../../service/common/api-common.service';
import { DataCommunicationService } from '../../../../../../service/common/data-communication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test-mcq',
  templateUrl: './test-mcq.component.html',
  styleUrls: ['./test-mcq.component.scss']
})
export class TestMcqComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name',  'action'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  paginateStartNo = 0;

  current_class_subject;

  constructor(
    private apiCommon: ApiCommonService,
    private datacommunicate: DataCommunicationService,
    private router: Router
  ) { }

  ngOnInit() {

    this.apiCommon.get('marketplace/dashboard/mcq-practice-childclass').subscribe(
      res => {
        // console.log(res);
        if (res && res.data && res.data.current_class){
          this.current_class_subject = res.data.current_class;
          let subjects = [];
          this.current_class_subject.subcategories.filter(item => {
            if (res.data.group_id === item.group_id || item.group_id === 1){
              subjects.push(item);
            }
          })
          this.dataSource = new MatTableDataSource(subjects);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
    });
  }

  details(element): void{
    this.datacommunicate.setPassedItemData(element);
    this.router.navigateByUrl('/user-dashboard/mcq-test/list');
  }

  result(element): void{
    this.datacommunicate.setPassedItemData(element);
    this.router.navigateByUrl('/user-dashboard/mcq-test/answer');
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onPaginateChange(event) {
    this.paginateStartNo = event.pageIndex * event.pageSize;
}

}
