import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { DataCommunicationService } from "../../../../service/common/data-communication.service";
import { CartService } from "../../../../service/checkout/cart.service";
import { ToastrService } from "ngx-toastr";
import { Router } from '@angular/router';
import { HelperService } from '../../../../service/common/helper.service';
import { UtilityService } from '../../../../service/utility/utility.service';

@Component({
    selector: 'app-course-list',
    templateUrl: './course-list.component.html',
    styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit ,AfterViewInit {

    @Input() dataSource;
    @Input() title;
    @Input() limit;
    @Input() range;
    @Input() showFilter;
    @Input() redirect;
    @Input() scrolling;
    @Input() showAll;

    private total;
    public courseList = [];
    public showPlus;
    public showMinus;
    private config = {};
    private AWS_URL: String;
    public old_aws_url = 'https://s3-ap-southeast-1.amazonaws.com/edutube/';

    public checkLogin = false;

    constructor(
        private dataCommunicationService: DataCommunicationService,
        private cartService: CartService,
        private toastr: ToastrService,
        private helper: HelperService,
        private router: Router,
        private utility: UtilityService,
    ) {

        this.showFilter = false;
        this.showPlus = true;
        this.showMinus = false;
        this.config = {
            timeOut: 2000,
            closeButton: true,
            positionClass: 'toast-top-right',
            enableHtml: true,
          };
    }

    ngOnInit() {
        if (this.scrolling){
            window.addEventListener('scroll', this.scroll, true);
        }

        this.total = this.dataSource.length;

        if (this.total < this.range) {
            this.range = this.total;
            this.showPlus = false;
        }

        this.loadMore(this.range);

    // check user login 
     this.helper.isAuthorized() ? this.checkLogin = true : this.checkLogin = false;

     // AWS URL
     this.AWS_URL = this.utility.aws_s3_bucket_path();

    }

    scroll = (): void => {
        const parent = this;
        setTimeout(function(){
            const itemNo = parent.range + parent.limit;
            parent.loadMore(itemNo);
        }, 1500);
        
      };

    ngAfterViewInit() {
        window.scrollTo(0, 0);
     }
     onScroll(){
     }
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
    viewAll(): void{
        this.courseList = this.dataSource;
        if (this.courseList.length > 0){
            this.showPlus = false;
            this.showMinus = true;
        }
    }
    purchase(course) {

        const isItemExist = this.cartService.storeLocalData(course);

        if (isItemExist == 1){
            this.toastr.warning('This item is added in basket already!!!', 'Warning!', this.config);
        }
        else{
            this.dataCommunicationService.itemAddToCart();
            this.toastr.success('This item is added Successfully.', 'Success!', this.config);
        }
    }
    bookNow(course) {
        this.cartService.clearCartItems();
        this.cartService.storeLocalData(course);
        this.router.navigate(['/checkout']);
    }

}
