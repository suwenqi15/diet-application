import { Injectable } from '@angular/core';
import { Record } from './food';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { DatabaseService } from '../services/database.service';

@Injectable({
  providedIn: 'root'
})
export class RecordService {
  recordsList = new BehaviorSubject([]);
  
  constructor(
    private dbservice: DatabaseService, 
    private httpClient: HttpClient,
    private sqlPorter: SQLitePorter


  ) {}



  fetchRecords(): Observable<Record[]> {
    return this.recordsList.asObservable();
  }

  // Render data
  getData() {
    this.httpClient.get(
      'assets/data.sql', 
      {responseType: 'text'}
    ).subscribe(data => {
      this.sqlPorter.importSqlToDb(this.dbservice.getdb(), data)
        .then(_ => {
          this.getRecords();
          this.dbservice.getDbReady().next(true);
        })
        .catch(error => console.error(error));
    });
  }



  getRecords(){
    return this.dbservice.getdb().executeSql('SELECT * FROM dailyrecordtable', []).then(res => {
      let items: Record[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) { 
          items.push({ 
            id: res.rows.item(i).id,
            timeframe: res.rows.item(i).timeframe,  
            dailycho: res.rows.item(i).dailycho, 
            dailyfat: res.rows.item(i).dailyfat
           });
           
        }
      }
      this.recordsList.next(items);
    });
  }


  addRecord( timeframe, dailycho, dailyfat) {
    let data = [ timeframe, dailycho,dailyfat];
    console.log('lol' + data)
    return this.dbservice.getdb().executeSql('INSERT INTO dailyrecordtable (timeframe, dailycho, dailyfat ) VALUES (?, ?, ?)', data)
    .then(res => {
      this.getRecords();
      
    });
  }


  }
  
  







