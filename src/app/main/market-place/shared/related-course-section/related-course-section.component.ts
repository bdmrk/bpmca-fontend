import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-related-course-section',
    templateUrl: './related-course-section.component.html',
    styleUrls: ['./related-course-section.component.scss']
})
export class RelatedCourseSectionComponent implements OnInit {

    @Input() courses: any;
    @Input() category: any;

    public courseList = [];
    public limit = 3;
    public count = 2;

    constructor() {
    }

    ngOnInit() {
        this.loadMore(this.count);
    }

    loadMore(count) {

        if (count < this.courses.length) {
            this.count = count;
        }
        else {
            this.count = this.courses.length - 1;
        }

        this.courseList = this.courses.filter((item, index) => {
            return index <= this.count;
        });

    }

    loadLess(count) {

        if (count < this.limit) {
            this.count = this.limit - 1;

        }
        else {
            this.count = count;
        }

        this.courseList = this.courses.filter((item, index) => {
            return index <= this.count;
        });

    }

}
