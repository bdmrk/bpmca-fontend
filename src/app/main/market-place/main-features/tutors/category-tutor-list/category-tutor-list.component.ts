import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import { ApiCommonService } from '../../../../../service/common/api-common.service';

@Component({
    selector: 'app-category-tutor-list',
    templateUrl: './category-tutor-list.component.html',
    styleUrls: ['./category-tutor-list.component.scss'],
})
export class CategoryTutorListComponent implements OnInit {

    navigation: any;
   
   
    private categoryId;
    filterApplied: boolean=true;
    selectedIndex: any;


    filterDisplayItemCount=1;
    tutorFilterItems: any;
    tutorFilterItemsInDisplay: any;
    tutorFilterItemsInMenuButton: any;
    innerWidth: number;
    subjectTutorList: any;
    courseTitle: any;
    dataList: any;
   
    constructor(
        private router: Router,
        private apiCommon: ApiCommonService,
        private activatedRoute: ActivatedRoute,
      
    ) {
       
        this.activatedRoute.params.subscribe(params => {
            this.categoryId = +params['category_slug'];
        });
    }

    ngOnInit() {

        this.innerWidth = window.innerWidth;

        if(this.innerWidth<400){
            this.filterDisplayItemCount=1;
        }
        if(this.innerWidth>400 && this.innerWidth<= 600){
            this.filterDisplayItemCount=2;
        }
        if(this.innerWidth>600 && this.innerWidth<= 1100){
            this.filterDisplayItemCount=3;
        }
        if(this.innerWidth>1100 && this.innerWidth<= 1200){
            this.filterDisplayItemCount=5;
        }
        if(this.innerWidth>1200){
            this.filterDisplayItemCount=6;
        }


        this.apiCommon.get('public/homepage/categories').subscribe(
            (res) => {
                
                this.tutorFilterItems = res.course_categories;
                // this.tutorFilterItems.reverse();
                // console.log (this.tutorFilterItems);


                this.tutorFilterItemsInDisplay = this.tutorFilterItems.filter((item, index) => {return index < this.filterDisplayItemCount;});
                this.tutorFilterItemsInMenuButton=this.tutorFilterItems.filter((item,index) => { return index>= this.filterDisplayItemCount })

    
            }
        );

        this.apiCommon.get(`public/subcategory/tutor/${this.categoryId}`).subscribe(
            (res) => {
            
                this.dataList = res.data;
                console.log(res);
                this.courseTitle=res.sub.name;
                // console.log(this.subjectTutorList);

                console.log(res.sub.name);
            }
        );

        this.router.routeReuseStrategy.shouldReuseRoute = () => {
            return false;
        };

    }

    
    allCourses(){

        this.filterApplied=true;
        this.selectedIndex = "";
    }

    getAllTutors(subCategoryId): void{
        // this.data.courses = [];
        this.selectedIndex = subCategoryId;
        this.filterApplied=false;
        
        this.apiCommon.get(`public/class/tutor/${subCategoryId}`).subscribe(
            (res) => {
                this.subjectTutorList = res.data;
            },
            (err)=>{
                this.subjectTutorList=[];
            }
        );
    }



}
