import { Component, OnInit } from '@angular/core';
import { HelperService } from '../../../../service/common/helper.service';
import { StorageService } from '../../../../service/common/storage.service';
import { Router } from '@angular/router';
import { DataCommunicationService } from '../../../../service/common/data-communication.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {
  public isLoggedin;

  constructor(private helper: HelperService,
    private storage: StorageService, private router: Router, private dataCommunicationService: DataCommunicationService,) { }

  ngOnInit() {
  }
  
  logout() {
      if (this.helper.isAuthorized()) {
        this.dataCommunicationService.setBasketClear({ actionType: 'logout' });
          this.storage.clear();
          this.isLoggedin = false;
          this.router.navigate(['/']);
      } else {
          this.isLoggedin = false;
          this.router.navigate(['/']);
      }
  
    
}

}
