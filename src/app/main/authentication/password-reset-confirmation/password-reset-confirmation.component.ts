import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {MatProgressButtonOptions} from 'mat-progress-buttons';
import {ActivatedRoute, Router} from "@angular/router";

// Services
import {ToastrService} from "ngx-toastr";
import {CommonService} from "../../../service/common/common.service";
import {HelperService} from "../../../service/common/helper.service";
import {StorageService} from "../../../service/common/storage.service";

@Component({
    selector: 'app-password-reset-confirmation',
    templateUrl: './password-reset-confirmation.component.html',
    styleUrls: ['./password-reset-confirmation.component.scss'],
    providers: [
        CommonService,
        HelperService,
        StorageService,
        ToastrService
    ]
})
export class PasswordResetConfirmationComponent implements OnInit {

    // Button options
    btnOpts: MatProgressButtonOptions = {
        active: false,
        text: 'Submit',
        spinnerSize: 19,
        raised: true,
        stroked: false,
        buttonColor: 'white',
        spinnerColor: 'white',
        fullWidth: true,
        disabled: false,
        mode: 'indeterminate',
    };

    passwordResetConfirmForm: FormGroup;
    private config;
    private route: any;
    private email;
    private code;
    private _unsubscribeAll: Subject<any>;

    constructor(
        private _formBuilder: FormBuilder,
        private common: CommonService,
        private helper: HelperService,
        private storage: StorageService,
        private toastr: ToastrService,
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) {
        this.route = 'auth/password-reset-confirmation';

        this._unsubscribeAll = new Subject();

        this.config = {
            timeOut: 5000,
            closeButton: true,
            positionClass: 'toast-top-right',
            enableHtml: true,
        };

        this.activatedRoute.queryParams.subscribe(params => {
            if (Object.keys(params).length) {
                if (params['email'])
                {
                    this.email = params['email'];
                    this.code = '';
                    this.toastr.success('Confirmation code has been sent to your email.', 'Success!', this.config)
                }
            }
            else
            {
                this.router.navigate(['/password-reset']);
            }
        });
    }

    ngOnInit(): void {
        this.passwordResetConfirmForm = this._formBuilder.group({
            email: [this.email, [Validators.required]],
            code: [this.code, [Validators.required]],
        });
    }

    onDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    onSubmit(): void {
        if (this.passwordResetConfirmForm.valid) {
            this.btnOpts.active = true;
            let data = this.passwordResetConfirmForm.value;
            this.common.store(this.route, data).subscribe(
                (res) => {
                    this.storage.clear();
                    if (res.status) {
                        let data = res.data;
                        this.router.navigate(['/password-change'], {
                            queryParams: {
                                token: data.token
                            }
                        });
                    }
                    this.btnOpts.active = false;
                },
                (res) => {
                    this.toastr.error(res.error.message, "Error!", this.config);
                    this.btnOpts.active = false;
                },
                () => {
                    this.btnOpts.active = false;
                }
            );
        }
    }

}
