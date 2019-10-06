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
    selector: 'app-password-reset',
    templateUrl: './password-reset.component.html',
    styleUrls: ['./password-reset.component.scss'],
})

export class PasswordResetComponent implements OnInit {

    // Button options
    btnOpts: MatProgressButtonOptions = {
        active: false,
        text: 'RECOVER NOW',
        spinnerSize: 19,
        raised: true,
        stroked: false,
        buttonColor: 'white',
        spinnerColor: 'white',
        fullWidth: true,
        disabled: false,
        mode: 'indeterminate',
    };
    forgotPasswordForm: FormGroup;
    private config;
    private route: any;
    private email;
    private code;
    private _unsubscribeAll: Subject<any>;

    constructor(
        private _formBuilder: FormBuilder,
        private common: CommonService,
        private storage: StorageService,
        private toastr: ToastrService,
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) {
        this.route = 'auth/password-reset-request';

        this._unsubscribeAll = new Subject();

        this.config = {
            timeOut: 5000,
            closeButton: true,
            positionClass: 'toast-top-right',
            enableHtml: true,
        };

        this.activatedRoute.queryParams.subscribe(params => {
            if (Object.keys(params).length) {
                if (params['email'] && params['code']) {
                    this.email = params['email'];
                    this.code = params['code'];
                }
            }
        });
    }

    ngOnInit(): void {
        this.forgotPasswordForm = this._formBuilder.group({
            email: ['', [Validators.required, Validators.email]]
        });
    }

    onDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    onSubmit(): void {
        if (this.forgotPasswordForm.valid) {
            this.btnOpts.active = true;
            let data = this.forgotPasswordForm.value;
            this.common.store(this.route, data).subscribe(
                (res) => {
                    this.storage.clear();
                    if (res.status) {
                        let data = res.data;
                        this.router.navigate(['/password-reset-confirmation'], {
                            queryParams: {
                                email: data.email
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
