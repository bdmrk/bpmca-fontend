import {Component, OnInit, ViewChild} from '@angular/core';
import {Subject} from 'rxjs';
import {ActivatedRoute, Router} from "@angular/router";
import { ApiCommonService } from '../../../../../service/common/api-common.service';

@Component({
    selector: 'app-tutor-details',
    templateUrl: './tutor-details.component.html',
    styleUrls: ['./tutor-details.component.scss']
})
export class TutorDetailsComponent implements OnInit {

    public data;
    private tutorId;
    public itemCount = 0;
    public config;
    public pageId;
    public ratingRoute;

    public currentUrl = "http://edutubebd.com/tutor/";
    public user_data = [];

    constructor(
        private apiCommon: ApiCommonService,
        private activatedRoute: ActivatedRoute,
    ) {
        this.config = {
            timeOut: 3000,
            closeButton: true,
            positionClass: 'toast-top-right',
            enableHtml: true,
        };

        this.activatedRoute.params.subscribe(params => {
            this.tutorId = +params['slug'];
        });

        this.pageId = 'tutor/' + this.tutorId;
        this.currentUrl = this.currentUrl + this.tutorId;
        this.ratingRoute = `public/user/${ this.tutorId }/rating`;
    }

    ngOnInit() {
        this.apiCommon.get(`public/tutor/${this.tutorId}`).subscribe(
            (res) => {
                
                this.data = res.data;
               // console.log(this.data);
            }
        );
    }

}
