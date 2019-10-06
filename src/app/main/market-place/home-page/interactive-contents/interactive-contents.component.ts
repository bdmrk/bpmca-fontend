import { Component, OnInit, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DataCommunicationService } from '../../../../service/common/data-communication.service';
import { CartService } from '../../../../service/checkout/cart.service';

@Component({
  selector: 'app-interactive-contents',
  templateUrl: './interactive-contents.component.html',
  styleUrls: ['./interactive-contents.component.scss']
})
export class InteractiveContentsComponent implements OnInit {

  @Input() courses: any;

  public courseList = [];
  public limit = 4;
  public count = this.limit - 1;
  public config;

  constructor(
      private dataCommunicationService: DataCommunicationService,
      private cartService: CartService,
      private toastr: ToastrService,
      ) {
          this.config = {
              timeOut: 3000,
              closeButton: true,
              positionClass: 'toast-top-right',
              enableHtml: true,
          };
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
      // this.cartService.storeLocalData(itemData);
      // this.dataCommunicationService.itemAddToCart();
      const item = this.cartService.storeLocalData(itemData);
      if (item > 0) {
          this.toastr.warning('This itemm is added already.', 'Info!', this.config);
      }
      else {
          this.dataCommunicationService.itemAddToCart();
      }
  }

}
