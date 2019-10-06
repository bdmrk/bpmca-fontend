import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { MatProgressButtonOptions } from 'mat-progress-buttons';
import { ToastrService } from 'ngx-toastr';
import { HelperService } from '../../../../../../service/common/helper.service';
import { ApiCommonService } from '../../../../../../service/common/api-common.service';

@Component({
  selector: 'app-course-review',
  templateUrl: './course-review.component.html',
  styleUrls: ['./course-review.component.scss']
})
export class CourseReviewComponent implements OnInit {
  showReview: boolean=false;
  ratingRoute: string;
  @Input() courseId;
  public id;
  public ratingData;
  ratingForm: any;

  // Button options
  btnOpts: MatProgressButtonOptions = {
    active: false,
    text: 'Submit',
    spinnerSize: 19,
    raised: true,
    stroked: false,
    buttonColor: 'white',
    spinnerColor: 'white',
    fullWidth: false,
    disabled: false,
    mode: 'indeterminate',
};
  config:any;
  route: any;
  checkLogin:boolean;
  constructor(
    private router:Router,
    private helper: HelperService,
    private apiCommon: ApiCommonService,
    private activatedRoute:ActivatedRoute,
    private _formBuilder:FormBuilder,
    private toastr: ToastrService
    ) {
      this.activatedRoute.params.subscribe(params => {
        this.courseId = +params['slug'];
      });

      this.config = {
        timeOut: 5000,
        closeButton: true,
        positionClass: 'toast-top-right',
        enableHtml: true,
    };
   }

  

  ngOnInit() {
    this.helper.isAuthorized() ? this.checkLogin = true : this.checkLogin = false;
  

    this.ratingForm = this._formBuilder.group({
      rating: ['1', Validators.required],
      comment: ['', Validators.required]
  });

    this.ratingRoute = `public/course/${this.courseId}/rating`;


   this.apiCommon.get(this.ratingRoute).subscribe(
     (res)=>{
      this.ratingData = res.data;
     },
     (err)=>{

     }
   )
    
  }
  openReview() {
    this.showReview=!this.showReview;
  }

  close() {
    this.showReview=!this.showReview;
  }
  
onSubmit(){
  if (!this.checkLogin){
    this.toastr.error('Please login first to add a review', 'Error!', this.config);
    this.router.navigate(['login'], { queryParams: { 'redirectURL': '/course/' + this.courseId } });
  }
  else{

  if (this.ratingForm.valid) {
      this.btnOpts.active = true;
      let data = this.ratingForm.value;
      this.apiCommon.store(this.ratingRoute, data).subscribe(
          (res) => {
              this.btnOpts.active = false;
              if (res.response.status == 'success') {
                  this.toastr.success(res.response.message, "Success!", this.config);
                  
                  this.apiCommon.get(this.ratingRoute).subscribe(
                    (res)=>{
                     this.ratingData = res.data;
                     this.showReview=!this.showReview;
                    },
                    (err)=>{
               
                    }
                  )
              } else if (res.response.status == 'error') {
                  this.toastr.error(res.response.message, "Error!", this.config);
              }
          },
          (res) => {
              if (res.error.message) {
                  this.toastr.error(res.error.message, "Error!", this.config);
              }
              if (res.error.response) {
                  this.toastr.error(res.error.response.message, "Error!", this.config);
              }
              this.btnOpts.active = false;
          },
          () => {
              this.btnOpts.active = false;
          }
      );
  }
  else{
      // console.log(this.ratingForm.value);
  }
}
}

}
