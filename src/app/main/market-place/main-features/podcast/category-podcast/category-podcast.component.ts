import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiCommonService } from '../../../../../service/common/api-common.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-category-podcast',
  templateUrl: './category-podcast.component.html',
  styleUrls: ['./category-podcast.component.scss']
})
export class CategoryPodcastComponent implements OnInit {
  categoryId: number;
  categoryPodcastlist: any;
  warningDiv: boolean;
  categoryPodcastitle: any;
  subcategoryPodcast=[];
  subcategoryPodcastMenu=[];
  filterDisplayItemCount: any=1;
  subcategoryPodcastDisplay=[];
  testBrowser: any;
  innerWidth: number;

  constructor(
    private router :Router,
    private apiCommon: ApiCommonService,
    private activatedRoute: ActivatedRoute,
    @Inject(PLATFORM_ID) platformId: string,
   
    ) { 
    this.testBrowser = isPlatformBrowser(platformId);
    this.activatedRoute.params.subscribe(params => {
      this.categoryId = +params['category_slug'];
    });
  }

  ngOnInit() {

    this.getAllPodcast();
    this.setFilterItemsByDeviceWidth();
    
  }

  getAllPodcast(){

    this.apiCommon.get(`public/mcq-test/${this.categoryId}`).subscribe(
      (res) => {
        console.log(res);
        this.categoryPodcastitle= res.course_title.name;

        this.subcategoryPodcast = res.subjects;
        
        this.subcategoryPodcastDisplay = this.subcategoryPodcast.filter((item, index) => { return index < this.filterDisplayItemCount; });
        this.subcategoryPodcastMenu = this.subcategoryPodcast.filter((item, index) => { return index >= this.filterDisplayItemCount })
       
        if(res.length==0){
          this.warningDiv=true;
        }
        else{
          this.categoryPodcastlist = res;
          this.warningDiv=false;
        }
       
      },
      (error)=>{
        this.warningDiv=true;
      }
    );
  }
  gotoPodcastDetail(){
    this.router.navigateByUrl('/podcast/podcast-details');
  }
  setFilterItemsByDeviceWidth(){
    if (this.testBrowser) {
      this.innerWidth = window.innerWidth;
      if (this.innerWidth < 400) {
          this.filterDisplayItemCount = 1;
      }
      if (this.innerWidth > 400 && this.innerWidth <= 500) {
          this.filterDisplayItemCount = 2;
      }
      if (this.innerWidth > 500 && this.innerWidth <= 600) {
          this.filterDisplayItemCount = 3;
      }
      if (this.innerWidth > 600 && this.innerWidth <= 800) {
          this.filterDisplayItemCount = 4;
      }
      if (this.innerWidth > 800 && this.innerWidth <= 1100) {
          this.filterDisplayItemCount = 4;
      }
      if (this.innerWidth > 1100) {
          this.filterDisplayItemCount = 5;
      }
    }
  }

}
