import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-free-youtube-course',
  templateUrl: './free-youtube-course.component.html',
  styleUrls: ['./free-youtube-course.component.scss']
})
export class FreeYoutubeCourseComponent implements OnInit {

  @Input() dataSource;
  @Input() limit;
  @Input() range;
  @Input() showFilter;

  throttle = 300;
  scrollDistance = 1;
  scrollUpDistance = 2;

  private total;
  public courseList = [];
  public showPlus;
  public showMinus;

  constructor() {
    this.showFilter = false;
    this.showPlus = true;
    this.showMinus = false;
   }

  ngOnInit() { 
    window.addEventListener('scroll', this.scroll, true);
    this.total = this.dataSource.length;

        if (this.total < this.range) {
            this.range = this.total;
            this.showPlus = false;
        }

        this.loadMore(this.range);
  }

  scroll = (): void => {
    const parent = this;
    setTimeout(function(){
        const itemNo = parent.range+parent.limit;
        parent.loadMore(itemNo);
    }, 1500);
    
  };

  loadMore(range) {

    if (range < this.total) {
        this.range = range;
    } else {
        this.range = this.total - 1;
    }

    this.courseList = this.dataSource.filter((item, index) => {
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

    this.courseList = this.dataSource.filter((item, index) => {
        return index <= this.range;
    });

    if (this.range < this.limit)
        this.showMinus = false;

    if (this.range < this.total)
        this.showPlus = true;

}

    loadAll(): void{
        this.courseList = this.dataSource;
        this.showPlus = false;
        this.showMinus = true;
    }

 

}