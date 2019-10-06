import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatProgressButtonOptions } from 'mat-progress-buttons';
import { ActivatedRoute, Router, RouterStateSnapshot } from "@angular/router";

// Services
import { ToastrService } from "ngx-toastr";
import { ApiCommonService } from "../../../../../service/common/api-common.service";
import { HelperService } from "../../../../../service/common/helper.service";
import { StorageService } from "../../../../../service/common/storage.service";

@Component({
    selector: 'app-live-class-details',
    templateUrl: './live-class-details.component.html',
    styleUrls: ['./live-class-details.component.scss'],
})
export class LiveClassDetailsComponent implements OnInit {

    id: number;
    public data;
    public class;
    private sub: any;
    public pageId;
    public classDetails;
    private config;

    public checkLogin = false;
    public currentUrl = "";

    // Button options
    btnOpts: MatProgressButtonOptions = {
        active: false,
        text: 'Book Now',
        spinnerSize: 19,
        raised: true,
        stroked: false,
        buttonColor: 'accent',
        spinnerColor: 'white',
        fullWidth: true,
        disabled: false,
        mode: 'indeterminate',
    };

    constructor(
        private apiCommon: ApiCommonService,
        private helper: HelperService,
        private storage: StorageService,
        private toastr: ToastrService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private route: ActivatedRoute,
    ) {

        this.data = {
            courses: [],
        };

        this.sub = this.activatedRoute.params.subscribe(params => {
            this.id = +params['slug'];
        });

        this.pageId = 'live-class/' + this.id;

        this.config = {
            timeOut: 5000,
            closeButton: true,
            positionClass: 'toast-top-right',
            enableHtml: true,
        };
    }

    ngOnInit() {
        this.getClassDetail(this.id);

        this.helper.isAuthorized() ? this.checkLogin = true : this.checkLogin = false;
    }
    getClassDetail(slotId) {
        const api = 'live-class/live-classes/' + slotId;
        this.apiCommon.get(api).subscribe(
            (res) => {
                this.classDetails = res.data;
            },
            (res) => {
                //this.subscription.unsubscribe();
            },
            () => {
                //this.subscription.unsubscribe();
            }
        );

    }
    bookingLiveClass() {
        if (!this.checkLogin){
            this.router.navigate(['login'],{queryParams:{'redirectURL':'/live-class/'+this.route.snapshot.url}});
            return false;
        }
        if (this.checkLogin){
            const loginUser = this.storage.getUserData();
            if (loginUser.id == this.classDetails.user_id){
                this.toastr.warning('You can not book this slot', 'Warning!', this.config);
                return false;
            }    
        }
        const api = 'live-class/slot-booking';
        if (!confirm('Do want to book now?')) {
            return false;
        }
        const data = { slotId: this.classDetails.id } ;

        this.btnOpts.active = true;

        this.apiCommon.store(api, data).subscribe(
            (res) => {
                this.btnOpts.active = false;

                if (res.response.code == 200) {
                    this.toastr.success(res.response.message, "Success!", this.config);
                }
                else if (res.response.code == 409) {
                    this.toastr.warning(res.response.message, "Warning!", this.config);
                }
            },
            (res) => {
                this.btnOpts.active = false;
            },
        );
        return false;
    }

}
