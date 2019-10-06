import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-tutor-list',
    templateUrl: './tutor-list.component.html',
    styleUrls: ['./tutor-list.component.scss']
})
export class TutorListComponent implements OnInit {

    @Input() dataSource;
    @Input() title;
    @Input() limit;
    @Input() range;
    @Input() showFilter;

    public total;
    public tutorList = [];
    public showPlus;
    public showMinus;

    constructor() {

        this.showFilter = false;
        this.showPlus = true;
        this.showMinus = false;

    }

    ngOnInit() {
    //    console.log(this.dataSource);
        this.tutorList=this.dataSource;
        this.total = this.dataSource.length;

        if (this.total < this.range) {
            this.range = this.total;
            this.showPlus = false;
        }

        this.loadMore(this.range);
        
    }

    loadMore(range) {

        if (range < this.total) {
            this.range = range;
        } else {
            this.range = this.total - 1;
        }

        this.tutorList = this.dataSource.filter((item, index) => {
            return index <= this.range;
        });

        if (this.range >= this.total - 1)
            this.showPlus = false;

        if (this.range >= this.limit)
            this.showMinus = true;
    }

    loadLess(range) {

        if (range < this.limit) {
            this.range = this.limit - 1;
        } else {
            this.range = range;
        }

        this.tutorList = this.dataSource.filter((item, index) => {
            return index <= this.range;
        });

        if (this.range < this.limit)
            this.showMinus = false;

        if (this.range < this.total)
            this.showPlus = true;

    }

}
