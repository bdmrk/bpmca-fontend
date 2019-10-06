import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiCommonService } from "../../../../../service/common/api-common.service";

@Component({
    selector: 'app-category-live-class-list',
    templateUrl: './category-live-class-list.component.html',
    styleUrls: ['./category-live-class-list.component.scss'],
})
export class CategoryLiveClassListComponent implements OnInit {

    navigation: any;
    public data: any;
    private route: any;

    constructor(
        private apiCommon: ApiCommonService,
    ) {
        this.route = 'live-class/live-classes'
    }

    ngOnInit() {
        this.apiCommon.get(this.route).subscribe((res) => {
            this.data = {
                category: {
                    id: 1,
                    name: 'Live Classes'
                },
                courses: res.data,
            }
        });
    }

}
