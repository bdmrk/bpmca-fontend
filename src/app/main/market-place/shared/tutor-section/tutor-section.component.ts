import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-tutor-section',
    templateUrl: './tutor-section.component.html',
    styleUrls: ['./tutor-section.component.scss']
})
export class TutorSectionComponent implements OnInit {

    @Input() tutors;
    @Input() category;

    public tutorList = [];
    public limit = 4;
    public count = 11;

    constructor() {
    }

    ngOnInit() {
        this.loadMore(this.count);
    }

    loadMore(count) {

        if (count < this.tutors.length) {
            this.count = count;
        }
        else {
            this.count = this.tutors.length - 1;
        }

        this.tutorList = this.tutors.filter((item, index) => {
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

        this.tutorList = this.tutors.filter((item, index) => {
            return index <= this.count;
        });

    }

}
