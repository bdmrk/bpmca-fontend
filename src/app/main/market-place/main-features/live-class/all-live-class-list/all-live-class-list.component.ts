import {Component, OnInit, ViewChild} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {ApiCommonService} from "../../../../../service/common/api-common.service";
import {HelperService} from "../../../../../service/common/helper.service";
import {StorageService} from "../../../../../service/common/storage.service";


@Component({
    selector: 'app-all-live-class-list',
    templateUrl: './all-live-class-list.component.html',
    styleUrls: ['./all-live-class-list.component.scss']
})
export class AllLiveClassListComponent implements OnInit {

    navigation: any;
    public course_data;

    constructor(
    ) {
    }

    ngOnInit() {
    }

}
