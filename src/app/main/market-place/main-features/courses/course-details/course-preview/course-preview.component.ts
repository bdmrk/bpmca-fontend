import { MarketplaceQuizComponent } from '../marketplace-quiz/marketplace-quiz.component';
import { MatDialog } from '@angular/material';
import { Component, OnInit, Input, ElementRef, ViewChild, QueryList } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatProgressButtonOptions } from 'mat-progress-buttons';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {environment} from "../../../../../../../environments/environment";
import { YoutubeService } from '../../../../../../service/youtube.service';
import { UtilityService } from '../../../../../../service/utility/utility.service';
import { CartService } from '../../../../../../service/checkout/cart.service';
import { DataCommunicationService } from '../../../../../../service/common/data-communication.service';
import { HelperService } from '../../../../../../service/common/helper.service';
import { ApiCommonService } from '../../../../../../service/common/api-common.service';

@Component({
  selector: 'app-course-preview',
  templateUrl: './course-preview.component.html',
  styleUrls: ['./course-preview.component.scss']
})
export class CoursePreviewComponent implements OnInit {

  @Input() data;
  youtube_api_data;
  current_link;
  url_iframe: any;
  video_file: any;
  regular_api_data = [];
  lectureTitle: any;
  selectedVideoIndex = 0;
  previewlink: any;
  @ViewChild('videoPlayer') videoplayer: ElementRef;


  courseId;
  public config;
  selectedRegularVideoIndex = 0;
  buttonDisabled: boolean;
  checkLogin;
  public base_url;
  public currentUrl: string = "";
  // Button options
  btnOpts: MatProgressButtonOptions = {
    active: false,
    text: 'Enroll Now',
    spinnerSize: 20,
    raised: true,
    stroked: false,
    buttonColor: 'accent',
    spinnerColor: 'white',
    fullWidth: true,
    disabled: false,
    mode: 'indeterminate',
  };

  constructor(
    private youtubeService: YoutubeService,
    public sanitizer: DomSanitizer,
    private utility: UtilityService,
    private cartService: CartService,
    private activatedRoute: ActivatedRoute,
    private dataCommunicationService: DataCommunicationService,
    private toastr: ToastrService,
    private helper: HelperService,
    private router: Router,
    private apiCommon: ApiCommonService,
    public dialog: MatDialog
  ) {

    this.activatedRoute.params.subscribe(params => {
      this.courseId = +params['slug'];
    });

  }

  ngOnInit() {
    this.currentUrl = this.router.url;
    this.base_url = environment.base_url;

    // console.log(this.playListDiv.nativeElement.offsetTop);

     // check access_token for login user
     this.helper.isAuthorized() ? this.checkLogin = true : this.checkLogin = false;

    this.apiCommon.store('course/enrollment/check', { course_id: this.courseId }).subscribe(
      (res) => {
          if (res.code === 404) {
              this.btnOpts.text = 'Already Taken';
              this.btnOpts.disabled = true;
              this.buttonDisabled = true;
          }
          else{
              this.btnOpts.text = 'Enroll Now';
          }
      }
  );

  this.previewVideo();

  this.previewlink = this.utility.aws_s3_bucket_path();

  }

