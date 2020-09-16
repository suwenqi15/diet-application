import { Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, FormControl } from "@angular/forms";
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
  public curChoBreakfast=0;
  public curFatBreakfast=0;
  public curChoLunch=0;
  public curFatLunch=0;
  public curChoDinner=0;
  public curFatDinner=0;
  public curChoSnack=0;
  public curFatSnack=0;
  public curChoTotal=0;
  public curFatTotal=0;


  public anArrayBreakfast:any=[];
  public anArrayLunch:any=[];
  public anArrayDinner:any=[];
  public anArraySnack:any=[];

   myDate = new Date().toISOString().split('T')[0];
   type: string
 
foodCardForm = new FormGroup({
  food_name: new FormControl(''),
  category: new FormControl(''),
  unit: new FormControl(''),
  qty: new FormControl(''),
  cho: new FormControl(''),
  fat: new FormControl(''),
});


public map:  Map<string, FormGroup> = new Map();
  constructor(
    
    private http: HttpClient,
    private db: DbService,
    public formBuilder: FormBuilder,
    private toast: ToastController,
    private router: Router    
    )
   { 
    this.type = 'breakfast';

  }

   // section for remove and delete 

   removeItemBreakfast(i){
     console.log("i is" + i)
     console.log("this.anArrayBreakfast is" + this.anArrayBreakfast)
    for(let j = 0; j < this.anArrayBreakfast.length; j++) {

      if(j == i){
        this.anArrayBreakfast.splice(j, 1);
        //this.dbdeleteFood(j);
      }
    }
    console.log("this.anArrayBreakfast is" + this.anArrayBreakfast)
    this.analyzeChoAndFatBreakfast();
    this.analyzeChoAndFatTotal()
  }

  removeItemLunch(i){
    console.log("i is" + i)
    console.log("this.anArray is" + this.anArrayLunch)
   for(let j = 0; j < this.anArrayLunch.length; j++) {
     if(j == i){
       this.anArrayLunch.splice(j, 1);
       //this.dbdeleteFood(j);
     }
   }
   console.log("this.anArray is" + this.anArrayLunch)
   this.analyzeChoAndFatLunch();
   this.analyzeChoAndFatTotal()
 }

 removeItemDinner(i){
  console.log("i is" + i)
  console.log("this.anArrayDinner is" + this.anArrayDinner)
 for(let j = 0; j < this.anArrayDinner.length; j++) {
   if(j == i){
     this.anArrayDinner.splice(j, 1);
     //this.dbdeleteFood(j);
   }
 }
 console.log("this.anArrayDinner is" + this.anArrayDinner)
 this.analyzeChoAndFatDinner();
 this.analyzeChoAndFatTotal()
}

