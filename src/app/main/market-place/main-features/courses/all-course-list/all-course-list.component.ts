import {Component, OnInit} from '@angular/core';

// Services
import {ApiCommonService} from "../../../../../service/common/api-common.service";
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'app-all-course-list',
    templateUrl: './all-course-list.component.html',
    styleUrls: ['./all-course-list.component.scss']
})
export class AllCourseListComponent implements OnInit {

    navigation: any;
    public dataList;
    public free_youtube_courses = [];

    constructor(
        private apiCommon: ApiCommonService,
        public sanitizer: DomSanitizer
    ) {
       
    }

    ngOnInit() {

        this.apiCommon.get('public/courses?content_type=' + 0).subscribe(
            (res) => {
                this.dataList = res;
            }
        );

        this.apiCommon.get('public/courses/create').subscribe(
            (res) => {
                res.oldData.map( (value) => {
                    this.free_youtube_courses.push({
                      url: this.sanitizer.bypassSecurityTrustResourceUrl(value.url),
                      title: value.course.title,
                      author_name: value.user.name,
                      author_id: value.user.id,
                    });
                  });
            }
        );

    }

}
