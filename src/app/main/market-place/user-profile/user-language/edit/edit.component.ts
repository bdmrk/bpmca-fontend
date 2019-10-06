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
    selector: 'app-edit',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.scss'],
   
    providers: [
        ApiCommonService,
        HelperService,
        StorageService,
        ToastrService
    ]
})
export class EditComponent implements OnInit {

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

    languageForm: FormGroup;
    private config;
    private route: any;
    private _unsubscribeAll: Subject<any>;
    public languages;

    constructor(
        private _formBuilder: FormBuilder,
        private apiCommon: ApiCommonService,
        private helper: HelperService,
        private storage: StorageService,
        private toastr: ToastrService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        public dialogRef: MatDialogRef<EditComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
    ) {
      

        this.route = `user-settings/language/${this.data.item.id}`;

        this._unsubscribeAll = new Subject();

        this.config = {
            timeOut: 5000,
            closeButton: true,
            positionClass: 'toast-top-right',
            enableHtml: true,
        };
    }

    ngOnInit() {

       // console.log(this.data.item);

        this.languageForm = this._formBuilder.group({
            language_id: ['', Validators.required],
            proficiency: ['', Validators.required]
        });

        this.apiCommon.get('necessary-data').subscribe(
            (res) => {
                this.languages = res.languages;
            }
        );

        this.languageForm.setValue({
            language_id: parseInt(this.data.item.language.id),
            proficiency: this.data.item.proficiency,
        });
    }

    onDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    onSubmit(): void {
        if (this.languageForm.valid) {
            this.btnOpts.active = true;
            let data = this.languageForm.value;
            this.apiCommon.update(this.route, data).subscribe(
                (res) => {
                    if (res.response.status == 'success') {
                        this.toastr.success(res.response.message, "Success!", this.config);
                        this.languageForm.reset();
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
