import { Component, Input, OnInit, ViewChild} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, FormControl } from "@angular/forms";
import { DbService } from './../services/db.service';

import { ToastController } from '@ionic/angular';
import { Router } from "@angular/router";
import { variable } from '@angular/compiler/src/output/output_ast';
import { RecordService } from '../services/record.service';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page { 
  @ViewChild("choinput") choinput;
  mainForm: FormGroup;
  Data: any[] = []
  public curChoBreakfast=0;
  public curFatBreakfast=0;
  public curChoLunch=0;
  public curFatLunch=0;
  public curChoDinner=0;
  public curFatDinner=0;
  public curChoSnack1=0;
  public curFatSnack1=0;
  public curChoSnack2=0;
  public curFatSnack2=0;
  public curChoSnack3=0;
  public curFatSnack3=0;
  public curChoOthers=0;
  public curFatOthers=0;
  public curChoTotal=0;
  public curFatTotal=0;


  public anArrayBreakfast:any=[];
  public anArrayLunch:any=[];
  public anArrayDinner:any=[];
  public anArraySnack1:any=[];
  public anArraySnack2:any=[];
  public anArraySnack3:any=[];
  public anArrayOthers:any=[];

   myDate = new Date().toISOString().split('T')[0];
   type: string

  jsonData:any=[];
 


  foodCardForm = new FormGroup({
  food_name: new FormControl(''),
  category: new FormControl(''),
  unit: new FormControl(''),
  qty: new FormControl(''),
  cho: new FormControl(''),
  fat: new FormControl(''),
});


// pod useful command: 🍓
// https://github.com/ionic-team/capacitor/issues/1676
// https://github.com/ionic-team/capacitor/issues/1755
// sudo npm install -g cordova ionic
// /Users/kaiyanliu/Desktop/diet-application/ios/App
// kaiyanliu@Kaiyans-iMac App % ls
// App		App.xcodeproj	App.xcworkspace	Podfile		Podfile.lock	Pods		public
// kaiyanliu@Kaiyans-iMac App % 



public map:  Map<string, FormGroup> = new Map();
  constructor(
    
    private http: HttpClient,
    private db: DbService,
    private dailyrecorddb: RecordService,
    public formBuilder: FormBuilder,
    private toast: ToastController,
    private router: Router,    

    )
   { 
    //this.initializeJsonData();
    this.type = 'breakfast';

  }


  initializeJsonData()
  {
     this.jsonData = [
        {
            "name": "apple",
            "cho": "1001"
        },
        {
          "name": "banana",
          "cho": "1003"
        },
       {
        "name": "waffle",
        "cho": "1002"
       },
     ]
  }

  filterJsonData(ev:any){
    //filt out json food methed with user input.
    this.initializeJsonData();
    document.getElementById("choinput").focus();
    const val = ev.target.value;
    if(val && val.trim() != ''){
      this.jsonData = this.jsonData.filter((object) => {
        return (object.name.toLowerCase().indexOf(val.toLowerCase())>-1);
      })
    }

  }

  onclickJson(){
    // after choosing one food, auto complete other field cho/fat.
    // let cho = 9;
    // let fat = 10;
    // document.getElementById("choinput").setAttribute('value', "" + cho);
    // document.getElementById("fatinput").innerText = "" + fat;
  }


  // segmentc change method
  segmentChanged(ev: any) {}

   // section for remove and delete 

   removeItemBreakfast(i){
    for(let j = 0; j < this.anArrayBreakfast.length; j++) {

      if(j == i){
        let j_uuid = this.myDate + "_Breakfast_" + (String)(this.anArrayBreakfast[j].food_name).toLowerCase().replace(/\-/g, " ").replace( /\s+/g, "") //remove spaces;
        this.anArrayBreakfast.splice(j, 1);
        this.dbdeleteFood(j_uuid);
      }
    }
    this.analyzeChoAndFatBreakfast();
    this.analyzeChoAndFatTotal()
  }

  removeItemLunch(i){
   for(let j = 0; j < this.anArrayLunch.length; j++) {
     if(j == i){
      let j_uuid = this.myDate + "_Lunch_" + (String)(this.anArrayLunch[j].food_name).toLowerCase().replace(/\-/g, " ").replace( /\s+/g, "") //remove spaces;
      this.anArrayLunch.splice(j, 1);
      this.dbdeleteFood(j_uuid);
    
     }
   }
   this.analyzeChoAndFatLunch();
   this.analyzeChoAndFatTotal()
 }

 removeItemDinner(i){
 for(let j = 0; j < this.anArrayDinner.length; j++) {
    if(j == i){
    let j_uuid = this.myDate + "_Dinner_" + (String)(this.anArrayDinner[j].food_name).toLowerCase().replace(/\-/g, " ").replace( /\s+/g, "") //remove spaces;
    this.anArrayDinner.splice(j, 1);
    this.dbdeleteFood(j_uuid);
   }
 }
 this.analyzeChoAndFatDinner();
 this.analyzeChoAndFatTotal()
}

removeItemSnack1(i){
 for(let j = 0; j < this.anArraySnack1.length; j++) {
  if(j == i){
    let j_uuid = this.myDate + "_Snack1_" + (String)(this.anArraySnack1[j].food_name).toLowerCase().replace(/\-/g, " ").replace( /\s+/g, "") //remove spaces;
    this.anArraySnack1.splice(j, 1);
    this.dbdeleteFood(j_uuid);
   }
 }
 this.analyzeChoAndFatSnack1();
 this.analyzeChoAndFatTotal()
}

removeItemSnack2(i){
 for(let j = 0; j < this.anArraySnack2.length; j++) {
  if(j == i){
    let j_uuid = this.myDate + "_Snack2_" + (String)(this.anArraySnack2[j].food_name).toLowerCase().replace(/\-/g, " ").replace( /\s+/g, "") //remove spaces;
    this.anArraySnack2.splice(j, 1);
    this.dbdeleteFood(j_uuid);
   }
   
 }
 this.analyzeChoAndFatSnack2();
 this.analyzeChoAndFatTotal()
}

removeItemSnack3(i){
 for(let j = 0; j < this.anArraySnack3.length; j++) {
  if(j == i){
    let j_uuid = this.myDate + "_Snack3_" + (String)(this.anArraySnack3[j].food_name).toLowerCase().replace(/\-/g, " ").replace( /\s+/g, "") //remove spaces;
    this.anArraySnack3.splice(j, 1);
    this.dbdeleteFood(j_uuid);
   }
 }
 this.analyzeChoAndFatSnack3();
 this.analyzeChoAndFatTotal()
}

removeItemOthers(i){
 for(let j = 0; j < this.anArrayOthers.length; j++) {
  if(j == i){
    let j_uuid = this.myDate + "_Others_" + (String)(this.anArrayOthers[j].food_name).toLowerCase().replace(/\-/g, " ").replace( /\s+/g, "") //remove spaces;
    this.anArrayOthers.splice(j, 1);
    this.dbdeleteFood(j_uuid);
   }
 }
 this.analyzeChoAndFatOthers();
 this.analyzeChoAndFatTotal()
}


  dbdeleteFood(uuid){
    this.db.deleteFood(uuid).then(async(res) => {
      let toast = await this.toast.create({
        message: 'Food deleted',
        duration: 2500
      });
      toast.present();      
    })
  }
  



   // section for saving and adding
    onSaveBreakfast(){
      this.analyzeChoAndFatBreakfast();
      this.analyzeChoAndFatTotal()
      this.map[this.foodCardForm.controls['food_name'].value] = this.foodCardForm.value;
  
    }

   onSaveLunch(){
   this.analyzeChoAndFatLunch();
   this.analyzeChoAndFatTotal()
   this.map[this.foodCardForm.controls['food_name'].value] = this.foodCardForm.value;

  }
   onSaveDinner(){
   this.analyzeChoAndFatDinner();
   this.analyzeChoAndFatTotal()
   this.map[this.foodCardForm.controls['food_name'].value] = this.foodCardForm.value;

  }

     onSaveSnack1(){
     this.analyzeChoAndFatSnack1();
     this.analyzeChoAndFatTotal()
     this.map[this.foodCardForm.controls['food_name'].value] = this.foodCardForm.value;

    }


    onSaveSnack2(){
      this.analyzeChoAndFatSnack2();
      this.analyzeChoAndFatTotal()
      this.map[this.foodCardForm.controls['food_name'].value] = this.foodCardForm.value;

     }

  


    onSaveSnack3(){
      this.analyzeChoAndFatSnack3();
      this.analyzeChoAndFatTotal()
      this.map[this.foodCardForm.controls['food_name'].value] = this.foodCardForm.value;
     }



    onSaveOthers(){
      this.analyzeChoAndFatOthers();
      this.analyzeChoAndFatTotal()
      this.map[this.foodCardForm.controls['food_name'].value] = this.foodCardForm.value;
     }


  AddBreakfast(){
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
  
  AddDinner(){
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

  AddSnack1(){
    let number = this.anArraySnack1.length + 1
    let currentFood = {
      food_name: this.foodCardForm.controls['food_name'].value,
      category:this.foodCardForm.controls['category'].value,
      unit: this.foodCardForm.controls['unit'].value,
      qty: this.foodCardForm.controls['qty'].value,
      cho: this.foodCardForm.controls['cho'].value,
      fat: this.foodCardForm.controls['fat'].value,
    }
    this.anArraySnack1.push(currentFood);
    this.analyzeChoAndFatSnack1();
    this.analyzeChoAndFatTotal()
    this.ResetSnack1();
  }
  

  AddSnack2(){
    let number = this.anArraySnack2.length + 1
    let currentFood = {
      food_name: this.foodCardForm.controls['food_name'].value,
      category:this.foodCardForm.controls['category'].value,
      unit: this.foodCardForm.controls['unit'].value,
      qty: this.foodCardForm.controls['qty'].value,
      cho: this.foodCardForm.controls['cho'].value,
      fat: this.foodCardForm.controls['fat'].value,
    }
    this.anArraySnack2.push(currentFood);
    this.analyzeChoAndFatSnack2();
    this.analyzeChoAndFatTotal()
    this.ResetSnack2();
  }


  AddSnack3(){
    let number = this.anArraySnack3.length + 1
    let currentFood = {
      food_name: this.foodCardForm.controls['food_name'].value,
      category:this.foodCardForm.controls['category'].value,
      unit: this.foodCardForm.controls['unit'].value,
      qty: this.foodCardForm.controls['qty'].value,
      cho: this.foodCardForm.controls['cho'].value,
      fat: this.foodCardForm.controls['fat'].value,
    }
    this.anArraySnack3.push(currentFood);
    this.analyzeChoAndFatSnack3();
    this.analyzeChoAndFatTotal()
    this.ResetSnack3();
  }

  AddOthers(){
    let number = this.anArrayOthers.length + 1
    let currentFood = {
      food_name: this.foodCardForm.controls['food_name'].value,
      category:this.foodCardForm.controls['category'].value,
      unit: this.foodCardForm.controls['unit'].value,
      qty: this.foodCardForm.controls['qty'].value,
      cho: this.foodCardForm.controls['cho'].value,
      fat: this.foodCardForm.controls['fat'].value,
    }
    this.anArrayOthers.push(currentFood);
    this.analyzeChoAndFatOthers();
    this.analyzeChoAndFatTotal()
    this.ResetOthers();
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


   ResetSnack1(){
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

   ResetSnack2(){
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

   ResetSnack3(){
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

   ResetOthers(){
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

      // for (var val of this.anArrayBreakfast) {
      //   let uniqueKey = this.myDate + "_Breakfast_" + (String)(val.food_name).toLowerCase().replace(/\-/g, " ").replace( /\s+/g, "") //remove spaces;
      //   //this uniqueKey is generated with date, category and food type(all remove space and camelcase), which will be unique in sql as key.
      //   this.db.addFood(
      //     uniqueKey,
      //     this.myDate,
      //      "BreakFast",
      //      val.food_name,
      //      val.unit,
      //      val.qty,
      //      val.cho,
      //      val.fat
      //   ).then((res) => {
    
      //   })
      // }

      // for (var val of this.anArrayLunch) {
      //   let uniqueKey = this.myDate + "_Lunch_" + (String)(val.food_name).toLowerCase().replace(/\-/g, " ").replace( /\s+/g, "") //remove spaces;
      //   //this uniqueKey is generated with date, category and food type(all remove space and camelcase), which will be unique in sql as key.
      //   this.db.addFood(
      //     uniqueKey,
      //     this.myDate,
      //      "Lunch",
      //      val.food_name,
      //      val.unit,
      //      val.qty,
      //      val.cho,
      //      val.fat
      //   ).then((res) => {
    
      //   })
      // }

      // for (var val of this.anArrayDinner) {
      //   let uniqueKey = this.myDate + "_Dinner_" + (String)(val.food_name).toLowerCase().replace(/\-/g, " ").replace( /\s+/g, "") //remove spaces;
      //   //this uniqueKey is generated with date, category and food type(all remove space and camelcase), which will be unique in sql as key.
      //   this.db.addFood(
      //     uniqueKey,
      //     this.myDate,
      //      "Dinner",
      //      val.food_name,
      //      val.unit,
      //      val.qty,
      //      val.cho,
      //      val.fat
      //   ).then((res) => {
    
      //   })
      // }

      // for (var val of this.anArraySnack1) {
      //   let uniqueKey = this.myDate + "_Snack1_" + (String)(val.food_name).toLowerCase().replace(/\-/g, " ").replace( /\s+/g, "") //remove spaces;
      //   //this uniqueKey is generated with date, category and food type(all remove space and camelcase), which will be unique in sql as key.
      //   this.db.addFood(
      //     uniqueKey,
      //     this.myDate,
      //      "Snack1",
      //      val.food_name,
      //      val.unit,
      //      val.qty,
      //      val.cho,
      //      val.fat
      //   ).then((res) => {
    
      //   })
      // }


      // for (var val of this.anArraySnack2) {
      //   let uniqueKey = this.myDate + "_Snack2_" + (String)(val.food_name).toLowerCase().replace(/\-/g, " ").replace( /\s+/g, "") //remove spaces;
      //   //this uniqueKey is generated with date, category and food type(all remove space and camelcase), which will be unique in sql as key.
      //   this.db.addFood(
      //     uniqueKey,
      //     this.myDate,
      //      "Snack2",
      //      val.food_name,
      //      val.unit,
      //      val.qty,
      //      val.cho,
      //      val.fat
      //   ).then((res) => {
    
      //   })
      // }


      // for (var val of this.anArraySnack3) {
      //   let uniqueKey = this.myDate + "_Snack3_" + (String)(val.food_name).toLowerCase().replace(/\-/g, " ").replace( /\s+/g, "") //remove spaces;
      //   //this uniqueKey is generated with date, category and food type(all remove space and camelcase), which will be unique in sql as key.
      //   this.db.addFood(
      //     uniqueKey,
      //     this.myDate,
      //      "Snack3",
      //      val.food_name,
      //      val.unit,
      //      val.qty,
      //      val.cho,
      //      val.fat
      //   ).then((res) => {
    
      //   })
      // }

      // for (var val of this.anArrayOthers) {
      //   let uniqueKey = this.myDate + "_Others_" + (String)(val.food_name).toLowerCase().replace(/\-/g, " ").replace( /\s+/g, "") //remove spaces;
      //   //this uniqueKey is generated with date, category and food type(all remove space and camelcase), which will be unique in sql as key.
      //   this.db.addFood(
      //     uniqueKey,
      //     this.myDate,
      //      "Others",
      //      val.food_name,
      //      val.unit,
      //      val.qty,
      //      val.cho,
      //      val.fat
      //   ).then((res) => {
    
      //   })
      // }


      
      // this.dailyrecorddb.addRecord( this.myDate ,this.curChoTotal,this.curFatTotal);
      console.log("kyl: home page calling export")
      this.dailyrecorddb.exportJson();

    }

    // analyzing part:
    analyzeChoAndFatBreakfast(){
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

        analyzeChoAndFatSnack1(){
      this.curChoSnack1 = 0;
      this.curFatSnack1 = 0;
        this.anArraySnack1.forEach(element => {
          this.curChoSnack1 = this.curChoSnack1 + Number(element.cho);
          this.curFatSnack1 = this.curFatSnack1 + Number(element.fat);
        });
        }

      
        analyzeChoAndFatSnack2(){
          this.curChoSnack2 = 0;
          this.curFatSnack2 = 0;
            this.anArraySnack2.forEach(element => {
              this.curChoSnack2 = this.curChoSnack2 + Number(element.cho);
              this.curFatSnack2 = this.curFatSnack2 + Number(element.fat);
            });
            }

        analyzeChoAndFatSnack3(){
          this.curChoSnack3 = 0;
          this.curFatSnack3 = 0;
            this.anArraySnack3.forEach(element => {
              this.curChoSnack3 = this.curChoSnack3 + Number(element.cho);
              this.curFatSnack3 = this.curFatSnack3 + Number(element.fat);
            });
            }
    
        analyzeChoAndFatOthers(){
          this.curChoOthers = 0;
          this.curFatOthers = 0;
            this.anArrayOthers.forEach(element => {
              this.curChoOthers = this.curChoOthers + Number(element.cho);
              this.curFatOthers = this.curFatOthers + Number(element.fat);
            });
            }
        


        analyzeChoAndFatTotal(){
          this.curChoTotal = 0;
          this.curFatTotal = 0;
          this.curChoTotal=this.curChoBreakfast+this.curChoLunch+this.curChoDinner+this.curChoSnack1+this.curChoSnack2+this.curChoSnack3+this.curChoOthers;
          this.curFatTotal=this.curFatBreakfast+this.curFatLunch+this.curFatDinner+this.curFatSnack1+this.curFatSnack2+this.curFatSnack3+this.curFatOthers;
        
        }


  }
  
  
  
  
  // section for database


    // storeData() {
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


      // console.log("this.db.food????   " + this.db.getFoods());
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

    // }


  
  
  








