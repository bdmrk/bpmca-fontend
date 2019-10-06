import { Component, OnInit, Input, ViewChild } from '@angular/core';
import {
  MatPaginator,
  MatSort,
  MatTableDataSource,
  MatDialog
} from '@angular/material';
import {BookingAvailableSlotComponent} from './booking-available-slot/booking-available-slot.component'
import { Router } from '@angular/router';
import { HelperService } from '../../../../../service/common/helper.service';
import { ApiCommonService } from '../../../../../service/common/api-common.service';

@Component({
  selector: 'app-tutor-available-slots',
  templateUrl: './tutor-available-slots.component.html',
  styleUrls: ['./tutor-available-slots.component.scss']
})
export class TutorAvailableSlotsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public checkLogin = false;

  displayedColumns: string[] = [
    'id',
    'title',
    'frequency',
    'week_days',
    'start',
    'end',
    'startDate',
    'endDate',
    'price',
    'action'
  ];
  dataSource: MatTableDataSource<any>;
  @Input() tutorId: number;
  @Input() availableSlots: any;

  constructor(
    private commonService: ApiCommonService,
    private dialog: MatDialog,
    private helper: HelperService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.availableSlots);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.helper.isAuthorized() ? this.checkLogin = true : this.checkLogin = false;
  }
  
  slotBooking(slotId) {

    if (!this.checkLogin){
      this.router.navigate(['/login']);
      return false;
    }

    const dialogRef = this.dialog.open(BookingAvailableSlotComponent, {
      width: '400px',
      data: {slotId: slotId},
    });
    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }
}