import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiCommonService } from '../../../../../../service/common/api-common.service';

@Component({
 selector: 'app-course-contain',
 templateUrl: './course-contain.component.html',
 styleUrls: ['./course-contain.component.scss']
})
export class CourseContainComponent implements OnInit {

 @Input() data;

  commentForm: FormGroup;
  commentApiData = [];
  courseId;

 constructor(
   private fb: FormBuilder,
   private activatedRoute: ActivatedRoute,
   private apiCommon: ApiCommonService,
 ) { 

   this.activatedRoute.params.subscribe(params => {
     this.courseId = +params['slug'];
   });

   this.commentForm = this.fb.group({
     comment: ['', Validators.required],
     course_id: [this.courseId]
   });

  }

 ngOnInit() {

    // course comment
    this.apiCommon.get('manage/course-comment?course_id=' + this.courseId).subscribe(
     (res) => {
       this.commentApiData = res.data;
     }
   );

 }

 onCommentSubmit(): void {

   if (this.commentForm.valid) {
     this.apiCommon.store('manage/course-comment', this.commentForm.value).subscribe(
       (res) => {
       }
     );
   }
 }

}
