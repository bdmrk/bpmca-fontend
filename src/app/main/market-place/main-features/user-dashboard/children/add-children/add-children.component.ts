import { Component, OnInit } from '@angular/core';
import { MatProgressButtonOptions } from 'mat-progress-buttons';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiCommonService } from '../../../../../../service/common/api-common.service';

@Component({
  selector: 'app-add-children',
  templateUrl: './add-children.component.html',
  styleUrls: ['./add-children.component.scss']
})
export class AddChildrenComponent implements OnInit {
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
public progressBar = false;
  tutor_categories: any;
  tutor_subcategories: any;
  course_subcategories: any;
  childForm: FormGroup;
  file: any;
  config:any;

  constructor(private formBuilder: FormBuilder,
    private apiCommon: ApiCommonService,private toastr: ToastrService) 
    { 
      this.config = {
        timeOut: 5000,
        closeButton: true,
        positionClass: 'toast-top-right',
        enableHtml: true,
    };

    }

  ngOnInit() {
    this.childForm = this.formBuilder.group({  
      name: ['', [Validators.required]],  
      email: ['', [Validators.required]],  
      phone: ['', [Validators.required]],
      password: ['', [Validators.required]],
      group:['',[Validators.required]],
      class:['',[Validators.required]]

    }); 
    
    this.apiCommon.get('necessary-data').subscribe(
      (res) => {
          this.tutor_categories = res.tutor_catergories;
          this.course_subcategories = res.course_categories;
      }
  );
  }

  getImage(event: any) {
    if (event.target.files && event.target.files.length) {
        this.file = event.target.files[0];
    }
  }

  onSubmit(): void {
    if(this.childForm.valid){
      this.progressBar = true;
      this.btnOpts.active = true;
    //console.log(this.childForm);
    const data = this.childForm.value;
    const formData = new FormData();
  
    if (this.file){
      formData.append('attachment', this.file, this.file.name);
    }
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('phone', data.phone);
    formData.append('password', data.password);
    formData.append('group', data.group);
    formData.append('class', data.class);
  
    this.apiCommon.store('public/children',formData).subscribe(
      (res)=>{
        this.progressBar = false;
        this.btnOpts.active = false;
      
        this.toastr.success(res.response.message, "Success!", this.config);
        this.childForm.reset();
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


}
