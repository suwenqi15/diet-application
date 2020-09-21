import { Injectable } from '@angular/core';
import { Account } from './food';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { DatabaseService } from '../services/database.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  accountsList = new BehaviorSubject([]);
 

  constructor(
    private dbservice: DatabaseService, 
    private httpClient: HttpClient,
    private sqlPorter: SQLitePorter

  ) {}

 
 
  fetchAccounts(): Observable<Account[]> {
    return this.accountsList.asObservable();
  }

  // Render data
  getData() {
    this.httpClient.get(
      'assets/data.sql', 
      {responseType: 'text'}
    ).subscribe(data => {
      this.sqlPorter.importSqlToDb(this.dbservice.getdb(), data)
        .then(_ => {
          this.getAccounts();
          this.dbservice.getDbReady().next(true);
        })
        .catch(error => console.error(error));
    });
  }

  // Get list
  getAccounts(){
    return this.dbservice.getdb().executeSql('SELECT * FROM accounttable', []).then(res => {
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

  // Get single object
  getAccount(id): Promise<Account> {
    return this.dbservice.getdb().executeSql('SELECT * FROM accounttable WHERE id = ?', [id]).then(res => { 
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

  // Add
    addAccount(id,  patientid, firstname, lastname, email,birthday,chobenchmark,fatbenchmark) {
      let data = [ id, patientid, firstname, lastname, email,birthday,chobenchmark,fatbenchmark];
      return this.dbservice.getdb().executeSql('INSERT INTO accounttable (patientid, firstname, lastname, email,birthday,chobenchmark,fatbenchmark) VALUES (?, ?, ?, ?, ?, ?, ?)', data)
      .then(res => {
        this.getAccounts();
        
      });
    }
   

  //Update
  updateAccounts(id, account: Account) {
    let data = [account.patientid, account.firstname, account.lastname, account.email,account.birthday,account.chobenchmark,account.fatbenchmark ];
    return this.dbservice.getdb().executeSql(`UPDATE accounttable SET, patientid=?, firstname = ?, lastname = ? email = ?, birthday=?, chobenchmark=?,fatbenchmark=?  WHERE id = ${id}`, data)
    .then(data => {
      this.getAccounts();
    })
  }

  // Delete
  deleteSong(id) {
    return this.dbservice.getdb().executeSql('DELETE FROM accounttable WHERE id = ?', [id])
    .then(_ => {
      this.getAccounts();
    });
  }
}
