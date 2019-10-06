import {Component, OnInit, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ToastrService} from 'ngx-toastr';
import {ApiCommonService} from '../../../../../service/common/api-common.service';

@Component({
    selector: 'app-delete',
    templateUrl: './delete.component.html',
    styleUrls: ['./delete.component.scss'],
    providers: [
        ApiCommonService,
        ToastrService
    ]
})
export class DeleteComponent implements OnInit {

    private route;
    private config;

    constructor(
        public dialogRef: MatDialogRef<DeleteComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private toastr: ToastrService,
        private apiCommon: ApiCommonService,
    ) {
        this.route = 'user-settings/skill/';

        this.config = {
            timeOut: 5000,
            closeButton: true,
            positionClass: 'toast-top-right',
            enableHtml: true,
        };
    }

    ngOnInit() {
    }

    delete() {
        this.apiCommon.delete(this.route, this.data.id).subscribe(
            (res) => {
                if (res.response.status == 'success') {
                    this.toastr.success(res.response.message, "Success!", this.config);
                } else if (res.response.status == 'error') {
                    this.toastr.error(res.response.message, "Error!", this.config);
                }
            },
            (res) => {
                if (res.error.message) {
                    this.toastr.error(res.error.message, "Error!", this.config);
                }
                if (res.error.response) {
                    this.toastr.error(res.error.response.message, "Error!", this.config);
                }
            }
        );
    }

    close() {
        this.dialogRef.close();
    }

}
