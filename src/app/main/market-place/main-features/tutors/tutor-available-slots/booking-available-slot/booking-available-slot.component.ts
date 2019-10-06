import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ToastrService } from "ngx-toastr";
import { ApiCommonService } from '../../../../../../service/common/api-common.service';


@Component({
  selector: 'app-booking-available-slot',
  templateUrl: './booking-available-slot.component.html',
  styleUrls: ['./booking-available-slot.component.scss']
})
export class BookingAvailableSlotComponent implements OnInit {
  private config;
  constructor(
    private apiCommon: ApiCommonService,
    public dialogRef: MatDialogRef<BookingAvailableSlotComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr: ToastrService,
  ) {
    this.config = {
      timeOut: 5000,
      closeButton: true,
      positionClass: 'toast-top-right',
      enableHtml: true,
    };
  }

  ngOnInit() {
  }
  slotBookAction() {
    const api = 'live-class/slot-booking';
    const data = { slotId: this.data.slotId }
    this.apiCommon.store(api, data).subscribe(
      (res) => {
        if (res.response.code == 200) {
          this.toastr.success(res.response.message, "Success!", this.config);
        }
        else if (res.response.code == 409) {
          this.toastr.warning(res.response.message, "Warning!", this.config);
        }
      },
      (res) => {
       // console.log(res.error);
        // if (res.error.message) {
        //   this.toastr.error(res.error.message, "Error!", this.config);
        // }
      },
    );
    return false;
  }
  closeDialog(): void {
    this.dialogRef.close();
  }
}
