import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiCommonService } from '../../../../service/common/api-common.service';

@Component({
  selector: 'app-tutor-category',
  templateUrl: './tutor-category.component.html',
  styleUrls: ['./tutor-category.component.scss']
})
export class TutorCategoryComponent implements OnInit {

  public config;
  public categories;
  public subCategories;

  formInfo: FormGroup;

  constructor(
    private apiCommon: ApiCommonService,
    private _formBuilder: FormBuilder,
    private toastr: ToastrService,
  ) { 
    
    this.config = {
      timeOut: 5000,
      closeButton: true,
      positionClass: 'toast-top-right',
      enableHtml: true,
    };

  }

  ngOnInit() {

    this.formInfo = this._formBuilder.group({
      category: ['', Validators.required],
      subcategory: ['', Validators.required]
    });

    this.apiCommon.get('course-settings/category').subscribe(
      (res) => {
        this.categories = res.data;
      }
    );

    this.apiCommon.get('teacher-settings/tutor-category').subscribe(
      (res) => {

        this.formInfo.setValue({
          category: res.data.course_category_id,
          subcategory: 0
        });
      }
    );

  }

  public onSelectChange(category_id: any): void {  
    this.apiCommon.get('course-settings/subcategory?category_id=' + category_id).subscribe(
      (res) => {
        this.subCategories = res.data;
      },
      (error) => {
        this.subCategories = null; 
        //console.log(error);
      }
    );
  }

  onSubmit(): void {
    if (this.formInfo.valid) {
        const data = this.formInfo.value;
        this.apiCommon.store('teacher-settings/tutor-category', data).subscribe(
            (res) => {
                if (res.status === 'success') {
                    this.toastr.success(res.message, 'Success!', this.config);
                }
            },
            (res) => {
               
            }
        );
    }
  }

}
