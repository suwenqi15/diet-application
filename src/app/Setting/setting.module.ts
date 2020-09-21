import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
<<<<<<< HEAD
<<<<<<< HEAD:src/app/Setting/setting.module.ts
=======
>>>>>>> b71bb4e5a3537316666d4abcd6caac687482584c
import { SettingPage } from './setting.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { SettingRoutingModule } from './setting-routing.module';
<<<<<<< HEAD
=======
import { ProfilePage } from './profile.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { ProfileRoutingModule } from './profile-routing.module';
>>>>>>> b71bb4e5a3537316666d4abcd6caac687482584c:src/app/Profile/profile.module.ts
=======
>>>>>>> b71bb4e5a3537316666d4abcd6caac687482584c

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
<<<<<<< HEAD
<<<<<<< HEAD:src/app/Setting/setting.module.ts
=======
>>>>>>> b71bb4e5a3537316666d4abcd6caac687482584c
    SettingRoutingModule
  ],
  declarations: [SettingPage]
})
export class SettingPageModule {}
<<<<<<< HEAD
=======
    ProfileRoutingModule
  ],
  declarations: [ProfilePage]
})
export class ProfileModule {}
>>>>>>> b71bb4e5a3537316666d4abcd6caac687482584c:src/app/Profile/profile.module.ts
=======
>>>>>>> b71bb4e5a3537316666d4abcd6caac687482584c
