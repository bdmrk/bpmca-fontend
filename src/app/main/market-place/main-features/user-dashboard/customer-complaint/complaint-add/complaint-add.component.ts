import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatProgressButtonOptions } from 'mat-progress-buttons';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiCommonService } from '../../../../../../service/common/api-common.service';

@Component({
  selector: 'app-complaint-add',
  templateUrl: './complaint-add.component.html',
  styleUrls: ['./complaint-add.component.scss']
})
export class ComplaintAddComponent implements OnInit {

  @ViewChild('clearValue') clearValue: ElementRef;
  
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
  private config;
  complainForm: FormGroup;
  complainCategories:any;
  file:any;
  public progressBar = false;

  constructor( private _formBuilder: FormBuilder, private router: Router,private apicommon: ApiCommonService, private toastr: ToastrService) {

    this.config = {
      timeOut: 5000,
      closeButton: true,
      positionClass: 'toast-top-right',
      enableHtml: true,
  };
   }

  ngOnInit() {
    // this.complainCategories =
     this.apicommon.get('get-complain-category').subscribe(
       (res)=>{
         this.complainCategories = res.data;
       },
       (err)=>{
        this.complainCategories = []
       }
     );


    this.complainForm = this._formBuilder.group({
      category_id: ['', Validators.required],
      subject: ['', Validators.required],
      description: ['',Validators.required],
    })
  }

  onSubmit(): void {

    if(this.complainForm.valid){
      this.progressBar = true;
      this.btnOpts.active = true;
    console.log(this.complainForm);
    const data = this.complainForm.value;
    const formData = new FormData();

    if (this.file){
      formData.append('attachment', this.file, this.file.name);
    }
    formData.append('category_id', data.category_id);
    formData.append('description', data.description);
    formData.append('subject', data.subject);

    this.apicommon.store('add-new-ticket',formData).subscribe(
      (res)=>{
        this.progressBar = false;
        this.btnOpts.active = false;
        this.clearValue.nativeElement.value = '';
        this.toastr.success(res.response.message, "Success!", this.config);
        this.complainForm.reset();
      },
      (res) =>{
            if (res.error.message) {
              this.toastr.error(res.error.message, "Error!", this.config);
          }
          if (res.error.response) {
              this.toastr.error(res.error.response.message, "Error!", this.config);
          }
          this.btnOpts.active = false;

      }
    )
    
  }
}

  loadFile(event: any) {
    if (event.target.files && event.target.files.length) {
        this.file = event.target.files[0];
    }
}


}
