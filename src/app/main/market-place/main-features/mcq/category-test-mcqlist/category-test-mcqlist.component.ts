import { Component, OnInit, Inject, PLATFORM_ID, OnDestroy } from '@angular/core';
import { ApiCommonService } from '../../../../../service/common/api-common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { DataCommunicationService } from '../../../../../service/common/data-communication.service';

@Component({
  selector: 'app-category-test-mcqlist',
  templateUrl: './category-test-mcqlist.component.html',
  styleUrls: ['./category-test-mcqlist.component.scss']
})
export class CategoryTestMcqlistComponent implements OnInit,OnDestroy {
  categoryId: number;
  categoryMCQlist;
  categoryMCQTitle: any;
  subcategoryCourses = [];
  subcategoryCoursesDisplay = [];
  subcategoryCoursesMenu = [];
  testBrowser: any;
  innerWidth: number;
  filterDisplayItemCount: number=1;
  filterApplied: boolean;
  categoryMCQlistFilter=[];
  selectedIndex: any;
  getCourseDetailsDataSubscription;
  subjectName;
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


    this.getAllSet();
    this.setFilterItemsByDeviceWidth();

    // this.dataCommunicate.getPassedItemData.subscribe(
    //   (data)=>{
    //     // console.log(data.subject_id);
    //     this.getAllMCQ(data.subject_id);
    //   }
    // );

   
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
        return false;
    };
  }

 
  getAllSet(){
    // console.log("getALLSet");
    this.filterApplied = true;
    this.selectedIndex="";
    this.categoryMCQlist=[];
    this.subjectName="সব";

    this.apiCommon.get(`public/mcq/${this.categoryId}`).subscribe(
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

 
  getAllMCQ(subCategoryId): void {
  
    this.filterApplied = false;
    this.selectedIndex = subCategoryId;
    this.subcategoryCourses.filter(item =>{
      
      if(item.id==subCategoryId){ this.subjectName = item.name; }
      
    }); 
    // console.log(this.subjectName);

    this.apiCommon.get(`public/mcq/${this.categoryId}?subject_id=${subCategoryId}`).subscribe(
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

  mcqDetails(set): void{
    this.dataCommunicate.setPassedItemData(set);
    this.router.navigateByUrl('/mcq/mcq-details');
  }
  ngOnDestroy(): void {
   
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
      if (this.innerWidth > 1100 && this.innerWidth <= 1200) {
          this.filterDisplayItemCount = 5;
      }
      if (this.innerWidth > 1200) {
          this.filterDisplayItemCount = 6;
      }
    }
  }

}
