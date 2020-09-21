import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { RecordService } from '../services/record.service';
import { EmailValidator } from '@angular/forms';
import { DatabaseService } from '../services/database.service';




@Component({
  selector: 'app-record',
  templateUrl: 'record.page.html',
  styleUrls: ['record.page.scss']
})
export class RecordPage {

  page = 0;
  totalPages = 10;
  resultsCount = 10;
  data = [];
  sortKey = null;
  sortDirection = 0;

  // Chart Data
  chartData: ChartDataSets[] = [
    { data: [], label: 'Daily CHO' },
    { data: [], label: 'Daily Fat' },
    { data: [], label: 'CHO Benchmark' },
    { data: [], label: 'Fat Benchmark' }
  ];
  chartLabels: Label[];

 // Options
 chartOptions = {
  responsive: true,
  title: {
    display: true,
    text: 'Historic Stock price'
  },
  pan: {
    enabled: true,
    mode: 'xy'
  },
  zoom: {
    enabled: true,
    mode: 'xy'
  }
};
chartColors: Color[] = [
  {
    borderColor: '#000000',
    backgroundColor: '#ff00ff'
  }
];
chartType = 'line';
showLegend = false;
// For search
stock = 'AAPL';


  //default segment
  selectTabs='table view'
  constructor(
    private dailyrecorddb: RecordService,
    private http: HttpClient
  
    ) 

    {
    this.loadtableData();
    this.getchartData();
  }


  getchartData() {
    this.http.get(`https://financialmodelingprep.com/api/v3/historical-price-full/${this.stock}?from=2018-03-12&to=2019-03-12`).subscribe(res => {
    const history = res['historical'];

    this.chartLabels = [];
    this.chartData[0].data = [];

    for (let entry of history) {
      this.chartLabels.push(entry.date);
      this.chartData[0].data.push(entry['close']);
    }

  });
}






      loadtableData(){
          console.log("hello");
          console.log('dddd' + this.dailyrecorddb.getRecords());
        }
  



  // loadtableData() {
  //   this.http
  //     .get(`https://randomuser.me/api/?page=${this.page}&results=${this.resultsCount}`)
  //     .subscribe(res => {
  //       this.data = res['results'];
        
  //     });
     
  // }


  nextPage() {
    this.page++;
    this.loadtableData();
  }
 
  prevPage() {
    this.page--;
    this.loadtableData();
  }
 
  goFirst() {
    this.page = 0;
    this.loadtableData();
  }
 
  goLast() {
    this.page = this.totalPages - 1;
    this.loadtableData();
  }
}