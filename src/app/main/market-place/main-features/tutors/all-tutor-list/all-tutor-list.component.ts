import {Component, OnInit} from '@angular/core';
import { ApiCommonService } from '../../../../../service/common/api-common.service';

@Component({
    selector: 'app-all-tutor-list',
    templateUrl: './all-tutor-list.component.html',
    styleUrls: ['./all-tutor-list.component.scss'],
})
export class AllTutorListComponent implements OnInit {

    navigation: any;
    public dataList;

    constructor(
        private apiCommon: ApiCommonService,
    ) {}

    ngOnInit() {

        this.apiCommon.get('public/tutors').subscribe(
            (res) => {
                this.dataList = res.data;
                console.log(this.dataList);
            }
        );

    }
}
