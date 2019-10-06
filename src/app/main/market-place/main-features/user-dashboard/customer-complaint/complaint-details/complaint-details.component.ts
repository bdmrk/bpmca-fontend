import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {  Router } from '@angular/router';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatProgressButtonOptions } from 'mat-progress-buttons';
import { ApiCommonService } from '../../../../../../service/common/api-common.service';
import { DataCommunicationService } from '../../../../../../service/common/data-communication.service';
import { UtilityService } from '../../../../../../service/utility/utility.service';
import { StorageService } from '../../../../../../service/common/storage.service';


@Component({
  selector: 'app-complaint-details',
  templateUrl: './complaint-details.component.html',
  styleUrls: ['./complaint-details.component.scss']
})
export class ComplaintDetailsComponent implements OnInit {
  @ViewChild('clearValue') clearValue: ElementRef;

  status:any;

  dropdownList=[];
  selectedItems;
  dropdownSettings;

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
  ClosebtnOpts: MatProgressButtonOptions = {
    active: false,
    text: 'Close issue',
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
  commentForm: FormGroup;
  file:any;
  public progressBar = false;

  id:any;
  route_path:any;
  complain_data:any;
  empty_profile_image:any;
  subscription:any;
  constructor(private route: Router,private apicommon: ApiCommonService, private _formBuilder: FormBuilder,private toastr: ToastrService,    private dataCommunicationService: DataCommunicationService,private utilService: UtilityService,private storageService:StorageService) {
    this.config = {
      timeOut: 5000,
      closeButton: true,
      positionClass: 'toast-top-right',
      enableHtml: true,
  };
  this.commentForm = this._formBuilder.group({
    comment: ['', Validators.required]
  });
  this.empty_profile_image = 'https://www.seekpng.com/png/detail/847-8474751_download-empty-profile.png'

   }
  user_data;
  forwardable = false;
  ngOnInit() {
    this.user_data = this.storageService.getUserData();
    if(this.user_data.type == 3){
      this.commentForm.controls['comment'].setValidators([]);
      this.forwardable = true;
    }
    this.dropdownList = [
      // { item_id: 1, item_text: 'Mumbai' },
      // { item_id: 2, item_text: 'Bangaluru' },
      // { item_id: 3, item_text: 'Pune' },
      // { item_id: 4, item_text: 'Navsari' },
      // { item_id: 5, item_text: 'New Delhi' }
    ];
    this.selectedItems = [
      
    ];
    this.dropdownSettings = {
      
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

    this.subscription = this.dataCommunicationService.getPassedItemData.subscribe((data) => {
     if(data){
      this.id = data.data;
     }
     else{
        this.route.navigate(['/user-dashboard/complaint']);
     }
      

    });

    this.apicommon.get('get-complain-detail/'+this.id).subscribe(
      (res)=>{
        this.complain_data = res.data;
        if(res.data.status == 'open' || res.data.status == 'reviewing'){
          this.status = 'active';
        }
        else{
          this.status = 'close'
        }
      },
      (err)=>{

      }

    );
    this.apicommon.get('get-all-admin').subscribe(
      (res)=>{
        this.dropdownList = res.data;
     
      },
      (err)=>{
      }
    );

  }
  loadFile(event: any) {
    if (event.target.files && event.target.files.length) {
        this.file = event.target.files[0];
    }
}
onSubmit(): void {
  if(this.commentForm.valid){
    this.progressBar = true;
    this.btnOpts.active = true;
  //console.log(this.commentForm);
  const data = this.commentForm.value;
  const formData = new FormData();
  if(data.comment.length>0){
    formData.append('comment', data.comment.trim());
  }
  else{
    formData.append('comment', data.comment);
  }

  if (this.file){
    formData.append('attachment', this.file, this.file.name);
  }
  if(this.selectedItems.length > 0){
    formData.append('forward', JSON.stringify(this.selectedItems));
  }

  
  formData.append('complaint_no', this.complain_data.complaint_no);
  formData.append('user_type', this.user_data.type);

//console.log(JSON.stringify(formData.get('forward')));


  this.apicommon.store('add-new-comment',formData).subscribe(
    (res)=>{
      if(data.comment.trim().length>0){
        this.complain_data = res.data;
      }
      this.progressBar = false;
      this.btnOpts.active = false;
      this.clearValue.nativeElement.value = '';
      this.toastr.success(res.response.message, "Success!", this.config);
      this.commentForm.reset();
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
  onDestroy(): void { 
    this.subscription.unsubscribe();
  }
  closeIssue(){
    this.apicommon.get(`close-an-issue/${this.id}`).subscribe(
      res=>{
        this.commentForm.controls['comment'].disable();
        this.status = 'close';
        this.complain_data.status='closed';
        this.toastr.success(res.response.message, "Success!", this.config);

      },
      (err)=>{

      }
    )
  }
  getTimeDiff(created_at,updated_at) {
    if(updated_at){
        return this.utilService.durationMessage(updated_at);
    }else{
      return this.utilService.durationMessage(created_at);
    }
  };

  onItemSelect(item: any) {
    console.log(item);
    this.selectedItems.push(item);
    console.log(this.selectedItems);

  }

  onSelectAll(items: any) {
    console.log(items);
    this.selectedItems = [];
    this.selectedItems.push(items);
  }

}