removeItemSnack(i){
  console.log("i is" + i)
  console.log("this.anArraySnack is" + this.anArraySnack)
 for(let j = 0; j < this.anArraySnack.length; j++) {
   if(j == i){
     this.anArraySnack.splice(j, 1);
     //this.dbdeleteFood(j);
   }
 }
 console.log("this.anArranArraySnackay is" + this.anArraySnack)
 this.analyzeChoAndFatSnack();
 this.analyzeChoAndFatTotal()
}





  // dbdeleteFood(id){
  //   this.db.deleteFood(id).then(async(res) => {
  //     let toast = await this.toast.create({
  //       message: 'Food deleted',
  //       duration: 2500
  //     });
  //     toast.present();      
  //   })
  // }
  
  segmentChanged(ev: any) {}






   // section for saving and adding
 onSaveBreakfast(){
   //maybe need to check for dedupe before save it.
  this.analyzeChoAndFatBreakfast();
  this.analyzeChoAndFatTotal()
  console.log(this.foodCardForm)
  this.map[this.foodCardForm.controls['food_name'].value] = this.foodCardForm.value;
  console.log(this.map);
 }

   onSaveLunch(){
   this.analyzeChoAndFatLunch();
   this.analyzeChoAndFatTotal()
   console.log(this.foodCardForm)
   this.map[this.foodCardForm.controls['food_name'].value] = this.foodCardForm.value;
   console.log(this.map);
  }
   onSaveDinner(){
   this.analyzeChoAndFatDinner();
   this.analyzeChoAndFatTotal()
   console.log(this.foodCardForm)
   this.map[this.foodCardForm.controls['food_name'].value] = this.foodCardForm.value;
   console.log(this.map);
  }

     onSaveSnack(){
     this.analyzeChoAndFatSnack();
     this.analyzeChoAndFatTotal()
     console.log(this.foodCardForm)
     this.map[this.foodCardForm.controls['food_name'].value] = this.foodCardForm.value;
     console.log(this.map);
    }

    

  AddBreakfast(){
    console.log("ky debug" + this.foodCardForm)
    let number = this.anArrayBreakfast.length + 1
    let currentFood = {
      food_name: this.foodCardForm.controls['food_name'].value,
      category:this.foodCardForm.controls['category'].value,
      unit: this.foodCardForm.controls['unit'].value,
      qty: this.foodCardForm.controls['qty'].value,
      cho: this.foodCardForm.controls['cho'].value,
      fat: this.foodCardForm.controls['fat'].value,
    }

    this.anArrayBreakfast.push(currentFood);
    this.analyzeChoAndFatBreakfast();
    this.analyzeChoAndFatTotal()
    this.ResetBreakfast();
  }

  AddLunch(){
    console.log(this.foodCardForm)
    let number = this.anArrayLunch.length + 1
    let currentFood = {
      food_name: this.foodCardForm.controls['food_name'].value,
      category:this.foodCardForm.controls['category'].value,
      unit: this.foodCardForm.controls['unit'].value,
      qty: this.foodCardForm.controls['qty'].value,
      cho: this.foodCardForm.controls['cho'].value,
      fat: this.foodCardForm.controls['fat'].value,
    }
    this.anArrayLunch.push(currentFood);
    this.analyzeChoAndFatLunch();
    this.analyzeChoAndFatTotal()
    this.ResetLunch();
  }
  
  AddLDinner(){
    console.log(this.foodCardForm)
    let number = this.anArrayDinner.length + 1
    let currentFood = {
      food_name: this.foodCardForm.controls['food_name'].value,
      category:this.foodCardForm.controls['category'].value,
      unit: this.foodCardForm.controls['unit'].value,
      qty: this.foodCardForm.controls['qty'].value,
      cho: this.foodCardForm.controls['cho'].value,
      fat: this.foodCardForm.controls['fat'].value,
    }
    this.anArrayDinner.push(currentFood);
    this.analyzeChoAndFatDinner();
    this.analyzeChoAndFatTotal()
    this.ResetDinner();
  }

  AddSnack(){
    console.log(this.foodCardForm)
    let number = this.anArraySnack.length + 1
    let currentFood = {
      food_name: this.foodCardForm.controls['food_name'].value,
      category:this.foodCardForm.controls['category'].value,
      unit: this.foodCardForm.controls['unit'].value,
      qty: this.foodCardForm.controls['qty'].value,
      cho: this.foodCardForm.controls['cho'].value,
      fat: this.foodCardForm.controls['fat'].value,
    }
    this.anArraySnack.push(currentFood);
    this.analyzeChoAndFatSnack();
    this.analyzeChoAndFatTotal()
    this.ResetSnack();
  }


  ResetLunch(){
    this.foodCardForm = new FormGroup({
      food_name: new FormControl(''),
      category: new FormControl(''),
      unit: new FormControl(''),
      qty: new FormControl(''),
      cho: new FormControl(''),
      fat: new FormControl(''),
    });
    this.mainForm = this.formBuilder.group({
      food_name: [''],
      category:[''],
      unit: [''],
      qty: [''],
      cho: [''],
      fat: [''],
    })
   }
  
   ResetBreakfast(){
    this.foodCardForm = new FormGroup({
      food_name: new FormControl(''),
      category: new FormControl(''),
      unit: new FormControl(''),
      qty: new FormControl(''),
      cho: new FormControl(''),
      fat: new FormControl(''),
    });
    this.mainForm = this.formBuilder.group({
      food_name: [''],
      category:[''],
      unit: [''],
      qty: [''],
      cho: [''],
      fat: [''],
    })
   }

   ResetSnack(){
    this.foodCardForm = new FormGroup({
      food_name: new FormControl(''),
      category: new FormControl(''),
      unit: new FormControl(''),
      qty: new FormControl(''),
      cho: new FormControl(''),
      fat: new FormControl(''),
    });
    this.mainForm = this.formBuilder.group({
      food_name: [''],
      category:[''],
      unit: [''],
      qty: [''],
      cho: [''],
      fat: [''],
    })
   }


   ResetDinner(){
    this.foodCardForm = new FormGroup({
      food_name: new FormControl(''),
      category: new FormControl(''),
      unit: new FormControl(''),
      qty: new FormControl(''),
      cho: new FormControl(''),
      fat: new FormControl(''),
    });
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
           
          })
        }
      });
      console.log("init" + this.db.dbState());
      this.mainForm = this.formBuilder.group({
        food_name: [''],
        category: [''],
        unit: [''],
        qty: [''],
        cho: [''],
        fat: [''],
  
      })
  
    }

    storeToDatabase(){
      // need to loop through these four array, and add line by line.
    }

   // section for database


    storeData() {
      // this.db.addFood(
      //   this.myDate,
      //   this.mainForm.value.category,
      //   this.mainForm.value.food_name,
      //   this.mainForm.value.unit,
      //   this.mainForm.value.qty,
      //   this.mainForm.value.cho,
      //   this.mainForm.value.fat
      // ).then((res) => {
  
      // })


      console.log("this.db.food????   " + this.db.getFoods());
      // this.db.addFood(
      //   08022029,
      //   "this.mainForm.value.category",
      //   "this.mainForm.value.food_name",
      //   "this.mainForm.value.unit",
      //   "this.mainForm.value.qty",
      //   "this.mainForm.value.cho",
      //   "this.mainForm.value.fat"
      // ).then((res) => {
  
      // })

    }












    // analyzing part:


    analyzeChoAndFatBreakfast(){
      console.log("this.curCho is   " + this.curChoBreakfast);
      this.curChoBreakfast = 0;
      this.curFatBreakfast = 0;
        this.anArrayBreakfast.forEach(element => {
          this.curChoBreakfast = this.curChoBreakfast + Number(element.cho);
          this.curFatBreakfast = this.curFatBreakfast + Number(element.fat);
        });
        }

        analyzeChoAndFatLunch(){
          this.curChoLunch = 0;
          this.curFatLunch = 0;
            this.anArrayLunch.forEach(element => {
              this.curChoLunch = this.curChoLunch + Number(element.cho);
              this.curFatLunch = this.curFatLunch + Number(element.fat);
            });
            }

        analyzeChoAndFatDinner(){
      this.curChoDinner = 0;
      this.curFatDinner = 0;
        this.anArrayDinner.forEach(element => {
          this.curChoDinner = this.curChoDinner + Number(element.cho);
          this.curFatDinner = this.curFatDinner + Number(element.fat);
        });
        }

        analyzeChoAndFatSnack(){
      this.curChoSnack = 0;
      this.curFatSnack = 0;
        this.anArraySnack.forEach(element => {
          this.curChoSnack = this.curChoSnack + Number(element.cho);
          this.curFatSnack = this.curFatSnack + Number(element.fat);
        });
        }


        analyzeChoAndFatTotal(){
          this.curChoTotal = 0;
          this.curFatTotal = 0;
          this.curChoTotal=this.curChoBreakfast+this.curChoLunch+this.curFatDinner+this.curFatSnack;
          this.curFatTotal=this.curFatBreakfast+this.curFatLunch+this.curFatDinner+this.curFatSnack;
        }


  }
  
  
  
    
  
  
  








