import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ApiCommonService } from "../../../../../service/common/api-common.service";
import { UtilityService } from "../../../../../service/utility/utility.service";
import { Meta } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';
import { from } from 'rxjs';

@Component({
    selector: 'app-category-course-list',
    templateUrl: './category-course-list.component.html',
    styleUrls: ['./category-course-list.component.scss'],
})
export class CategoryCourseListComponent implements OnInit {

    navigation: any;
    public data;
    categoryId;
    subcategoryCourses = [];
    subcategoryCoursesDisplay = [];
    subcategoryCoursesMenu = [];
    subcategoryCoursesDisplayMobile = [];
    subcategoryCoursesMenuMobile = [];
    classInfo = {};
    courseMeta = {};

    selectedIndex;

    filterDisplayItemCount = 1;

    filterApplied = false;
    innerWidth: number;
    testBrowser: any;
    loaderStatus = false;

    constructor(
        private apiCommon: ApiCommonService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private meta: Meta,
        @Inject(PLATFORM_ID) platformId: string,
        private UtilService: UtilityService,
    ) {
        this.testBrowser = isPlatformBrowser(platformId);
        this.activatedRoute.params.subscribe(params => {
            this.categoryId = +params['category_slug'];
        });

        this.router.routeReuseStrategy.shouldReuseRoute = () => {
            return false;
        };
    }

    ngOnInit() {
        if (this.testBrowser) {
            this.innerWidth = window.innerWidth;

            if (this.innerWidth < 400) {
                this.filterDisplayItemCount = 1;
            }
            if (this.innerWidth > 400 && this.innerWidth <= 500) {
                this.filterDisplayItemCount = 2;
            }
            if (this.innerWidth > 500 && this.innerWidth <= 600) {
                this.filterDisplayItemCount = 3;
            }
            if (this.innerWidth > 600 && this.innerWidth <= 800) {
                this.filterDisplayItemCount = 4;
            }
            if (this.innerWidth > 800 && this.innerWidth <= 1100) {
                this.filterDisplayItemCount = 4;
            }
            if (this.innerWidth > 1100 && this.innerWidth <= 1200) {
                this.filterDisplayItemCount = 5;
            }
            if (this.innerWidth > 1200) {
                this.filterDisplayItemCount = 6;
            }
        }
        this.loaderStatus = true;
        this.apiCommon.get(`public/subcategory/filter/${this.categoryId}?content_type=1`).subscribe(
            (res) => {
                this.loaderStatus = false;
                this.subcategoryCourses = res.subjects;
                this.classInfo = res.class;
                this.subcategoryCoursesDisplay = this.subcategoryCourses.filter((item, index) => { return index < this.filterDisplayItemCount; });
                this.subcategoryCoursesMenu = this.subcategoryCourses.filter((item, index) => { return index >= this.filterDisplayItemCount })

                if (this.classInfo['meta_data']) {
                    let meta_data = JSON.parse(this.classInfo['meta_data']).filter(item => item.type == 1);
                    if (meta_data[0]) {
                        this.courseMeta = meta_data[0];
                    }
                }
                this.setMetaData();
                this.allCourses();
            }
        );




    }

    setMetaData() {
        if (this.courseMeta['image']) {
            let meta_data = this.courseMeta;
            console.log(meta_data);
            let html = this.courseMeta['description'] ? this.courseMeta['description'].replace(/<\/?[^>]+>/ig, "") : '';
            this.meta.updateTag({ property: 'og:image', content: this.courseMeta['image'] });
            this.meta.updateTag({ property: 'og:title', content: this.classInfo['name'] });
            this.meta.updateTag({ property: 'og:description', content: html });
            this.meta.updateTag({ property: 'og:url', content: this.router.url });
            this.meta.updateTag({ property: 'twitter:image', content: this.courseMeta['image'] });
            this.meta.updateTag({ property: 'twitter:title', content: this.classInfo['name'] });
            this.meta.updateTag({ property: 'twitter:description', content: html });
            this.meta.updateTag({ property: 'twitter:url', content: this.router.url });
        }
    }

    allCourses() {
        this.data = [];
        this.filterApplied = true;
        this.selectedIndex = "";
        this.loaderStatus = true;
        this.apiCommon.get(`public/category/${this.categoryId}/courses?content_type=${0}`).subscribe(
            (res) => {
                this.loaderStatus = false;
                this.data = res.data;
                if (res.data.courses.length > 0 && !this.courseMeta['image']) {
                    let meta_data = res.data.courses[0];
                    let image = this.UtilService.aws_s3_bucket_path() + meta_data.image;
                    let html = meta_data.description ? meta_data.description.replace(/<\/?[^>]+>/ig, "") : '';
                    this.courseMeta = {
                        'title': meta_data.title,
                        'description': html,
                        'image': image
                    };
                    this.setMetaData();
                }
            }
        );

    }

    getAllCourses(subCategoryId): void {
        this.data.courses = [];
        this.selectedIndex = subCategoryId;
        this.filterApplied = false;
        this.loaderStatus = true;
        this.apiCommon.get(`public/subcategory/courses/${this.categoryId}/${subCategoryId}`).subscribe(
            (res) => {
                this.loaderStatus = false;
                this.data.courses = res;
            }
        );
    }

}
