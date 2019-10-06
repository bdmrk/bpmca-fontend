import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {MatProgressButtonOptions} from 'mat-progress-buttons';
import {ActivatedRoute, Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

// Services
import {ToastrService} from 'ngx-toastr';
import {ApiCommonService} from '../../../../../service/common/api-common.service';
import {HelperService} from '../../../../../service/common/helper.service';
import {StorageService} from '../../../../../service/common/storage.service';

@Component({
    selector: 'app-add',
    templateUrl: './add.component.html',
    styleUrls: ['./add.component.scss'],
    providers: [
        ApiCommonService,
        HelperService,
        StorageService,
        ToastrService
    ]
})
export class AddComponent implements OnInit {

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

    educationForm: FormGroup;
    private config;
    private route: any;
    private _unsubscribeAll: Subject<any>;

    constructor(
        private _formBuilder: FormBuilder,
        private apiCommon: ApiCommonService,
        private helper: HelperService,
        private storage: StorageService,
        private toastr: ToastrService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        public dialogRef: MatDialogRef<AddComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
    ) {

        this.route = 'user-settings/education';

        this._unsubscribeAll = new Subject();

        this.config = {
            timeOut: 5000,
            closeButton: true,
            positionClass: 'toast-top-right',
            enableHtml: true,
        };
    }

    ngOnInit() {
        this.educationForm = this._formBuilder.group({
            name: ['', Validators.required],
            description: ['', Validators.required],
            address: ['', Validators.required],
            city: ['', Validators.required],
            state: ['', Validators.required],
            country: ['', Validators.required],
            zip_code: ['', Validators.required],
            website: ['', Validators.required],
            degree: ['', Validators.required],
            course: ['', Validators.required],
            start: ['', Validators.required],
            end: ['', Validators.required]
        });
    }

    onDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    onSubmit(): void {
        if (this.educationForm.valid) {
            this.btnOpts.active = true;
            let data = this.educationForm.value;
            this.apiCommon.store(this.route, data).subscribe(
                (res) => {
                    if (res.response.status == 'success') {
                        this.toastr.success(res.response.message, "Success!", this.config);
                        this.educationForm.reset();
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
    }

    close() {
        this.dialogRef.close();
    }

}
