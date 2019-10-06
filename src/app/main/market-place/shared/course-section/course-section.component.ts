import {Component, Input, OnInit} from '@angular/core';
import {DataCommunicationService} from "../../../../service/common/data-communication.service";
import {CartService} from "../../../../service/checkout/cart.service";

@Component({
  selector: 'app-course-section',
  templateUrl: './course-section.component.html',
  styleUrls: ['./course-section.component.scss']
})
export class CourseSectionComponent implements OnInit {

    @Input() courses: any;
    @Input() category: any;

    public courseList = [];
    public limit = 4;
    public count = 11;

    constructor(
        private dataCommunicationService: DataCommunicationService,
        private cartService: CartService,
        ) {
    }

    ngOnInit() {
        this.loadMore(this.count);
    }

    loadMore(count) {

        if (count < this.courses.length)
        {
            this.count = count;
        }
        else
        {
            this.count = this.courses.length - 1;
        }

        this.courseList = this.courses.filter((item, index) => {
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

        this.courseList = this.courses.filter((item, index) => {
            return index <= this.count;
        });

    }
    purchase(itemId) {
        const itemData = {id: 1, discountId: 1, couponId: 1}
        this.cartService.storeLocalData(itemData);
        this.dataCommunicationService.itemAddToCart();
    }

}
