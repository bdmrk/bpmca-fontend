import { Component, OnInit, ViewChild, HostListener, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { StorageService } from "../../../../service/common/storage.service";
import { ApiCommonService } from "../../../../service/common/api-common.service";
import { HelperService } from "../../../../service/common/helper.service";
import { DataCommunicationService } from "../../../../service/common/data-communication.service";
import { CartService, getLocalData } from "../../../../service/checkout/cart.service";
import { of } from "rxjs";
import {
    debounceTime,
    map,
    distinctUntilChanged,
    filter
} from "rxjs/operators";
import { fromEvent } from 'rxjs';
import { style, trigger, transition, animate } from '@angular/animations';
import { UtilityService } from '../../../../service/utility/utility.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    animations: [
        trigger('fade', [
            transition('void => *', [
                style({ opacity: 0 }),
                animate(2000)
            ])
        ]),
    ]
})
export class HeaderComponent implements OnInit {

    isSearchOpen = false;
    testBrowser: any;
    isCourseOpen = false;
    isContentOpen = false;
    isTutorOpen = false;
    isMCQOpen: boolean =false;
    isBQOpen:boolean=false;
    isPodcastOpen:boolean=false;
    tutorCatergories: any;
    board_categories: any;
    mcq_categories: any;
    content_categories: any;
    

    toggle() {
        this.isSearchOpen = !this.isSearchOpen;
    }

    openCourse(menuName) {
        if (menuName === 'course') {
            this.isCourseOpen = !this.isCourseOpen;
            this.isContentOpen = false;
            this.isTutorOpen = false;
            this.isMCQOpen= false;
            this.isBQOpen= false;
            this.isPodcastOpen=false;

        }
        else if (menuName === 'content') {
            this.isContentOpen = !this.isContentOpen;
            this.isCourseOpen = false;
            this.isTutorOpen = false;
            this.isMCQOpen = false;
            this.isBQOpen= false;
            this.isPodcastOpen=false;

        }
        else if (menuName === 'tutor') {
            this.isTutorOpen = !this.isTutorOpen;
            this.isCourseOpen = false;
            this.isContentOpen = false;
            this.isMCQOpen = false;
            this.isBQOpen= false;
            this.isPodcastOpen=false;

        }
        else if (menuName === 'mcq') {
            this.isMCQOpen = !this.isMCQOpen;
            this.isTutorOpen = false;
            this.isContentOpen = false;
            this.isCourseOpen = false;
            this.isBQOpen= false;
            this.isPodcastOpen=false;


        }
        else if (menuName === 'all') {
            this.isTutorOpen = false;
            this.isContentOpen = false;
            this.isCourseOpen = false;
            this.isMCQOpen = false;
            this.isBQOpen= false;
            this.isPodcastOpen=false;

        }
        else if (menuName === 'bq') {
            this.isBQOpen = !this.isBQOpen;
            this.isTutorOpen = false;
            this.isContentOpen = false;
            this.isCourseOpen = false;
            this.isMCQOpen = false;
            this.isPodcastOpen=false;
        }
        else if (menuName === 'podcast') {
            this.isPodcastOpen = !this.isPodcastOpen;
            this.isTutorOpen = false;
            this.isContentOpen = false;
            this.isCourseOpen = false;
            this.isMCQOpen = false;
            this.isBQOpen= false;
        }

    }




    public categories;
    private route;
    public config;
    public itemCount = 0;
    public isLoggedin;
    public search = '';

    public userData;
    public splittedName;
    public profile_image;
    changeText: boolean;
    cartItems: any;
    awsS3Path: any;
    collapsed: boolean = true;
    @ViewChild('courseSearchInput') courseSearchInput: ElementRef;
    @ViewChild('courseSearchInput2') courseSearchInput2: ElementRef;

    searchResponse = [];
    constructor(
        private apiCommon: ApiCommonService,
        private helper: HelperService,
        private storage: StorageService,
        private toastr: ToastrService,
        private activatedRoute: ActivatedRoute,
        private dataCommunicationService: DataCommunicationService,
        private utility: UtilityService,
        private cartService: CartService,
        private router: Router,
        private eRef: ElementRef,

        @Inject(PLATFORM_ID) platformId: string
    ) {
        this.testBrowser = isPlatformBrowser(platformId);
        this.config = {
            timeOut: 3000,
            closeButton: true,
            positionClass: 'toast-top-right',
            enableHtml: true,
        };

        this.profile_image = 'assets/images/avatars/Velazquez.jpg';
    }

