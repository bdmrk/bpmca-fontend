import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { MatProgressButtonOptions } from 'mat-progress-buttons';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiCommonService } from '../../../../service/common/api-common.service';
import { HelperService } from '../../../../service/common/helper.service';
import { StorageService } from '../../../../service/common/storage.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-general-information',
    templateUrl: './general-information.component.html',
    styleUrls: ['./general-information.component.scss'],
    providers: [
        ApiCommonService,
        HelperService,
        StorageService,
        ToastrService
    ]
})
export class GeneralInformationComponent implements OnInit {

    @Input() data;

    basic_info: any;

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

    generalInfo: FormGroup;
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

        this.route = 'user-settings/general-information';

        this._unsubscribeAll = new Subject();

        this.config = {
            timeOut: 5000,
            closeButton: true,
            positionClass: 'toast-top-right',
            enableHtml: true,
        };
    }

    ngOnInit() {
        this.basic_info = this.data;

        this.generalInfo = this._formBuilder.group({
            dob: ['', Validators.required],
            bio: [''],
            about: [''],
            address: [''],
            city: [''],
            phone:[''],
            state: [''],
            country: [''],
            zip_code: [''],
            relationship: [''],
            religion: ['']
        });

        this.generalInfo.setValue({
            dob: this.basic_info ? this.basic_info.dob : '',
            bio: this.basic_info ? this.basic_info.bio : '',
            about: this.basic_info ? this.basic_info.about : '',
            address: this.basic_info ? this.basic_info.address : '',
            phone: this.basic_info ? this.basic_info.phone : '',
            city: this.basic_info ? parseInt(this.basic_info.city.id) : '',
            state: this.basic_info ? parseInt(this.basic_info.state.id) : '',
            country: this.basic_info ? parseInt(this.basic_info.country.id) : '',
            zip_code: this.basic_info ? this.basic_info.zip_code : '',
            relationship: this.basic_info ? parseInt(this.basic_info.relationship.id) : '',
            religion: this.basic_info ? parseInt(this.basic_info.religion.id) : ''
        });

        this.apiCommon.get('necessary-data').subscribe(
            (res) => {
                this.countries = res.countries;
                this.states = res.states;
                this.cities = res.cities;
                this.relationships = res.relationships;
                this.religions = res.religions;
            }
        );

    }

    onDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    onSubmit(): void {
        if (this.generalInfo.valid) {
            this.btnOpts.active = true;
            let data = this.generalInfo.value;
            this.apiCommon.store(this.route, data).subscribe(
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
                    this.btnOpts.active = false;
                },
                () => {
                    this.btnOpts.active = false;
                }
            );
        }
    }

}
