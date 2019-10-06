import {Component, OnInit, ViewChild,Input} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {MatProgressButtonOptions} from 'mat-progress-buttons';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

// Services
import {ToastrService} from 'ngx-toastr';
import {ApiCommonService} from '../../../../service/common/api-common.service';
import {HelperService} from '../../../../service/common/helper.service';
import {StorageService} from '../../../../service/common/storage.service' ;

import {AddComponent} from './add/add.component';
import {EditComponent} from './edit/edit.component';
import {DeleteComponent} from './delete/delete.component';


@Component({
    selector: 'app-user-language',
    templateUrl: './user-language.component.html',
    styleUrls: ['./user-language.component.scss'],
    providers: [
        ApiCommonService,
        HelperService,
        StorageService,
        ToastrService
    ]
})
export class UserLanguageComponent implements OnInit {

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    @Input() data;
    lang_data:any;

    displayedColumns: string[] = ['id', 'language', 'proficiency', 'action'];
    dataSource: MatTableDataSource<any>;

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

    cityForm: FormGroup;
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
        private dialog: MatDialog
    ) {

        this.route = 'user-settings/language';

        this._unsubscribeAll = new Subject();

        this.config = {
            timeOut: 5000,
            closeButton: true,
            positionClass: 'toast-top-right',
            enableHtml: true,
        };
    }

    ngOnInit() {
        this.lang_data = this.data;
        this.dataSource = new MatTableDataSource(this.lang_data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        // this.apiCommon.get(this.route).subscribe(
        //     (res) => {
        //         this.dataSource = new MatTableDataSource(res.data);
        //         this.dataSource.paginator = this.paginator;
        //         this.dataSource.sort = this.sort;
        //     },
        //     (res) => {

        //     },
        //     () => {

        //     }
        // );
    }

    onDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    add() {

        const dialogRef = this.dialog.open(AddComponent, {
            width: '700px'
        });

        dialogRef.afterClosed().subscribe(() => {
            this.ngOnInit();
        });

    }

    edit(data) {

        const dialogRef = this.dialog.open(EditComponent, {
            width: '700px',
            data: {item: data},
        });

        dialogRef.afterClosed().subscribe(() => {
            this.ngOnInit();
        });

    }

    delete(id) {

        const dialogRef = this.dialog.open(DeleteComponent, {
            width: '400px',
            data: {id: id},
        });

        dialogRef.afterClosed().subscribe(() => {
            this.ngOnInit();
        });
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

}
