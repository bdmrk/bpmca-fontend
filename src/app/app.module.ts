import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AppComponent} from './app.component';
import {TransferHttpCacheModule} from '@nguniversal/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatModuleModule } from './main/mat-module/mat-module.module';
import { ToastrModule } from 'ngx-toastr';
import { StarRatingModule } from 'angular-star-rating';


const routes: Routes = [
  {
      path: '',
      loadChildren: './main/market-place/market-place.module#MarketPlaceModule'

  },
  {
      path: '**',
      redirectTo: ''
  },
];


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'my-app'}),
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes,{
      scrollPositionRestoration: 'enabled',
      // enableTracing:true
      // scrollOffset:[1000,1000]
    }),
    // ChartsModule,
    MatModuleModule,
    ToastrModule.forRoot(),
    StarRatingModule.forRoot(),
    TransferHttpCacheModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
