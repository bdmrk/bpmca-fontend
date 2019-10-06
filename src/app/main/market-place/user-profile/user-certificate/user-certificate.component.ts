import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { AddCertificateComponent } from './add-certificate/add-certificate.component';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { EditCertificateComponent } from './edit-certificate/edit-certificate.component';
import { ApiCommonService } from '../../../../service/common/api-common.service';
import { UtilityService } from '../../../../service/utility/utility.service';

@Component({
  selector: 'app-user-certificate',
  templateUrl: './user-certificate.component.html',
  styleUrls: ['./user-certificate.component.scss']
})
export class UserCertificateComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['id', 'certificate_type', 'start_date', 'end_date', 'file', 'action'];
  dataSource: MatTableDataSource<any>;
  paginateStartNo = 0;
  AWS_URL;

  constructor(
    public dialog: MatDialog,
    private apiCommon: ApiCommonService,
    private utility: UtilityService,
    ) {}

  ngOnInit() {

    this.AWS_URL = this.utility.aws_s3_bucket_path();

    this.apiCommon.get('user-settings/certificate?index=true').subscribe(
      (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    );

  }

  add(): void{

    let dialogRef = this.dialog.open(AddCertificateComponent, {
      width: '700px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success'){
        this.ngOnInit();
      }
    });
  }

  edit(data): void{

    let dialogRef = this.dialog.open(EditCertificateComponent, {
      width: '700px',
      data: {data}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success'){
        this.ngOnInit();
      }
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
    }
}

onPaginateChange(event) {
  this.paginateStartNo = event.pageIndex * event.pageSize;
}

}
