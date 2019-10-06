import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { ApiCommonService } from '../../../../service/common/api-common.service';

export interface State {
  id: string;
  name: string;
}


@Component({
  selector: 'app-find-tutor-area',
  templateUrl: './find-tutor-area.component.html',
  styleUrls: ['./find-tutor-area.component.scss']
})
export class FindTutorAreaComponent implements OnInit {

  stateCtrl = new FormControl();
  filteredStates: Observable<State[]>;

  states: State[] = [
    // {
    //   name: 'Arkansas',
    //   id: '2.978M'
    // }
  ];

  constructor(
    private apiCommon: ApiCommonService,
  ) {
    this.filteredStates = this.stateCtrl.valueChanges
      .pipe(
        startWith(''),
        map(state => state ? this._filterStates(state) : this.states.slice())
      );
  }

  private _filterStates(value: string): State[] {
    const filterValue = value.toLowerCase();

    return this.states.filter(state => state.name.toLowerCase().indexOf(filterValue) === 0);
  }


  ngOnInit() {
    
      this.apiCommon.get('public/tutors/create').subscribe(
        (res) => {
          
          this.states = res.data;
        }
    );
  }

}
