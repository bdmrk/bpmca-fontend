import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { MatProgressButtonOptions } from 'mat-progress-buttons';
import { ApiCommonService } from '../../../../../service/common/api-common.service';
import { DataCommunicationService } from '../../../../../service/common/data-communication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { DOCUMENT, Meta, DomSanitizer } from '@angular/platform-browser';
import { FormBuilder } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-podcast-details',
  templateUrl: './podcast-details.component.html',
  styleUrls: ['./podcast-details.component.scss']
})
export class PodcastDetailsComponent implements OnInit {


  public data;
  public courseId;
  public innerWidth: any;
  public mobileDetected = false;

  testBrowser: any;

  constructor(
      private apiCommon: ApiCommonService,
      private dataService:DataCommunicationService,
      private activatedRoute: ActivatedRoute,
      private router: Router,
      public dialog: MatDialog,
      @Inject(DOCUMENT) private document: Document,
      private fb: FormBuilder,
      private meta: Meta,
      @Inject(PLATFORM_ID) platformId: string,
      private sanitizer: DomSanitizer
  ) {
      this.testBrowser = isPlatformBrowser(platformId);
      this.activatedRoute.params.subscribe(params => {
          this.courseId = +params['slug'];
      });

      this.activatedRoute.params.subscribe(params => {
          this.courseId = +params['slug'];
      });

      this.router.routeReuseStrategy.shouldReuseRoute = function () {
          return false;
      };
  }

  ngOnInit() {
      if (this.testBrowser) {
          this.apiCommon.get(`public/course/${this.courseId}`).subscribe(
              (res) => {
                  this.data = res.data;
                  console.log(res.data);
            
              }
          );

          if (this.testBrowser) {
              this.innerWidth = window.innerWidth;
          }

          this.mobileDetection();
      }
  }
  mobileDetection() {
      if (this.innerWidth <= 576) {
          this.mobileDetected = true;
      }
  }
  gotomcq(){

     
  }
  gotoAllMcq(){

  
  }
  gotomcqTest(){

    
  }
  gotobq(){


  }

}
