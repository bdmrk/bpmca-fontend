import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {MatProgressButtonOptions} from 'mat-progress-buttons';
import {ActivatedRoute, Router} from "@angular/router";

// Services
import {ToastrService} from "ngx-toastr";
import {CommonService} from "../../../service/common/common.service";
import {HelperService} from "../../../service/common/helper.service";
import {StorageService} from "../../../service/common/storage.service";
import {takeUntil} from "rxjs/operators";

@Component({
    selector: 'app-password-change',
    templateUrl: './password-change.component.html',
    styleUrls: ['./password-change.component.scss'],
})
export class PasswordChangeComponent implements OnInit {

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

    passwordChangeForm: FormGroup;
    private config;
    private route: any;
    private token;
    private _unsubscribeAll: Subject<any>;

    constructor(
        private _formBuilder: FormBuilder,
        private common: CommonService,
        private storage: StorageService,
        private toastr: ToastrService,
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) {
        this.route = 'auth/password-change';

        this._unsubscribeAll = new Subject();

        this.config = {
            timeOut: 5000,
            closeButton: true,
            positionClass: 'toast-top-right',
            enableHtml: true,
        };

        this.activatedRoute.queryParams.subscribe(params => {
            if (Object.keys(params).length) {
                if (params['token']) {
                    this.token = params['token'];
                }
                else
                {
                    this.token = '';
                }
            }
        });
    }

    ngOnInit(): void {
        this.passwordChangeForm = this._formBuilder.group({
            token: [this.token],
            password: ['', [Validators.required,Validators.minLength(6)]],
            password_confirmation: ['', [Validators.required, confirmPasswordValidator]]
        });

        this.passwordChangeForm.get('password').valueChanges
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                this.passwordChangeForm.get('password_confirmation').updateValueAndValidity();
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
            this.common.store(this.route, data).subscribe(
                (res) => {
                    this.storage.clear();
                    if (res.status) {
                        let data = res.data;
                        this.router.navigate(['/login']);
                        this.toastr.success(res.message, "Success!", this.config);
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

export const confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {

    if (!control.parent || !control) {
        return null;
    }

    const password = control.parent.get('password');
    const password_confirmation = control.parent.get('password_confirmation');

    if (!password || !password_confirmation) {
        return null;
    }

    if (password_confirmation.value === '') {
        return null;
    }

    if (password.value === password_confirmation.value) {
        return null;
    }

    return {'passwordsNotMatching': true};

};
