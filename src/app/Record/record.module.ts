import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecordPage } from './record.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { RecordRoutingModule } from './record-routing.module';
import { FoodCardComponent } from '../foodcard/foodcard.component';
import { CardComponent } from '../card/card.component';
import { ChartsModule } from 'ng2-charts';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    RecordRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [RecordPage,
  FoodCardComponent,
  CardComponent
  ]
})
export class RecordModule {}
