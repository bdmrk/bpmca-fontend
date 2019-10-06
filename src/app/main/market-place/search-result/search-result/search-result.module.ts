import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SearchResultComponent } from '../search-result.component';
import { SharedModule } from '../../shared/shared.module';
import { MatModuleModule } from '../../../mat-module/mat-module.module';

const routes = [
  {
    path: '',
    component: SearchResultComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatModuleModule,
    SharedModule
  ],
  declarations: [SearchResultComponent]
})
export class SearchResultModule {
 }
