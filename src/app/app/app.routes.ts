import { NgModule } from '@angular/core';
import { Routes, RouterModule, NoPreloading, PreloadAllModules } from '@angular/router';

import { AuthGuardService } from '@app/core/auth/auth-guard.service';
import { LogInComponent } from '@app/core/auth/components/log-in/log-in.component';
import { NoAuthGuardService } from '@app/core/auth/no-auth-guard.service';

import { LandingComponent } from '@app/landing/landing.component';
import { SettingsContainerComponent } from '@app/core/settings';
import { ManagePasswordComponent } from '@app/core/auth/components/manage-password/manage-password.component';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent
  },
  {
    path: "home",
    canActivate: [AuthGuardService],
    loadChildren: "../home/home.module#HomeModule",
    data: {
      breadcrumb: 'Home'
    }
  },
  {
    path: "manage-password/:token",
    component: ManagePasswordComponent,
  },
  {
    path: 'login',
    component: LogInComponent,
    canActivate: [NoAuthGuardService]
  },
  {
    path: 'settings',
    component: SettingsContainerComponent,
    canActivate: [AuthGuardService],
    data: { title: 'Settings' }
  },
  // {
  //   path: '**',
  //   redirectTo: ''
  // }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
