import { Component, OnInit, NgModule } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { MatProgressButtonOptions } from 'mat-progress-buttons';
import { ActivatedRoute, Router } from "@angular/router";

// Services
import { ToastrService } from "ngx-toastr";
import { CommonService } from "../../../service/common/common.service";
import { HelperService } from "../../../service/common/helper.service";
import { StorageService } from "../../../service/common/storage.service";
import { Route } from '@angular/compiler/src/core';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
@NgModule({
    declarations: [LoginComponent],
    imports: [],
})
export class LoginComponent implements OnInit {
    btnOpts: MatProgressButtonOptions = {
        active: false,
        text: 'LOGIN',
        spinnerSize: 19,
        raised: true,
        stroked: false,
        buttonColor: 'white',
        spinnerColor: 'white',
        fullWidth: true,
        disabled: false,
        mode: 'indeterminate',
    };
    redirectURL: any;
    loginForm: FormGroup;
    private config;
    private routelink: any;
    private socialAccessToken = '';

    constructor(
        private _formBuilder: FormBuilder,
        private common: CommonService,
        private helper: HelperService,
        private storage: StorageService,
        private toastr: ToastrService,
        private activatedRoute: ActivatedRoute,
        private route: ActivatedRoute,
        private router: Router,
    ) {

        this.routelink = 'auth/login';

        this.config = {
            timeOut: 3000,
            closeButton: true,
            positionClass: 'toast-top-right',
            enableHtml: true,
        };

        this.activatedRoute.queryParams.subscribe(params => {
            if (Object.keys(params).length) {
                if (params['status'] && params['message']) {
                    if (params['status'] == 'success') {
                        this.toastr.success(params['message'], 'Success!', this.config)
                    }

                    if (params['status'] == 'error') {
                        this.toastr.error(params['message'], 'Error!', this.config)
                    }
                }
            }
        });
    }
    ngOnInit(): void {
        this.socialAccessToken = location.search.split('token=')[1];
        if (this.socialAccessToken) {
            this.socialLoginRedirect();
        }
        this.loginForm = this._formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });

        let params = this.route.snapshot.queryParams;
        if (params['redirectURL']) {
            this.redirectURL = params['redirectURL'];
        }
    }

    onSubmit(): void {
        if (this.loginForm.valid) {
            this.btnOpts.active = true;
            let data = this.loginForm.value;
            this.common.store(this.routelink, data).subscribe(
                (res) => {
                    const token = res.access_token;
                    this.storage.clear();
                    this.helper.saveAccessData(token);
                    this.btnOpts.active = false;
                    // this.router.navigate(['/dashboard']);
                    const user = this.storage.getUserData();
                    if (this.redirectURL) {
                        window.location.href= this.redirectURL;
                    }
                    else if(user.type==3){
                        window.location.href = 'dashboard';
                    }
                    else{
                        //this.router.navigate(['/user-dashboard']);
                        window.location.href = 'user-dashboard';
                    }
                    
                    
                },
                (res) => {
                    this.toastr.error(res.error.message, 'Error!', this.config);
                    this.btnOpts.active = false;
                },
                () => {
                    this.btnOpts.active = false;
                }
            );
        }
    }
    socialLoginRedirect() {
        const token = this.socialAccessToken;
        this.storage.clear();
        this.helper.saveAccessData(token);
        window.location.href = '/dashboard/e-learning/manage/course';
    }
    socialLogin(type): void {
        let uri = 'auth/' + type;
        this.common.get(uri).subscribe(
            (res) => {
                window.location.href = res.providerRedirectUrl;
            },
            (res) => {
                this.toastr.error(res.error.message, 'Error!', this.config);
                this.btnOpts.active = false;
            },
            () => {
                this.btnOpts.active = false;
            }
        );
    }
}
