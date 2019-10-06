import { filter } from 'rxjs/operators';
import {Component, Input, OnInit} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

// Services
import {ToastrService} from "ngx-toastr";
import {ApiCommonService} from "../../../../service/common/api-common.service";
import {HelperService} from "../../../../service/common/helper.service";
import {StorageService} from "../../../../service/common/storage.service";
import {AddRatingComponent} from "./add-rating/add-rating.component";


@Component({
    selector: 'app-rating',
    templateUrl: './rating.component.html',
    styleUrls: ['./rating.component.scss'],
    providers: [
        ApiCommonService,
        HelperService,
        StorageService,
        ToastrService
    ]
})
export class RatingComponent implements OnInit {

    @Input() ratingRoute;
    @Input() dataSource;
    public route;
    public ratingData;
    public data;
    public ratingAvg = 0;

    constructor(
        private apiCommon: ApiCommonService,
        private dialog: MatDialog
    ) {
    }

    ngOnInit() {
        this.route = this.ratingRoute;
        this.data = this.dataSource;
        this.apiCommon.get(this.route).subscribe(
            (res) => {
                this.ratingData = res.data;   
                if (res.data.length > 0){
                    this.ratingAvg = ( res.data[0].rating_sum / res.data.length );          
                } 
            }
        );
    }

    ratingModal(data) {

        const dialogRef = this.dialog.open(AddRatingComponent, {
            width: '600px',
            data: {
                id: data,
                url: this.route
            },
        });
        dialogRef.afterClosed().subscribe(() => {
            this.ngOnInit();
        });
    }

}
