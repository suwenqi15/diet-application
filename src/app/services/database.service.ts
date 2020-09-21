import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { BehaviorSubject} from 'rxjs';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private db: SQLiteObject;
  foodsList = new BehaviorSubject([]);
  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private platform: Platform, 
    private sqlite: SQLite, 
<<<<<<< HEAD
  ) {//initial local storage setup
=======
  ) {
>>>>>>> b71bb4e5a3537316666d4abcd6caac687482584c
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'dietdata.db',
        location: 'default'
      })
      .then((db: SQLiteObject) => {
          this.db = db;
      });
    });
  }

  dbState() {
    return this.isDbReady.asObservable();
  }
  getdb(): SQLiteObject{
    return this.db;
  } 

  getDbReady():BehaviorSubject<boolean>{
   return this.isDbReady;

  }

}