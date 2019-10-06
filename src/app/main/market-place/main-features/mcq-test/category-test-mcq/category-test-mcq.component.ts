import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { ApiCommonService } from '../../../../../service/common/api-common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DataCommunicationService } from '../../../../../service/common/data-communication.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-category-test-mcq',
  templateUrl: './category-test-mcq.component.html',
  styleUrls: ['./category-test-mcq.component.scss']
})
export class CategoryTestMcqComponent implements OnInit ,OnDestroy {

  categoryId: number;
  categoryMCQlist;
  categoryMCQTitle: any;
  subcategoryCourses = [];
  subcategoryCoursesDisplay = [];
  subcategoryCoursesMenu = [];
  testBrowser: any;
  innerWidth: number;
  filterDisplayItemCount: number=1;
  
  categoryMCQlistFilter=[];
  selectedIndex: any;
  getCourseDetailsDataSubscription;
  filterApplied;
  subjectName="All";
  warningDiv: boolean;

  constructor(  
    private apiCommon: ApiCommonService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    @Inject(PLATFORM_ID) platformId: string,
    private dataCommunicate: DataCommunicationService
    ) { 
    this.testBrowser = isPlatformBrowser(platformId);
    this.activatedRoute.params.subscribe(params => {
      this.categoryId = +params['category_slug'];
    });
  }

  ngOnInit() {

    this.getAllMCQTestSet();
    this.setFilterItemsByDeviceWidth();

    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
  }

  getAllMCQTestSet(){
    this.filterApplied = true;
    this.selectedIndex="";
    this.categoryMCQlist=[];
    this.subjectName="সব";
    this.apiCommon.get(`public/mcq-test/${this.categoryId}`).subscribe(
      (res) => {

          this.categoryMCQTitle= res.course_title.name;

          this.subcategoryCourses = res.subjects;
          this.subcategoryCoursesDisplay = this.subcategoryCourses.filter((item, index) => { return index < this.filterDisplayItemCount; });
          this.subcategoryCoursesMenu = this.subcategoryCourses.filter((item, index) => { return index >= this.filterDisplayItemCount })
         
          if(res.question_sets.length==0){
            this.warningDiv=true;
          }
          else{
            this.categoryMCQlist=res.question_sets;
            this.warningDiv=false;
          }
         
        },
        (error)=>{
          this.warningDiv=true;
        }
    );
  }

 
  getMCQTestSet(subCategoryId): void {

    this.filterApplied=false;
    this.selectedIndex = subCategoryId;
    this.subcategoryCourses.filter(item =>{
      
      if(item.id==subCategoryId){ this.subjectName = item.name; }
      
    }); 
  
    this.apiCommon.get(`public/mcq-test/${this.categoryId}?subject_id=${subCategoryId}`).subscribe(
      (res) => {
  
        if(res.length==0){
          this.warningDiv=true;
        }
        else{
          this.categoryMCQlist = res;
          this.warningDiv=false;
        }
       
      },
      (error)=>{
        this.warningDiv=true;
      }
    );
  }

  gotoMCQTestDetail(set): void{
    this.dataCommunicate.setPassedItemData(set);
    this.router.navigateByUrl('/mcq-test/mcq-test-detail');
  }
  ngOnDestroy(): void {
    // this.getCourseDetailsDataSubscription.unsubscribe();
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
