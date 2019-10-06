import {
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router, NavigationStart, RoutesRecognized } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatProgressButtonOptions } from 'mat-progress-buttons';
import { ToastrService } from "ngx-toastr";
import { CartService, setLocalData, getLocalData } from "../../../../service/checkout/cart.service";
import { DataCommunicationService } from "../../../../service/common/data-communication.service";
import { ApiCommonService } from "../../../../service/common/api-common.service";
import { MatStepper } from '@angular/material';
import { HelperService } from '../../../../service/common/helper.service';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  previousUrl(arg0: string, previousUrl: any) {
    throw new Error("Method not implemented.");
  }
  btnOpts: MatProgressButtonOptions = {
    active: false,
    text: 'Place Order',
    spinnerSize: 19,
    raised: true,
    stroked: false,
    buttonColor: 'white',
    spinnerColor: 'white',
    fullWidth: true,
    disabled: false,
    mode: 'indeterminate',
  };
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  isEditable = false;
  @ViewChild('stepper') stepper: MatStepper;
  private config;
  public cartItems = [];
  public totalPrice = 0;
  public transactionResponseData = {};
  private routeApi = 'order/place-order';
  public transactionId;
  navigation: any;
  checked = false;
  indeterminate = false;
  labelPosition = 'after';
  disabled = false;
  public courseList=[];

  public checkLogin = false;
  public butNow = false;
  constructor(
    private cartService: CartService,
    private dataCommunicationService: DataCommunicationService,
    private commonService: ApiCommonService,
    private _formBuilder: FormBuilder,
    private toastr: ToastrService,
    private helper: HelperService,
    private router: Router,
  ) {
   
    this.config = {
      timeOut: 5000,
      closeButton: true,
      positionClass: 'toast-top-right',
      enableHtml: true,
    };
  }


  ngOnInit() {
    
    
    this.cartItems = getLocalData();
    const data = {
      orderItem:  this.cartItems, 
    };
    
    if(this.cartItems){
    this.commonService.store('public/related-course',data).subscribe(
      (res)=>{
       this.courseList = res.data;

      },
      (err)=>{
        console.log(err);
      }
    );
    }
  
    this.transactionId = location.search.split('trxId=')[1];
    if (this.transactionId) {
      this.stepper.selectedIndex = 1;
      this.getTransaction(this.transactionId);
    }
    this.firstFormGroup = this._formBuilder.group({
      cardName: ['Alam', Validators.required],
      cardNo: ['12345678963215478', Validators.required],
      expireOn: ['12/20', Validators.required],
      cvcNo: ['854', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    
    this.getTotalPrice();

    // check login user
    this.helper.isAuthorized() ? this.checkLogin = true : this.checkLogin = false;
  }

  getTotalPrice() {
    this.totalPrice = 0;
    this.cartItems.map(item => {
      this.totalPrice += parseFloat(item.price.amount);
    });
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
    this.totalPrice = 0;
    this.cartService.clearCartItems();
    this.getTotalPrice();
    this.dataCommunicationService.itemAddToCart();
  }
  agreeTermConditoin(status){
    this.disabled = status;

  }
  placeOrder() {

    if (!this.checkLogin){
      this.router.navigate(['/login']);
      return false;
    }

    const orderItems = getLocalData();
    if (orderItems == null){
      this.toastr.warning('Cart is empty!!!', 'Warning!', this.config);
      return false;
    }
    if (!this.disabled){
      this.toastr.warning('Please agree terms and conditions', 'Warning!', this.config);
      return false;
    }
    const data = {
      cardData: this.firstFormGroup.value,
      orderItem: orderItems,
      itemCount: this.cartService.countCartItem(),
      totalPrice: this.totalPrice,
    };
    
    this.btnOpts.active = true;
    this.commonService.store(this.routeApi, data).subscribe(
      (res) => {
        this.stepper.selectedIndex = 1;
        this.btnOpts.active = false;
        this.toastr.success(res.message, 'Success!', this.config);
        this.cartService.clearCartItems();
        window.location.href = res.gatewayPageURL;
      },
      (res) => {
        this.btnOpts.active = false;
        this.toastr.error(res.error.message, 'Error!', this.config);
      },
    );
  }

  getTransaction(transactionId) {
    const api = 'order/get-transaction/' + transactionId;
    this.cancelOrder();
    this.commonService.get(api).subscribe(
      (res) => {
        //this.stepper.selectedIndex = 1;
        this.transactionResponseData = res;
      },
      (res) => {
        this.toastr.error(res.error.message, "Error!", this.config);
      },
    );
  }

}