import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataCommunicationService } from '../../../../../../service/common/data-communication.service';

@Component({
  selector: 'app-compare-progress',
  templateUrl: './compare-progress.component.html',
  styleUrls: ['./compare-progress.component.scss']
})
export class CompareProgressComponent implements OnInit {

  testarray = [];
  // heightCanvas=500;
  @Input() progressData;

  public barChartOptions = {
    scaleShowVerticalLines: false,
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      xAxes: [
        {
          labelString: 'Tests',
        }
      ],
      yAxes: [{
        ticks: {
          beginAtZero: true,
          stepSize: 2,
          max: 30,
        },
        labelString: 'Marks',
        stacked: false
      }]
    }
  };
  public lineChartColors = [
    { // grey
      backgroundColor: 'rgba(255, 255, 255, 0)',
      borderColor: 'rgba(212, 33, 78, 1)',
      pointBackgroundColor: 'rgba(212, 33, 78, 1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: 'rgba(212, 33, 78, 1)',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)',
      pointRadius: 5,
      pointHoverRadius: 5

    },
    {
      backgroundColor: 'rgba(255, 255, 255, 0)',
      borderColor: 'rgba(24, 55, 154, 1)',
      pointBackgroundColor: 'rgba(24, 55, 154, 1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: 'rgba(24, 55, 154, 1)',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)',
      pointRadius: 5,
      pointHoverRadius: 5
    },
    {
      backgroundColor: 'rgba(255, 255, 255, 0)',
      borderColor: 'rgba(205, 228, 196, 1)',
      pointBackgroundColor: 'rgba(205, 228, 196, 1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: 'rgba(205, 228, 196, 1)',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)',
      pointRadius: 5,
      pointHoverRadius: 5
    },
    {
      backgroundColor: 'rgba(255, 255, 255, 0)',
      borderColor: 'rgba(23, 84, 13, 1)',
      pointBackgroundColor: 'rgba(23, 84, 13, 1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: 'rgba(23, 84, 13, 1)',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)',
      pointRadius: 5,
      pointHoverRadius: 5
    },
    {
      backgroundColor: 'rgba(255, 255, 255, 0)',
      borderColor: 'rgba(53, 86, 115, 1)',
      pointBackgroundColor: 'rgba(53, 86, 115, 1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: 'rgba(53, 86, 115, 1)',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)',
      pointRadius: 5,
      pointHoverRadius: 5
    },
  ];
  public barChartLabels;
  public barChartType;
  public barChartLegend;
  public barChartData = [];


  constructor() { }

  ngOnInit() {
    this.constructTestArray();
    this.barChartLabels = this.testarray;
    this.barChartType = 'line';
    this.barChartLegend = true;
    this.barChartData = this.progressData ? this.progressData : [];
  }

  constructTestArray() {

    for (let i = 1; i <= 50; i++) {
      this.testarray.push(i);
    }
  }

}
