import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { SQLite } from '@ionic-native/sqlite/ngx';



import { HttpClientModule } from '@angular/common/http';
import { Papa } from 'ngx-papaparse';
import { File } from '@ionic-native/file/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { AutoCompleteModule } from 'ionic4-auto-complete';


import 'chartjs-plugin-zoom';
import { DatabaseService } from './services/database.service';

import 'chartjs-plugin-zoom';
import { DatabaseService } from './services/database.service';

@NgModule({
  declarations: [AppComponent
  ],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    HttpClientModule,AutoCompleteModule

  ],
  
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    File,
    Papa,
    SocialSharing, 
    SQLite,
    SQLitePorter,
<<<<<<< HEAD
    DatabaseService, 
    
=======
    DatabaseService
>>>>>>> b71bb4e5a3537316666d4abcd6caac687482584c
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
