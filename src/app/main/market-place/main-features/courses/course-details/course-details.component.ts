import { FormBuilder } from '@angular/forms';
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DOCUMENT, Meta, DomSanitizer } from '@angular/platform-browser';
// Services
import { MatProgressButtonOptions } from 'mat-progress-buttons';
import { MatDialog } from '@angular/material';
import { ApiCommonService } from '../../../../../service/common/api-common.service';
import { isPlatformBrowser } from '@angular/common';
import { $ } from 'protractor';
import { DataCommunicationService } from '../../../../../service/common/data-communication.service';


@Component({
    selector: 'app-course-details',
    templateUrl: './course-details.component.html',
    styleUrls: ['./course-details.component.scss'],
})
export class CourseDetailsComponent implements OnInit {

    public data;
    public courseId;
    public innerWidth: any;
    public mobileDetected = false;

    // Button options
    btnOpts: MatProgressButtonOptions = {
        active: false,
        text: 'Enroll Now',
        spinnerSize: 20,
        raised: true,
        stroked: false,
        buttonColor: 'accent',
        spinnerColor: 'white',
        fullWidth: true,
        disabled: false,
        mode: 'indeterminate',
    };
    testBrowser: any;

    constructor(
        private apiCommon: ApiCommonService,
        private dataService:DataCommunicationService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        public dialog: MatDialog,
        @Inject(DOCUMENT) private document: Document,
        private fb: FormBuilder,
        private meta: Meta,
        @Inject(PLATFORM_ID) platformId: string,
        private sanitizer: DomSanitizer
    ) {
        this.testBrowser = isPlatformBrowser(platformId);
        this.activatedRoute.params.subscribe(params => {
            this.courseId = +params['slug'];
        });

        this.activatedRoute.params.subscribe(params => {
            this.courseId = +params['slug'];
        });

        this.router.routeReuseStrategy.shouldReuseRoute = function () {
            return false;
        };
        if (!this.testBrowser) {
            this.createMetatag();
        }
    }

    ngOnInit() {
        if (this.testBrowser) {
            this.apiCommon.get(`public/course/${this.courseId}`).subscribe(
                (res) => {
                    this.data = res.data;
                   console.log(this.data);
                    let image = "https://s3-ap-southeast-1.amazonaws.com/edutubebd/" + res.data.image;
                    let html = res.data.description ? res.data.description.replace(/<\/?[^>]+>/ig, "") : '';
                    this.meta.updateTag({ property: 'og:image', content: image });
                    this.meta.updateTag({ property: 'og:title', content: res.data.title });
                    this.meta.updateTag({ property: 'og:description', content: html });
                    this.meta.updateTag({ property: 'og:url', content: this.router.url });

                    this.meta.updateTag({ property: 'twitter:image', content: image });
                    this.meta.updateTag({ property: 'twitter:title', content: res.data.title });
                    this.meta.updateTag({ property: 'twitter:description', content: html });
                    this.meta.updateTag({ property: 'twitter:url', content: this.router.url });
                }
            );

            if (this.testBrowser) {
                this.innerWidth = window.innerWidth;
            }

            this.mobileDetection();
        }
    }
    createMetatag() {
        this.apiCommon.get(`public/course/${this.courseId}/meta-tag`).subscribe(
            (res) => {
                let image = "https://s3-ap-southeast-1.amazonaws.com/edutubebd/" + res.data.image;
                let html = res.data.description ? res.data.description.replace(/<\/?[^>]+>/ig, "") : '';
                this.meta.updateTag({ property: 'og:image', content: image });
                this.meta.updateTag({ property: 'og:title', content: res.data.title });
                this.meta.updateTag({ property: 'og:description', content: html });
                this.meta.updateTag({ property: 'og:url', content: this.router.url });

                this.meta.updateTag({ property: 'twitter:image', content: image });
                this.meta.updateTag({ property: 'twitter:title', content: res.data.title });
                this.meta.updateTag({ property: 'twitter:description', content: html });
                this.meta.updateTag({ property: 'twitter:url', content: this.router.url });
            }
        );
    }
    
    mobileDetection() {
        if (this.innerWidth <= 576) {
            this.mobileDetected = true;
        }
    }
    gotomcq(){

        let slugArray = {
            class_id: this.data.course_category_id,
            subject_id: this.data.course_subcategory_id,
            chapter_no: this.data.chapter_no,
            lesson_no: this.data.lesson_no,
            subject: this.data.course_category,
            class: this.data.course_subcategory,
            name: this.data.title
        }

        this.dataService.setPassedItemData(slugArray);

        this.router.navigate([`/mcq/mcq-details`]);
    }
    gotoAllMcq(){

        this.dataService.setPassedItemData({
            courseId: this.data.course_category_id,
            subject_id: this.data.course_subcategory_id
        });

        this.router.navigate([`/mcq/${this.data.course_category_id}`]);
    }
    gotomcqTest(){

        this.dataService.setPassedItemData({
            courseId: this.data.course_category_id,
            subject_id: this.data.course_subcategory_id
        });
        this.router.navigate([`/mcq-test/${this.data.course_category_id}`]);
    }
    gotobq(){

        this.dataService.setPassedItemData({
            courseId: this.data.course_category_id,
            subject_id: this.data.course_subcategory_id
        });
        this.router.navigate([`/bq/${this.data.course_category_id}`]);
    }

}
