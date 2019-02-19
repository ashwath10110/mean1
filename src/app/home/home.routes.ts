
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotFoundComponent } from '@app/common/not-found/not-found.component';
import { HomeWelcomeComponent } from './home-welcome/home-welcome.component';
import { HomeContainerComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeContainerComponent,
    children: [
      { path: "", redirectTo: "welcome", pathMatch: "full" },
      { path: 'welcome', component: HomeWelcomeComponent },
      { path: "business", loadChildren: "./../modules/business.module#BusinessModule" },
      { path: "**", redirectTo: "welcome" }
    ]
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class HomeRoutingModule { }
