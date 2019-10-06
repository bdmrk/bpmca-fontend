import {Component, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators, FormGroupDirective} from '@angular/forms';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {MatProgressButtonOptions} from 'mat-progress-buttons';
// Services
import {ToastrService} from "ngx-toastr";
import {CommonService} from "../../../service/common/common.service";

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.scss'],
})

export class RegistrationComponent implements OnInit {
    
    @ViewChild('theForm') theForm:FormGroupDirective;
    // Button options
    btnOpts: MatProgressButtonOptions = {
        active: false,
        text: 'CREATE NEW ACCOUNT',
        spinnerSize: 19,
        raised: true,
        stroked: false,
        buttonColor: 'white',
        spinnerColor: 'white',
        fullWidth: true,
        disabled: false,
        mode: 'indeterminate',
    };

    registerForm: FormGroup;
    private config;
    private route: any;
    private _unsubscribeAll: Subject<any>;

    constructor(
        private _formBuilder: FormBuilder,
        private common: CommonService,
        private toastr: ToastrService
    ) {
        this.route = 'auth/register';

        this._unsubscribeAll = new Subject();

        this.config = {
            timeOut: 5000,
            closeButton: true,
            positionClass: 'toast-top-right',
            enableHtml: true,
        };
    }

    ngOnInit(): void {
        this.registerForm = this._formBuilder.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
            password_confirmation: ['', [Validators.required, confirmPasswordValidator]]
        });

        this.registerForm.get('password').valueChanges
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                this.registerForm.get('password_confirmation').updateValueAndValidity();
            });
    }

    onDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    onSubmit(): void {
        if (this.registerForm.valid) {
            this.btnOpts.active = true;
            const data = this.registerForm.value;
            this.common.store(this.route, data).subscribe(
                (res) => {
                    // const token = res.access_token;
                    // this.storage.clear();
                    // this.helper.saveAccessData(token);
                    this.btnOpts.active = false;
                    this.toastr.success(res.message, 'Success!', this.config);

                    this.theForm.resetForm();

                    
                },
                (res) => {
                    this.toastr.error(res.error.errors.email[0], 'Error!', this.config);
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
