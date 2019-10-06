import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { ToastrService } from 'ngx-toastr';
import { ApiCommonService } from '../../../../../service/common/api-common.service';

@Component({
  selector: 'app-edit-certificate',
  templateUrl: './edit-certificate.component.html',
  styleUrls: ['./edit-certificate.component.scss']
})
export class EditCertificateComponent implements OnInit {

  certificateForm: FormGroup;

  certificate;
  file: File;
  config;
  constructor(
    public dialogRef: MatDialogRef<EditCertificateComponent>,
    private fb: FormBuilder,
    private apiCommon: ApiCommonService,
    @Inject(MAT_DIALOG_DATA) public data: any,
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

    this.certificateForm = this.fb.group({
      certificates_id: [this.data.data.certificates_id, Validators.required],
      start_date: [this.data.data.start_date],
      end_date: [this.data.data.end_date],
      file: [''],
    });

    this.apiCommon.get('user-settings/certificate').subscribe(
      (res) => {
        this.certificate = res;
      }
    );

  }

  loadImage(event: any){
    if (event.target.files && event.target.files[0]) {

      this.file = <File>event.target.files[0];
    }
  }

  onSubmit(): void{

    const formData = new FormData();
    formData.append('certificates_id', this.certificateForm.get('certificates_id').value);
    formData.append('start_date', this.certificateForm.get('start_date').value);
    formData.append('end_date', this.certificateForm.get('end_date').value);
    if (this.file){
      formData.append('file', this.file, this.file.name);
    }
    formData.append('id', this.data.data.id);

    this.apiCommon.store('user-settings/certificate?edit=true', formData).subscribe(
      (res) => {
        if (res.status === 'success'){
          this.toastr.success(res.message, 'Success!', this.config);
          this.dialogRef.close('success');
        }
      }
    );


  }

}
