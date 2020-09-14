import { Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder } from "@angular/forms";
import { DbService } from './../services/db.service';
import { ToastController } from '@ionic/angular';
import { Router } from "@angular/router";
import {AutoCompleteService} from 'ionic4-auto-complete';
import { Papa } from 'ngx-papaparse';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page { 

  mainForm: FormGroup;
  Data: any[] = []
  sum1;
  sum2;
  sum3;
  sum4;
  sum5;
  sum6;
  sum7;
  sum8;
  sum9;
  sum10;
  sum11;
  sum12;
  sum13;
  sum14;
  items;
  public anArray:any=[];
   myDate = new Date().toISOString().split('T')[0];
   type: string
 
  constructor(
    
    private http: HttpClient,
    private db: DbService,
    public formBuilder: FormBuilder,
    private toast: ToastController,
    private router: Router    
    )
   { 
     
    let banana = {
      food_name: "banana",
      category:[''],
      unit: [''],
      qty: [''],
      cho: [''],
      fat: [''],
    }


    this.type = 'breakfast';
    this.anArray.push(banana);
    this.anArray.push(banana);
    //{title: 'default-item1'},
    //{title: 'default-item2'}
   
  

  
  }



   removeItem(i){
    for(let j = 0; j < this.anArray.length; j++) {
      if(j == i){
        this.anArray.splice(j, 1);
        this.deleteFood(j);
      }
    }
  }

  deleteFood(id){
    this.db.deleteFood(id).then(async(res) => {
      let toast = await this.toast.create({
        message: 'Food deleted',
        duration: 2500
      });
      toast.present();      
    })
  }
  
  segmentChanged(ev: any) {}

  Add(){
    //this.Reset();
    let number = this.anArray.length + 1
    //this.anArray.push({title:'item'+ number});
    this.anArray.push(this.mainForm);
    this.Reset();
    console.log(this.anArray)
  }

  Reset(){
    this.mainForm = this.formBuilder.group({
      food_name: [''],
      category:[''],
      unit: [''],
      qty: [''],
      cho: [''],
      fat: [''],

    })

   }
  
    ngOnInit() {
      this.db.dbState().subscribe((res) => {
        if(res){
          this.db.fetchFoods().subscribe(item => {
            this.Data = item
            this.chosum1();
            this.fatsum2();
            // this.chosum3();
            // this.fatsum4();
            // this.chosum5();
            // this.fatsum6();
            // this.chosum7();
            // this.fatsum8();
            // this.chosum9();
            // this.fatsum10();
            // this.chosum11();
            // this.fatsum12();
            // this.chosum13();
            // this.fatsum14();
           
          })
        }
      });
  
      this.mainForm = this.formBuilder.group({
        food_name: [''],
        category: [''],
        unit: [''],
        qty: [''],
        cho: [''],
        fat: [''],
  
      })
  
    }

    chosum1(){
      this.sum1 = 0;
      for(let cho of this.Data){
         if(cho.cho != ""){
          this.sum1 += cho.cho;
         }
      }
    }
  
    fatsum2(){
      this.sum2 = 0;
      for(let fat of this.Data){
         if(fat.fat != ""){
          this.sum2 += fat.fat;
         }
      }
    }

    // chosum3(){
    //   this.sum3 = 0;
    //   for(let cho of this.Data){
    //      if(cho.cho != ""){
    //       this.sum1 += cho.cho;
    //      }
    //   }
    // }
  
    // fatsum4(){
    //   this.sum4 = 0;
    //   for(let fat of this.Data){
    //      if(fat.fat != ""){
    //       this.sum2 += fat.fat;
    //      }
    //   }
    // }

    // chosum5(){
    //   this.sum5 = 0;
    //   for(let cho of this.Data){
    //      if(cho.cho != ""){
    //       this.sum1 += cho.cho;
    //      }
    //   }
    // }
  
    // fatsum6(){
    //   this.sum6 = 0;
    //   for(let fat of this.Data){
    //      if(fat.fat != ""){
    //       this.sum2 += fat.fat;
    //      }
    //   }
    // }

    // chosum7(){
    //   this.sum7 = 0;
    //   for(let cho of this.Data){
    //      if(cho.cho != ""){
    //       this.sum1 += cho.cho;
    //      }
    //   }
    // }
  
    // fatsum8(){
    //   this.sum8 = 0;
    //   for(let fat of this.Data){
    //      if(fat.fat != ""){
    //       this.sum2 += fat.fat;
    //      }
    //   }
    // }

    // chosum9(){
    //   this.sum9 = 0;
    //   for(let cho of this.Data){
    //      if(cho.cho != ""){
    //       this.sum1 += cho.cho;
    //      }
    //   }
    // }
  
    // fatsum10(){
    //   this.sum10 = 0;
    //   for(let fat of this.Data){
    //      if(fat.fat != ""){
    //       this.sum2 += fat.fat;
    //      }
    //   }
    // }

    // chosum11(){
    //   this.sum11 = 0;
    //   for(let cho of this.Data){
    //      if(cho.cho != ""){
    //       this.sum1 += cho.cho;
    //      }
    //   }
    // }
  
    // fatsum12(){
    //   this.sum12 = 0;
    //   for(let fat of this.Data){
    //      if(fat.fat != ""){
    //       this.sum2 += fat.fat;
    //      }
    //   }
    // }

    // chosum13(){
    //   this.sum13 = 0;
    //   for(let cho of this.Data){
    //      if(cho.cho != ""){
    //       this.sum1 += cho.cho;
    //      }
    //   }
    // }
  
    // fatsum14(){
    //   this.sum14 = 0;
    //   for(let fat of this.Data){
    //      if(fat.fat != ""){
    //       this.sum2 += fat.fat;
    //      }
    //   }
    // }


    storeData() {
      this.db.addFood(
        this.myDate,
        this.mainForm.value.category,
        this.mainForm.value.food_name,
        this.mainForm.value.unit,
        this.mainForm.value.qty,
        this.mainForm.value.cho,
        this.mainForm.value.fat
      ).then((res) => {
  
      })
    }
  }
  
  
  
    
  
  
  








