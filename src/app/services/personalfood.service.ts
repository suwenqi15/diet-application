import { Injectable } from '@angular/core';
import { Personal } from './food';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { DatabaseService } from '../services/database.service';


@Injectable({
  providedIn: 'root'
})
export class PersonalfoodService {
  personalsList = new BehaviorSubject([]);
  

  constructor(
    private dbservice: DatabaseService, 
    private httpClient: HttpClient,
    private sqlPorter: SQLitePorter
  ) { }

 
  fetchPersonals(): Observable<Personal[]> {
    return this.personalsList.asObservable();
  }

  // Render data
  getData() {
    this.httpClient.get(
      'assets/data.sql', 
      {responseType: 'text'}
    ).subscribe(data => {
      this.sqlPorter.importSqlToDb(this.dbservice.getdb(), data)
        .then(_ => {
          this.getPersonals();
          this.dbservice.getDbReady().next(true);
        })
        .catch(error => console.error(error));
    });
  }

  // Get list
  getPersonals(){
    return this.dbservice.getdb().executeSql('SELECT * FROM personalfoodtable', []).then(res => {
      let items: Personal[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) { 
          items.push({ 
            id: res.rows.item(i).id,
            uuid: res.rows.item(i).uuid,
            timeframe: res.rows.item(i).timeframe,  
            category: res.rows.item(i).category,
            food_name: res.rows.item(i).food_name,  
            food_type: res.rows.item(i).food_type,  
            unit: res.rows.item(i).unit,  
            qty: res.rows.item(i).qty, 
            cho: res.rows.item(i).cho, 
            fat: res.rows.item(i).fat
           });
        }
      }
      this.personalsList.next(items);
    });
  }

  // Add
  addPersonal(uuid, timeframe, category, food_name, unit,qty,cho,fat) {
    let data = [ uuid, timeframe, category, food_name, unit,qty,cho,fat];
    return this.dbservice.getdb().executeSql('INSERT INTO personalfoodtable (uuid, timeframe, category, food_name, food_type, unit,qty,cho,fat) VALUES (?, ?, ?, ?, ?, ?, ?, ?,?)', data)
    .then(res => {
      this.getPersonals();
      
    });
  }
 
  // Get single object
  getPersonal(id): Promise<Personal> {
    return this.dbservice.getdb().executeSql('SELECT * FROM personalfoodtable WHERE id = ?', [id]).then(res => { 
      return {
        id: res.rows.item(0).id,
        uuid: res.rows.item(0).uuid,
        timeframe: res.rows.item(0).timeframe,
        category: res.rows.item(0).category,
        food_name: res.rows.item(0).food_name,  
        food_type: res.rows.item(0).food_type,   
        unit: res.rows.item(0).unit,  
        qty: res.rows.item(0).qty, 
        cho: res.rows.item(0).cho, 
        fat: res.rows.item(0).fat
      }
    });
  }


  // Delete
  deletePersonal(uuid) {
    var q =  "DELETE FROM personalfoodtable WHERE uuid = " +'"' + uuid + '"';
    return this.dbservice.getdb().executeSql(q)
    .then(_ => {
      this.getPersonals();
    });
  }

}
