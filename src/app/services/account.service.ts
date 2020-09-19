import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Account } from './food';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private storage: SQLiteObject;
  accountsList = new BehaviorSubject([]);
  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private platform: Platform, 
    private sqlite: SQLite, 
    private httpClient: HttpClient,
    private sqlPorter: SQLitePorter,
  ) {
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'accounttable.db',
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
 
  fetchAccounts(): Observable<Account[]> {
    return this.accountsList.asObservable();
  }

  // Render data
  getData() {
    this.httpClient.get(
      'assets/data.sql', 
      {responseType: 'text'}
    ).subscribe(data => {
      this.sqlPorter.importSqlToDb(this.storage, data)
        .then(_ => {
          this.getAccounts();
          this.isDbReady.next(true);
        })
        .catch(error => console.error(error));
    });
  }

  // Get list
  getAccounts(){
    return this.storage.executeSql('SELECT * FROM accounttable', []).then(res => {
      let items: Account[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) { 
          items.push({ 
            id: res.rows.item(i).id,
            patientid: res.rows.item(i).patientid,  
            firstname: res.rows.item(i).firstname, 
            lastname: res.rows.item(i).lastname, 
            email: res.rows.item(i).email,
            birthday:res.rows.item(i).birthday,
            chobenchmark:res.rows.item(i).chobenchmark,
            fatbenchmark:res.rows.item(i).fatbenchmark,

            
           });
        }
      }
      this.accountsList.next(items);
    });
  }

  // Add
  addAccount(id,  patientid, firstname, lastname, email,birthday,chobenchmark,fatbenchmark) {
    let data = [ id, patientid, firstname, lastname, email,birthday,chobenchmark,fatbenchmark];
    return this.storage.executeSql('INSERT INTO accounttable (patientid, firstname, lastname, email,birthday,chobenchmark,fatbenchmark) VALUES (?, ?, ?, ?, ?, ?, ?)', data)
    .then(res => {
      this.getAccounts();
      
    });
  }
 
  // Get single object
  getAccount(id): Promise<Account> {
    return this.storage.executeSql('SELECT * FROM accounttable WHERE id = ?', [id]).then(res => { 
      return {
        id: res.rows.item(0).id,
        patientid: res.rows.item(0).patientid,  
        firstname: res.rows.item(0).firstname, 
        lastname: res.rows.item(0).lastname, 
        email: res.rows.item(0).email,
        birthday:res.rows.item(0).birthday,
        chobenchmark:res.rows.item(0).chobenchmark,
        fatbenchmark:res.rows.item(0).fatbenchmark,
        
      }
    });
  }


  Update
  updateAccounts(id, account: Account) {
    let data = [account.patientid, account.firstname, account.lastname, account.email,account.birthday,account.chobenchmark,account.fatbenchmark ];
    return this.storage.executeSql(`UPDATE accounttable SET, patientid=?, firstname = ?, lastname = ? email = ?, birthday=?, chobenchmark=?,fatbenchmark=?  WHERE id = ${id}`, data)
    .then(data => {
      this.getAccounts();
    })
  }

  // // Delete
  // deleteFood(uuid) {
  //   var q =  "DELETE FROM dailyfoodtable WHERE uuid = " +'"' + uuid + '"';
  //   console.log("the query is : " + q);
  //   return this.storage.executeSql(q)
  //   .then(_ => {
  //     this.getFoods();
  //   });
  // }



}