    ngOnInit() {


        this.changeText = false;
        this.awsS3Path = this.utility.aws_s3_bucket_path();
        this.cartItems = getLocalData();
        //setTimeout(() => {


        this.apiCommon.get('public/homepage/categories').subscribe(
            (res) => {
                
                this.categories = res.course_categories;
                this.tutorCatergories = res.tutor_categories;
                this.content_categories = res.content_categories;
                this.mcq_categories = res.mcq_categories;
                this.board_categories = res.board_categories;


                // console.log(this.tutorCatergories);
            }
        );
        this.dataCommunicationService.getItemCounter.subscribe(() => {
            this.setItemCount();
            this.cartItems = getLocalData();
        });
        this.dataCommunicationService.clearBasket.subscribe((data) => {
            if (data['actionType'] == 'logout') {
                this.clearBasket();
                this.isLoggedin=false;
            }


        });
        this.dataCommunicationService.getheaderData.subscribe(
            (res) => {
                this.isTutorOpen = false;
                this.isContentOpen = false;
                this.isCourseOpen = false;
                this.isMCQOpen= false;
                this.isBQOpen= false;
            }
        );

        this.isLoggedin = this.helper.isAuthorized();

        // get localStorage Data
        if (this.isLoggedin) {
            this.userData = this.storage.getUserData();
            this.userData.profile_image ? this.profile_image = this.userData.profile_image : this.profile_image = 'assets/images/avatars/Velazquez.jpg';
            this.splittedName = this.userData.name.split(" ", 1);

        }
        fromEvent(this.courseSearchInput2.nativeElement, 'keyup').pipe(
            // get value
            map((event: any) => {
                if (event.target.value == '') {
                    this.searchResponse = [];
                    return event.target.value;
                }
                else {
                    return event.target.value;
                }
            })
            // if character length greater then 2
            , filter(res => res.length > 2)
            // Time in milliseconds between key events
            , debounceTime(500)
            // If previous query is diffent from current   
            , distinctUntilChanged()
            // subscription for response
        ).subscribe((text: string) => {

            this.searchGetCall(text).subscribe((res) => {
                this.searchResponse = res;
            }, (err) => {
                this.searchResponse = [];
            });
        });

        fromEvent(this.courseSearchInput.nativeElement, 'keyup').pipe(
            // get value
            map((event: any) => {
                if (event.target.value == '') {
                    this.searchResponse = [];
                    return event.target.value;
                }
                else {
                    return event.target.value;
                }
            })
            // if character length greater then 2
            , filter(res => res.length > 2)
            // Time in milliseconds between key events
            , debounceTime(500)
            // If previous query is diffent from current   
            , distinctUntilChanged()
            // subscription for response
        ).subscribe((text: string) => {

            this.searchGetCall(text).subscribe((res) => {
                this.searchResponse = res;


            }, (err) => {
                this.searchResponse = [];
            });
        });
        //}, 2000);
    }
    searchCourse() {

        this.collapsed = true;
        if (this.search !== '') {
            this.apiCommon.store(`public/course-search`, { title: this.search }).subscribe(
                (res) => {
                    this.dataCommunicationService.setPassedItemData(res);



                    this.router.navigate(['/search-result']);

                },
                (err) => {
                    this.toastr.error('No related course found.', "Error!", this.config);

                }
            );
        }

    }
    searchAction(value) {
        this.search = this.search.trim() + ' ' + value.trim();
        this.searchCourse();
        this.collapsed = true;
    }


    setItemCount() {
        this.itemCount = this.cartService.countCartItem();
    }
    goCart(itemCount) {
        if (itemCount > 0)
            this.router.navigate(['cart']);
    }

    logout() {
        if (this.helper.isAuthorized()) {
            this.storage.clear();
            this.isLoggedin = false;
            this.router.navigate(['/']);
        } else {
            this.isLoggedin = false;
            this.router.navigate(['/']);
        }
        if (this.testBrowser) {
            localStorage.removeItem('quiz_question');
        }
        this.dataCommunicationService.setBasketClear({ actionType: 'logout' });
    }
    clearBasket(): void {
        this.cartService.clearCartItems();
        this.setItemCount();
    }

    collapse(): void {
        this.collapsed = true;
        this.searchResponse = [];
        this.search = '';
    }
    expand(id): void {
        this.isCourseOpen = false;
        this.isContentOpen = false;
        this.isTutorOpen = false;
        if (id == 1) {
            setTimeout(() => {
                this.courseSearchInput.nativeElement.focus();
            }, 0);
        }
        if (id == 2) {
            setTimeout(() => {
                this.courseSearchInput2.nativeElement.focus();
            }, 0);
        }
        this.collapsed = false;
    }

    @HostListener('document:click', ['$event'])
    public documentClick(event: Event): void {
    }
    searchGetCall(term: string) {
        if (term === '') {
            return of([]);
        }
        return this.apiCommon.get(`public/course-suggestion/${term}`);
    }
    @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
        this.collapse();
        this.searchResponse = [];
        this.search = '';
    }



    // getBoardQuestion(id){
    //     this.dataCommunicationService.setPassedItemData(id);
    //     this.router.navigateByUrl('/bq');
    // }














    
}
