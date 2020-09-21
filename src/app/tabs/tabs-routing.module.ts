import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'Home',
        loadChildren: () => import('../Home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'Record',
        loadChildren: () => import('../Record/record.module').then(m => m.RecordModule)
      },
      {
        path: 'Profile',
        loadChildren: () => import('../Profile/profile.module').then(m => m.ProfileModule)
      },
      {
        path: 'Setting',
        loadChildren: () => import('../Setting/setting.module').then(m => m.SettingPageModule)
      },
      {
        path: 'Information',
        loadChildren: () => import('../Information/information.module').then(m => m.InformationPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/Home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/Home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