  previewVideo() {
    
    if (this.data.course_type === 2 && this.data.id > 137) {
      const playlistId = this.data.sections[0].lectures[0].course_content[0].url;
      this.youtubeService.getPlaylistItem(playlistId).subscribe(
        (res) => {
          this.youtube_api_data = res;
          // tslint:disable-next-line:max-line-length
          this.current_link = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.youtube_api_data['items'][0].snippet.resourceId.videoId}`);
        }
      );
    }

    if (this.data.id > 137) {

      this.data.sections.filter((a) => {
        a.lectures.filter((b) => {
          b.course_content.filter((c) => {
            if (this.data.course_type === 4) {
              if (c.url) {
                this.url_iframe = this.sanitizer.bypassSecurityTrustResourceUrl(c.url);
              }
            }
            else if (this.data.course_type === 5) {
              if (c.url) {
                this.url_iframe = this.sanitizer.bypassSecurityTrustResourceUrl(c.url);
              }
            }
            if (c.file) {
              this.video_file = c.file;
              this.regular_api_data.push({
                file: c.file,
                title: b.title,
                lecture_id: b.id
              });
              this.lectureTitle = this.regular_api_data[0].title;
            }
          });
        });
      });
    }
    else {
      this.url_iframe = this.sanitizer.bypassSecurityTrustResourceUrl(this.data.courseLectureLinks[0].url);
      let playlistUrl = this.data.courseLectureLinks[0].url.split('list=');
      let playlistId = playlistUrl[1];
      this.youtubeService.getPlaylistItem(playlistId).subscribe(
        (res) => {
          this.youtube_api_data = res;
          this.lectureTitle = this.youtube_api_data['items'][0].snippet.title;

          // tslint:disable-next-line:max-line-length
          this.current_link = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.youtube_api_data['items'][0].snippet.resourceId.videoId}`);
        }
      );
    }
  }

  /* For Youtube Video */
  getVideoId(videoId, i): void {
   
    this.selectedVideoIndex = i;
    this.current_link = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${videoId}`);
    this.lectureTitle = this.youtube_api_data['items'][this.selectedVideoIndex].snippet.title;
  }

  setScrollPosition(type, i){

    let itemList = document.getElementsByClassName('item-list-title')[i];
    let playList = document.getElementById("playListItems");
    
    if(type == 'top')
    {
      playList.scrollTop = itemList['offsetTop']-150;
    }
    else
    playList.scrollTop = itemList['offsetTop']-20;
  }
  getPrevious(i): void {    
    this.setScrollPosition('top', i);
    if (i > 0) {
      i--;
      this.selectedVideoIndex = i;
    }

    let videoId = this.getVideoIdByIndex(i);
    this.current_link = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${videoId}`);
    this.lectureTitle = this.youtube_api_data['items'][this.selectedVideoIndex].snippet.title;
  }
  getNext(i): void {
    this.setScrollPosition('bottom', i);
    if (i < this.youtube_api_data.items.length) {
      i++;
      this.selectedVideoIndex = i;
    }
    this.lectureTitle = this.youtube_api_data['items'][this.selectedVideoIndex].snippet.title;
    let videoId = this.getVideoIdByIndex(i);

    this.current_link = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${videoId}`);
  }

  /*End Youtube Video */

  getVideoIdRegularVideo(videoUrl, i): void {

    this.selectedRegularVideoIndex = i;
    this.video_file = videoUrl;
    this.videoplayer.nativeElement.load();
    this.videoplayer.nativeElement.play();
    this.lectureTitle = this.regular_api_data[i].title;
  }
  getRegularPrevious(i): void {
    this.setScrollPosition('top', i);

    // console.log("ok");
    if (i > 0) {
      i--;
      this.selectedRegularVideoIndex = i;
    }
    this.getVideoIdRegularVideo(this.regular_api_data[this.selectedRegularVideoIndex].file, this.selectedRegularVideoIndex);
    this.lectureTitle = this.regular_api_data[i].title;
  }
  getRegularNext(i): void {
    this.setScrollPosition('bottom', i);

    if (i < this.regular_api_data.length) {
      i++;
      this.selectedRegularVideoIndex = i;
    }
    this.getVideoIdRegularVideo(this.regular_api_data[this.selectedRegularVideoIndex].file, this.selectedRegularVideoIndex);
    this.lectureTitle = this.regular_api_data[i].title;
  }

  getVideoIdByIndex(index) {
    return this.youtube_api_data.items[index].snippet.resourceId.videoId;
  }
  

  purchase() {

    const item = this.cartService.storeLocalData(this.data);
    if (item > 0) {
      this.toastr.warning('This item is added already.', 'Info!', this.config);
    }
    else {
      this.dataCommunicationService.itemAddToCart();
      this.toastr.success('This item is added Successfully.', 'Success!', this.config);
    }
  }

  enrollment(): any {

    if (!this.checkLogin) {
        this.router.navigate(['login'], { queryParams: { 'redirectURL': '/course/' + this.activatedRoute.snapshot.url } });
        return false;
    }

    this.btnOpts.active = true;

    this.apiCommon.store('course/enrollment', { course_id: this.courseId }).subscribe(
      (res) => {

        this.btnOpts.active = false;

        if (res.status === 'success') {
          this.buttonDisabled = true;
          this.toastr.success(`${res.message}`, 'Success!', this.config);
        } else {
          this.toastr.warning(`${res.message}`, 'Waring!', this.config);
        }
      },
      (res) => {
        this.btnOpts.active = false;
      }
    );
  }

  openQuizComponent(): void {

    let value = this.regular_api_data.filter( (item , key) => {
      if (key === this.selectedRegularVideoIndex) {
        return item;
      }
    });

    let lecture_id = value[0].lecture_id;

    let dialogRef = this.dialog.open(MarketplaceQuizComponent, {
      width: '1000px',
      panelClass: 'custom-dialog-container',
      disableClose: true,
      data: { lecture_id }
    });
  }

}
