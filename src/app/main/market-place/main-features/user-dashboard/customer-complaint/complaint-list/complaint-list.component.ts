import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { MatProgressButtonOptions } from 'mat-progress-buttons';
import { Router } from '@angular/router';
import { ApiCommonService } from '../../../../../../service/common/api-common.service';
import { DataCommunicationService } from '../../../../../../service/common/data-communication.service';

@Component({
  selector: 'app-complaint-list',
  templateUrl: './complaint-list.component.html',
  styleUrls: ['./complaint-list.component.scss']
})
export class ComplaintListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = [
    'id',
    'ticket',
    'type',
    'subject',
    'status',
    'details'
  ];

  dataSource: MatTableDataSource<any>;

  // Button options
  btnOpts: MatProgressButtonOptions = {
    active: false,
    text: 'Submit',
    spinnerSize: 19,
    raised: true,
    stroked: false,
    buttonColor: 'white',
    spinnerColor: 'white',
    fullWidth: false,
    disabled: false,
    mode: 'indeterminate',
  };
  config:any;

  private route:any;
  complaint_data:any;
  complainList: any;

  constructor(private apiCommon: ApiCommonService,private router:Router,private dataCommunicationService: DataCommunicationService ) { 
    this.route = 'get-all-complaint';
    this.config = {
      timeOut: 5000,
      closeButton: true,
      positionClass: 'toast-top-right',
      enableHtml: true,
    };
  }

  ngOnInit() {
    this.apiCommon.get(this.route).subscribe(
      (res)=>{
        this.dataSource = new MatTableDataSource(res.data);
        this.complainList=res.data;
        console.log(this.complainList)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      
      },
      (err)=>{
        this.complaint_data = [];
      }
    )
  }
  applyFilter(filterValue: string): any {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
    }
  } 

    detailIssue(id){
      const value = 
      {
        data: id 
      };
      this.dataCommunicationService.setPassedItemData(value);
      this.router.navigate(['/user-dashboard/complaint/details']);
    }

}
