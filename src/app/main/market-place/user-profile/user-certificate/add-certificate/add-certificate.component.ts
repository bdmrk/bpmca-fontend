import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { ApiCommonService } from '../../../../../service/common/api-common.service';

@Component({
  selector: 'app-add-certificate',
  templateUrl: './add-certificate.component.html',
  styleUrls: ['./add-certificate.component.scss']
})
export class AddCertificateComponent implements OnInit {

  certificateForm: FormGroup;

  certificate;
  file: File;
  config;
  constructor(
    public dialogRef: MatDialogRef<AddCertificateComponent>,
    private fb: FormBuilder,
    private apiCommon: ApiCommonService,
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
      certificates_id: ['', Validators.required],
      start_date: [''],
      end_date: [''],
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
    formData.append('file', this.file, this.file.name);

    this.apiCommon.store('user-settings/certificate', formData).subscribe(
      (res) => {
        if (res.status === 'success'){
          this.toastr.success(res.message, 'Success!', this.config);
          this.dialogRef.close('success');
        }
      }
    );


  }

}
