import { Component, OnInit, ElementRef, ViewChild,Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiCommonService } from '../../../../service/common/api-common.service';

@Component({
  selector: 'app-profile-image',
  templateUrl: './profile-image.component.html',
  styleUrls: ['./profile-image.component.scss']
})
export class ProfileImageComponent implements OnInit {

  public imagePreview = null;
  private file: File;
  private config;

  public progressImage = false;
  @ViewChild('clearImage') clearImage: ElementRef;
  @Input() data;

  image_data:any;

  constructor(
    private apiCommon: ApiCommonService,
    private toastr: ToastrService
  ) { 

    this.imagePreview = 'assets/img/placeholder.jpg';

    // toast
    this.config = {
      timeOut: 5000,
      closeButton: true,
      positionClass: 'toast-top-right',
      enableHtml: true,
    };
  }

  ngOnInit() {
    this.image_data = this.data;
    this.imagePreview = this.image_data.profile_image;

   
    // this.apiCommon.get('user-settings/profile-image').subscribe(
    //   (res) => {
    //     if (res.profileImage){
    //       this.imagePreview = res.profileImage;
    //     }
    //   },
    //   (res) => {

    //   }
    // );
  }

  loadImage(event: any){
    if (event.target.files && event.target.files[0]) {

      this.file = <File>event.target.files[0];

      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: Event) => {
          this.imagePreview = reader.result;
      };
  }
  }

  uploadImage(){
    const formData = new FormData();
    formData.append('profile_image', this.file, this.file.name);

    this.progressImage = true;

    this.apiCommon.store('user-settings/profile-image', formData).subscribe(
        (res) => {

          this.progressImage = false;
          this.clearImage.nativeElement.value = '';

            if (res.response.status == 'success') {
                this.toastr.success(res.response.message, 'Success!', this.config);
            } else {
                this.toastr.error('Error! Data not found', 'Error!', this.config);
            }
        },
        (res) => {

          this.progressImage = false;
          this.clearImage.nativeElement.value = '';
          
        }
    );
  }

}
