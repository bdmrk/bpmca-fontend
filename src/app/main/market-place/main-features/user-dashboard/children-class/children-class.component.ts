import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiCommonService } from '../../../../../service/common/api-common.service';
import { ToastrService } from 'ngx-toastr';
import { StorageService } from '../../../../../service/common/storage.service';
import { MatProgressButtonOptions } from 'mat-progress-buttons';

@Component({
  selector: 'app-children-class',
  templateUrl: './children-class.component.html',
  styleUrls: ['./children-class.component.scss']
})
export class ChildrenClassComponent implements OnInit {
  config: any;
  childForm: any;
  tutor_categories: any;
  course_subcategories: any;
  btnOpts: MatProgressButtonOptions = {
    active: false,
    text: 'Update',
    spinnerSize: 19,
    raised: true,
    stroked: false,
    buttonColor: 'white',
    spinnerColor: 'white',
    fullWidth: false,
    disabled: false,
    mode: 'indeterminate',
};
  user: any;
  searchRoute: string;
  searchForm: any;
  divisions: any;
  districts: any;
  thanas: any;
  postoffices: any;
  institutes: any=[];

  constructor(private formBuilder: FormBuilder,
    private apiCommon: ApiCommonService,private toastr: ToastrService,private storage:StorageService) 
    { 
      this.user = this.storage.getUserData();
      this.config = {
        timeOut: 5000,
        closeButton: true,
        positionClass: 'toast-top-right',
        enableHtml: true,
    };

    }

  ngOnInit() {

    const user = this.storage.getUserData();
    this.searchForm = this.formBuilder.group({
      name: [''],
      thana_id: [''],
      post_id: [''],
      division_id:[''],
      district_id:['']
  });
  
    this.apiCommon.get('public/division').subscribe(
      (res) => {
          this.divisions = res.data;
      },
      (res) => {

      } 
  );
    this.childForm = this.formBuilder.group({  
      group:['',[Validators.required]],
      class:['',[Validators.required]],
      institute:['']
    }); 
    
    this.apiCommon.get('necessary-data').subscribe(
      (res) => {
          this.tutor_categories = res.tutor_catergories;
          this.course_subcategories = res.course_categories;
      }
  );
      this.apiCommon.get('public/children/'+this.user.id).subscribe(
        (res) => {
          if(res.data.institute){
            this.institutes.push(res.data.institute);
          }
        //  this.institutes.push(res.data.institute);
         
          this.childForm.patchValue({
            group: +res.data.group_id,
            class: res.data.current_class_id,
            institute: res.data.institute_id
          });
           // console.log(res);
        },
        (err) => {
          this.toastr.error('Please login from a child account', "Error!", this.config);
        }
    );

  }

  onSubmit(): void {
    if(this.childForm.valid){
    
  
    this.apiCommon.update('public/children/'+this.user.id,this.childForm.value).subscribe(
      (res)=>{
        
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
  onChangeDivision(id){
  
    this.apiCommon.get('public/district?division_id=' + id).subscribe(
      (res) => {
          this.districts = res.data;
          
          this.searchForm.patchValue({  
              district_id: '',  
          });  
      },
      (err) => {
          this.districts = [];
          this.searchForm.patchValue({  
            district_id: '',  
          }); 
      }
  );

}
onChangeDistrict(id){

    this.apiCommon.get('public/thana?district_id=' + id).subscribe(
      (res) => {
          this.thanas = res.data;
          
          this.searchForm.patchValue({  
              thana_id: '',  
          });  
      },
      (err) => {
          this.districts = [];
          this.searchForm.patchValue({  
            thana_id: '',  
          }); 
      }
  );
 
}

onChangeThana(id){
  this.apiCommon.get('public/post-office?thana_id=' + id).subscribe(
    (res) => {
        this.postoffices = res.data;
        this.searchForm.patchValue({  
            post_id: '',  
        });  
        let query = this.searchForm.value;
        query.thana_id = id;
        console.log(query);
        let routechange = `public/institute?query=${JSON.stringify(query)}`;
      
        this.apiCommon.get(routechange).subscribe(
            (res) => {
                this.institutes = res.data;
       
            },
            (res) => {
          
              this.institutes = [];
             
            }
        );
    },
    (err) => {
        this.districts = [];
        this.searchForm.patchValue({  
          post_id: '',  
        }); 
    }
);
}
onChangePostOffice(id){
  let query = this.searchForm.value;
  query.post_id = id;
  //console.log(query);
  this.searchRoute = `public/institute?query=${JSON.stringify(query)}`;

  this.apiCommon.get(this.searchRoute).subscribe(
      (res) => {
          this.institutes = res.data;
 
      },
      (res) => {
    
        this.institutes = [];
       
      }
  );
}


final_submit(id){
 let query = this.searchForm.value;

 this.searchRoute = `public/institute?query=${JSON.stringify(query)}`;

 this.apiCommon.get(this.searchRoute).subscribe(
     (res) => {
         this.institutes = res.data;

     },
     (res) => {
      // this.toastr.success('No data found', 'Try different query!', this.config);
       this.institutes = [];
      
     }
 );

}
getAll(){
  this.ngOnInit();
}

}
