import { StorageService } from '../../../../../../service/common/storage.service';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HelperService } from '../../../../../../service/common/helper.service';
import { ApiCommonService } from '../../../../../../service/common/api-common.service';
import { UtilityService } from '../../../../../../service/utility/utility.service';

@Component({
  selector: 'app-course-comment',
  templateUrl: './course-comment.component.html',
  styleUrls: ['./course-comment.component.scss']
})
export class CourseCommentComponent implements OnInit {

  commentForm: FormGroup;
  commentApiData = [];
  courseId;

  replyToggle;
  checkLogin: boolean;
  private config;
  authorName: string;
  constructor(
    private router:Router,
    private helper:HelperService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private apiCommon: ApiCommonService,
    private utility: UtilityService,
    private toastr: ToastrService,
    private storage: StorageService
  ) {
    this.config = {
      timeOut: 3000,
      closeButton: true,
      positionClass: 'toast-top-right',
      enableHtml: true,
  };

    this.activatedRoute.params.subscribe(params => {
      this.courseId = +params['slug'];
    });

    this.commentForm = this.fb.group({
      comment: ['', Validators.required],
      course_id: [this.courseId],
      comment_id: [0],
    });
  }

  ngOnInit() {
    this.helper.isAuthorized() ? this.checkLogin = true : this.checkLogin = false;
    this.authorName = JSON.stringify(this.storage.getUserData().name);

    // course comment
    this.apiCommon.get('manage/course-comment?course_id=' + this.courseId).subscribe(
      (res) => {
        this.commentApiData = res.data;
        this.commentApiData.map( (item, i) => {
         if (item.reply) {
          this.commentApiData[i].reply = JSON.parse(this.commentApiData[i].reply);
         }
        });
      }
    );
  }

  onCommentSubmit(): void {
    if (!this.checkLogin){
      this.toastr.error('Please login first to add a comment', 'Error!', this.config);
  
      this.router.navigate(['login'], { queryParams: { 'redirectURL': '/course/' + this.courseId } });

    }

    this.commentForm.get('course_id').setValue(this.courseId);

    if (this.commentForm.valid) {
      this.apiCommon.store('manage/course-comment', this.commentForm.value).subscribe(
        (res) => {
          if (res.status === 'success') {
            this.commentForm.reset();
            this.ngOnInit();
          }
        }
      );
    }
  }

  onReplySubmit(): void {
    if (!this.checkLogin){
      this.toastr.error('Please login first to add a comment', 'Error!', this.config);
  
      this.router.navigate(['login'], { queryParams: { 'redirectURL': '/course/' + this.courseId } });

    }

    this.commentForm.get('comment').setValue('something');
    if (this.commentForm.valid) {
      this.apiCommon.store('manage/course-comment', this.commentForm.value).subscribe(
        (res) => {
          if (res.status === 'success') {
            this.commentForm.reset();
            this.ngOnInit();
            this.replyToggle = null;
          }
        }
      );
    }
  }

  reply(data, i): void {
    this.replyToggle = i;

    this.commentForm.addControl('reply', new FormControl('', Validators.required));
    this.commentForm.addControl('previous_reply', new FormControl(''));

    this.commentForm.get('previous_reply').setValue(data.reply);
    this.commentForm.get('course_id').setValue(data.course_id);
    this.commentForm.get('comment_id').setValue(data.id);
  }

  getTimeDiff(date): any {
    return this.utility.durationMessage(date);
  }

}
