import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-tutor-area',
    templateUrl: './tutor-area.component.html',
    styleUrls: ['./tutor-area.component.scss']
})
export class TutorAreaComponent implements OnInit {

    @Input() tutors: any;

    public tutorList = [];
    public limit = 4;
    public count = this.limit - 1;

    constructor() {
    }

    ngOnInit() {
        this.loadMore(this.count);
    }

    loadMore(count) {

        if (count < this.tutors.length)
        {
            this.count = count;
        }
        else
        {
            this.count = this.tutors.length - 1;
        }

        this.tutorList = this.tutors.filter((item, index) => {
            return index <= this.count;
        });
    }

    loadLess(count) {

        if (count < this.limit)
        {
            this.count = this.limit - 1;

        }
        else
        {
            this.count = count;
        }

        this.tutorList = this.tutors.filter((item, index) => {
            return index <= this.count;
        });

    }

}
