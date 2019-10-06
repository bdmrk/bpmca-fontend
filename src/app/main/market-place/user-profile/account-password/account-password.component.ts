import {Component, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {MatProgressButtonOptions} from 'mat-progress-buttons';
import {ActivatedRoute, Router} from '@angular/router';

import {ApiCommonService} from '../../../../service/common/api-common.service';
import {HelperService} from '../../../../service/common/helper.service';
import {StorageService} from '../../../../service/common/storage.service';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'app-account-password',
    templateUrl: './account-password.component.html',
    styleUrls: ['./account-password.component.scss'],
    providers: [
        ApiCommonService,
        HelperService,
        StorageService,
        ToastrService
    ]
})
export class AccountPasswordComponent implements OnInit {

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

    passwordChangeForm: FormGroup;
    private config;
    private route: any;
    private _unsubscribeAll: Subject<any>;
    public countries;
    public states;
    public cities;
    public relationships;
    public religions;

    constructor(
        private _formBuilder: FormBuilder,
        private apiCommon: ApiCommonService,
        private helper: HelperService,
        private storage: StorageService,
        private toastr: ToastrService,
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) {

        this.route = 'user-settings/password-change';

        this._unsubscribeAll = new Subject();

        this.config = {
            timeOut: 5000,
            closeButton: true,
            positionClass: 'toast-top-right',
            enableHtml: true,
        };
    }

    ngOnInit() {
        this.passwordChangeForm = this._formBuilder.group({
            old_password: ['', Validators.required],
            password: ['', Validators.required],
            password_confirmation: ['', Validators.required],
        });
    }

    onDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    onSubmit(): void {
        if (this.passwordChangeForm.valid) {

            this.btnOpts.active = true;
            let data = this.passwordChangeForm.value;

            this.apiCommon.store(this.route, data).subscribe(
                (res) => {

                    if (res.response.status == 'success') {

                        this.toastr.success(res.response.message, "Success!", this.config);
                        this.passwordChangeForm.reset();

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

}
