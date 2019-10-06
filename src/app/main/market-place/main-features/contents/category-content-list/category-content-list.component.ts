import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiCommonService } from '../../../../../service/common/api-common.service';

@Component({
  selector: 'app-category-content-list',
  templateUrl: './category-content-list.component.html',
  styleUrls: ['./category-content-list.component.scss']
})
export class CategoryContentListComponent implements OnInit {

  public data;
  private categoryId;

  constructor(
    private apiCommon: ApiCommonService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { 

    this.activatedRoute.params.subscribe(params => {
        this.categoryId = +params['category_slug'];
    });

    this.router.routeReuseStrategy.shouldReuseRoute = () => {
        return false;
    };
  }

  ngOnInit() {

    this.apiCommon.get(`public/category/${this.categoryId}/courses?content_type=${1}`).subscribe(
      (res) => {
          this.data = res.data;
      }
    );

  }

}
