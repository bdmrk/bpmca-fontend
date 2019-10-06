import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-community-area',
    templateUrl: './community-area.component.html',
    styleUrls: ['./community-area.component.scss']
})
export class CommunityAreaComponent implements OnInit {

    @Input() qBanks: any;

    constructor() {
    }

    ngOnInit() {
    }

}
