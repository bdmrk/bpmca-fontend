import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { ApiCommonService } from '../../../../../service/common/api-common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DataCommunicationService } from '../../../../../service/common/data-communication.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-category-board-question',
  templateUrl: './category-board-question.component.html',
  styleUrls: ['./category-board-question.component.scss']
})
export class CategoryBoardQuestionComponent implements OnInit {

  categoryId: number;
  categoryMCQlist;
  categoryBQTitle: any="All";
  subcategoryCourses = [];
  subcategoryCoursesDisplay = [];
  subcategoryCoursesMenu = [];
  testBrowser: any;
  innerWidth: number;
  filterDisplayItemCount: number=1;
  filterApplied: boolean;
  subcription: any;
  categoryBQlist=[];
  selectedIndex: string;
  subjectName: string;
  warningDiv: boolean=false;

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

    this.allBoardQuestionWithCategory();
    this.setFilterItemsByDeviceWidth();

   
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
  }

  allBoardQuestionWithCategory(){
    this.filterApplied = true;
    this.selectedIndex="";
    this.categoryMCQlist=[];
    this.subjectName="সব";
    this.apiCommon.get(`public/previous-question/${this.categoryId}`).subscribe(
      (res) => {
          // console.log(res);
          this.categoryBQlist=res.question_sets;
          this.categoryBQTitle=res.course_title;

          this.subcategoryCourses = res.subjects;
          this.subcategoryCoursesDisplay = this.subcategoryCourses.filter((item, index) => { return index < this.filterDisplayItemCount; });
          this.subcategoryCoursesMenu = this.subcategoryCourses.filter((item, index) => { return index >= this.filterDisplayItemCount })
          this.warningDiv=false;
        },
      (error)=>{
        this.warningDiv=true;
      }
    );
  }
  getAllBQ(subCategoryId): void {
    this.filterApplied = false;
    this.selectedIndex = subCategoryId;
    this.categoryBQlist=[];
    // console.log(subCategoryId);
    this.apiCommon.get(`public/previous-question/${this.categoryId}?subject_id=${subCategoryId}`).subscribe(
      (res) => {
        this.categoryBQlist = res.question_sets;
        this.warningDiv=false;
      },
      (error)=>{
        this.warningDiv=true;
      }
    );
  }

  bqDetails(id): void{
    this.dataCommunicate.setPassedItemData(
      {
        id: id,
        categoryBQlist: this.categoryBQlist
      }

    );
    this.router.navigateByUrl('/bq/bqDetails');
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
