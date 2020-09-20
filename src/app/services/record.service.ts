import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Record } from './food';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class RecordService {


  private storage: SQLiteObject;
  recordsList = new BehaviorSubject([]);
  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public resultJson = [];

  constructor(
    private platform: Platform, 
    private sqlite: SQLite, 
    private httpClient: HttpClient,
    private sqlPorter: SQLitePorter,


  ) {

    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'dailyrecordtable.db',
        location: 'default'
      })
      .then((db: SQLiteObject) => {
          this.storage = db;
          this.getData();
      });
    });
    
   }


   dbState() {
    return this.isDbReady.asObservable();
  }

  fetchRecords(): Observable<Record[]> {
    return this.recordsList.asObservable();
  }

  // Render data
  getData() {
    this.httpClient.get(
      'assets/data.sql', 
      {responseType: 'text'}
    ).subscribe(data => {
      this.sqlPorter.importSqlToDb(this.storage, data)
        .then(_ => {
          this.getRecords();
          this.isDbReady.next(true);
        })
        .catch(error => console.error(error));
    });
  }



  getRecords(){
    return this.storage.executeSql('SELECT * FROM dailyrecordtable', []).then(res => {
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

  exportJson(){
    console.log("kyl: exporting in service");
    this.sqlPorter.exportDbToJson(this.storage).then(res=>{
      //this.resultJson = res.data.inserts.dailyrecordtable
      console.log("kyl: read "+ res);
    //   console.log("kyl: read res result json in service"+ res);
    //  console.log("kyl: read result json in service"+ res.data.inserts.dailyrecordtable);

    });
  }

  //this.dailyrecorddb.addRecord( this.myDate ,this.curChoTotal,this.curFatTotal);
  // Add


  banana(){
    return this.storage.executeSql('SELECT * FROM dailyrecordtable', []).then(res => {
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
    return this.storage.executeSql('INSERT INTO dailyrecordtable (timeframe, dailycho, dailyfat ) VALUES (?, ?, ?)', data)
    .then(res => {
      this.getRecords();
      
    });
  }




}
