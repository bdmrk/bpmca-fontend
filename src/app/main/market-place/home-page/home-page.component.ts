import { Component, OnInit } from '@angular/core';

// Services
import { ApiCommonService } from '../../../service/common/api-common.service';

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {

    navigation: any;
    public data = {
        courses: '',
        tutors: '',
        slides: '',
    };

    private homepageApiRoute = 'public/homepage';

    youtubeCourses = [];
    interactiveCourses = [];

    constructor(
        private apiCommon: ApiCommonService,
    ) {}

    ngOnInit() {

            this.apiCommon.get(this.homepageApiRoute).subscribe(
                (res) => {
                    res.data.courses.filter((val) => {
                        if (val.course_type === 2) {
                            this.youtubeCourses.push(val);
                        }
                        if (val.course_type === 4 || val.course_type === 5) {
                            this.interactiveCourses.push(val);
                        }
                    });
                    this.data.courses = res.data.courses;
                    this.data.tutors = res.data.tutors;
                }
            );
    }
}
