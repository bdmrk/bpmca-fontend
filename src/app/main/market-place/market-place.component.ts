import { Component, OnInit, ElementRef, HostListener, ViewChild } from '@angular/core';
import { ApiCommonService } from '../../service/common/api-common.service';
import { HeaderComponent } from './shared/header/header.component';
import { DataCommunicationService } from '../../service/common/data-communication.service';
import { StorageService } from '../../service/common/storage.service';

@Component({
  selector: 'app-market-place',
  templateUrl: './market-place.component.html',
  styleUrls: ['./market-place.component.scss']
})
export class MarketPlaceComponent implements OnInit {
  categories: any;
  wasInside: any;
  showUserDashboardMenu: boolean;


  constructor( 
    private apiCommon: ApiCommonService,
    private eRef:ElementRef,
    private dataservice:DataCommunicationService,
    private storage: StorageService
     ) { }

    // @HostListener('click')
    clickInside() {
      this.wasInside = true;
    }
    
    // @HostListener('document:click')
    clickout() {
        this.dataservice.setHeaderData(true);
        // this.header.isCourseOpen=false;
        
      }
    
  ngOnInit() {
    this.apiCommon.get('public/homepage/categories').subscribe(
      (res) => {
          this.categories = res.course_categories;
          // this.tutor_catergories = res.tutor_catergories;
      }
    );
    let storage = this.storage.getUserData();
    if(storage){
      this.showUserDashboardMenu =true;
    }else{
      this.showUserDashboardMenu =false;
    }
  }

}
