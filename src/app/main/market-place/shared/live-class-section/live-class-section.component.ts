import {Component, Input, OnInit} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilityService } from '../../../../service/utility/utility.service';
import { HelperService } from '../../../../service/common/helper.service';
import { StorageService } from '../../../../service/common/storage.service';
import { ApiCommonService } from '../../../../service/common/api-common.service';

@Component({
    selector: 'app-live-class-section',
    templateUrl: './live-class-section.component.html',
    styleUrls: ['./live-class-section.component.scss']
})
export class LiveClassSectionComponent implements OnInit {

    @Input() courses: any;
    @Input() category: any;

    public courseList = [];
    public limit = 4;
    public count = 11;
    private AWS_URL;
    config;
    public checkLogin = false;
    public classDetails;

    constructor(
        private utility: UtilityService,
        private helper: HelperService,
        private toastr: ToastrService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private storage: StorageService,
        private apiCommon: ApiCommonService,
    ) {
        this.config = {
            timeOut: 5000,
            closeButton: true,
            positionClass: 'toast-top-right',
            enableHtml: true,
        };
    }

    ngOnInit() {
        this.loadMore(this.count);
        this.helper.isAuthorized() ? this.checkLogin = true : this.checkLogin = false;


        // aws url
        this.AWS_URL = this.utility.aws_s3_bucket_path();
    }

    loadMore(count) {

        if (count < this.courses.length) {
            this.count = count;
        }
        else {
            this.count = this.courses.length - 1;
        }

        this.courseList = this.courses.filter((item, index) => {
            return index <= this.count;
        });

    }

    loadLess(count) {

        if (count < this.limit) {
            this.count = this.limit - 1;

        }
        else {
            this.count = count;
        }

        this.courseList = this.courses.filter((item, index) => {
            return index <= this.count;
        });

    }
    getClassDetail(slotId) {
        const api = 'live-class/live-classes/' + slotId;
        this.apiCommon.get(api).subscribe(
            (res) => {
                this.classDetails = res.data;
                const loginUser = this.storage.getUserData();
                if (loginUser.id == this.classDetails.user_id){
                    this.toastr.warning('You can not book this slot', 'Warning!', this.config);
                    return false;
                }
                else{
                    const api = 'live-class/slot-booking';
                    if (!confirm('Do want to book now?')) {
                        return false;
                    }
                    const data = { slotId: this.classDetails.id } ;
            
                    //this.btnOpts.active = true;
            
                    this.apiCommon.store(api, data).subscribe(
                        (res) => {
                            //this.btnOpts.active = false;
            
                            if (res.response.code == 200) {
                                this.toastr.success(res.response.message, "Success!", this.config);
                            }
                            else if (res.response.code == 409) {
                                this.toastr.warning(res.response.message, "Warning!", this.config);
                            }
                        },
                        (res) => {
                            //this.btnOpts.active = false;
                        },
                    );
                }    
            },
            (res) => {
                //this.subscription.unsubscribe();
            },
            () => {
                //this.subscription.unsubscribe();
            }
        );

    }

    bookingLiveClass(id) {
        if (!this.checkLogin){
            this.router.navigate(['/login'],{ queryParams: { redirectTo: '/live-classes' } });
            return false;
        }
        if (this.checkLogin){
             this.getClassDetail(id);
           
        }
    
        return false;
    }

}
