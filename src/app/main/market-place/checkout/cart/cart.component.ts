import { Component, OnInit } from '@angular/core';
import { CartService, setLocalData, getLocalData } from "../../../../service/checkout/cart.service";
import { UtilityService } from "../../../../service/utility/utility.service";
import { DataCommunicationService } from "../../../../service/common/data-communication.service";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { RouterExtServiceService } from '../../../../service/common/router-ext-service.service';
import { ApiCommonService } from '../../../../service/common/api-common.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  public data;
  public courseList = [];
  private config = {};
  public cartItems = [];
  public totalPrice = 0;
  public awsS3Path;
  previousUrl: any;
  referrer: string;
  constructor(
    private routerService: RouterExtServiceService,
    private cartService: CartService,
    private dataCommunicationService: DataCommunicationService,
    private router: Router,
    private toastr: ToastrService,
    private utility: UtilityService,
    private apiCommon: ApiCommonService,
  ) {
    this.config = {
      timeOut: 5000,
      closeButton: true,
      positionClass: 'toast-top-right',
      enableHtml: true,
    };
  }

  ngOnInit() {
     this.referrer = this.routerService.getPreviousUrl();

    this.cartItems = getLocalData();
    const data = {
      orderItem: this.cartItems,
    };

    if (this.cartItems) {
      this.apiCommon.store('public/related-course', data).subscribe(
        (res) => {
          this.courseList = res.data;

        },
        (err) => {
         // console.log(err);
        }
      );
    }
    this.awsS3Path = this.utility.aws_s3_bucket_path();

    //this.cartItems = this.cartService.courseList;
    this.getTotalPrice();


    this.apiCommon.get(`public/course/3`).subscribe(
      (res) => {
        this.data = res.data;

      }
    );
  }
  getTotalPrice() {
    this.totalPrice = 0;
    if (this.cartItems && this.cartItems.length > 0) {
      this.cartItems.map(item => {
        this.totalPrice += parseFloat(item.price.amount);
      });
    }
  }
  removeItem(itemIndex) {
    this.cartItems = this.cartItems.filter((item, index) => {
      return itemIndex !== index;
    });
    this.getTotalPrice();
    setLocalData(this.cartItems);
    this.dataCommunicationService.itemAddToCart();
  }
  cancelOrder() {
    this.cartItems = [];
    this.cartService.clearCartItems();
    this.getTotalPrice();
    this.dataCommunicationService.itemAddToCart();
  }

  goCheckout() {
    if (this.cartItems && this.cartItems.length > 0) {
      this.router.navigate(['checkout']);
    }
    else {
      this.toastr.warning("Cart is empty!!!", "Warning!", this.config);
      return false;
    }
  }

  keepPurchage(){
    if(this.referrer){
      this.router.navigate([this.referrer]);
    }
    else{
      this.router.navigate(['/']);
    }
  }
}
