import { Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { ApiCommonService } from '../../../service/common/api-common.service';
import { DataCommunicationService } from '../../../service/common/data-communication.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {
  subscription: any;
  data:any=[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private apiCommon: ApiCommonService,
    private dataCommunicationService: DataCommunicationService
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function(){
      return false;
   }

   this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
         // trick the Router into believing it's last link wasn't previously loaded
         this.router.navigated = false;
         // if you need to scroll back to top, here is the right place
         window.scrollTo(0, 0);
      }
  });
   }

   ngOnInit(){
    this.subscription = this.dataCommunicationService.getPassedItemData.subscribe((data) => {
      this.data = [];
      this.data = data.data;
    });
   }


}
