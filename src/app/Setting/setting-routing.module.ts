import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
<<<<<<< HEAD
<<<<<<< HEAD:src/app/Setting/setting-routing.module.ts
import { SettingPage } from './setting.page';
=======
import { RecordPage } from './record.page';
>>>>>>> b71bb4e5a3537316666d4abcd6caac687482584c:src/app/Record/record-routing.module.ts
=======
import { SettingPage } from './setting.page';
>>>>>>> b71bb4e5a3537316666d4abcd6caac687482584c

const routes: Routes = [
  {
    path: '',
<<<<<<< HEAD
<<<<<<< HEAD:src/app/Setting/setting-routing.module.ts
    component: SettingPage,
=======
    component: RecordPage,
>>>>>>> b71bb4e5a3537316666d4abcd6caac687482584c:src/app/Record/record-routing.module.ts
=======
    component: SettingPage,
>>>>>>> b71bb4e5a3537316666d4abcd6caac687482584c
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
<<<<<<< HEAD
<<<<<<< HEAD:src/app/Setting/setting-routing.module.ts
export class SettingRoutingModule {}
=======
export class RecordRoutingModule {}
>>>>>>> b71bb4e5a3537316666d4abcd6caac687482584c:src/app/Record/record-routing.module.ts
=======
export class SettingRoutingModule {}
>>>>>>> b71bb4e5a3537316666d4abcd6caac687482584c
