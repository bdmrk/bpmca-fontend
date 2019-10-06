import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatProgressButtonOptions} from 'mat-progress-buttons';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

// Services
import {ToastrService} from 'ngx-toastr';
import {ApiCommonService} from '../../../../../service/common/api-common.service';

@Component({
    selector: 'app-add-rating',
    templateUrl: './add-rating.component.html',
    styleUrls: ['./add-rating.component.scss'],
    providers: [
        ApiCommonService,
        ToastrService
    ]
})
export class AddRatingComponent implements OnInit {

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

    ratingForm: FormGroup;
    private config;
    private route: any;
    user = {
        rating: '',
        comment:  ''
    };
    rating;
    constructor(
        private _formBuilder: FormBuilder,
        private apiCommon: ApiCommonService,
        private toastr: ToastrService,
        public dialogRef: MatDialogRef<AddRatingComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
    ) {

        this.config = {
            timeOut: 5000,
            closeButton: true,
            positionClass: 'toast-top-right',
            enableHtml: true,
        };
    }

    ngOnInit() {
        this.route = this.data.url;  // public/course/24/rating
        this.ratingForm = this._formBuilder.group({
            rating: ['1', Validators.required],
            comment: ['', Validators.required]
        });
    }

    onSubmit(): void {
        if (this.ratingForm.valid) {
            this.btnOpts.active = true;
            let data = this.ratingForm.value;
            this.apiCommon.store(this.route, data).subscribe(
                (res) => {
                    this.btnOpts.active = false;
                    if (res.response.status == 'success') {
                        this.toastr.success(res.response.message, "Success!", this.config);
                        this.ratingForm.reset();
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
                    this.btnOpts.active = false;
                },
                () => {
                    this.btnOpts.active = false;
                }
            );
        }
        else{
            
        }
    }

    close() {
        this.dialogRef.close();
    }

}

