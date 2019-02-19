import 'hammerjs';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home.routes';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPermissionsModule } from 'ngx-permissions';

import { StoreModule } from '@ngrx/store';

import { EffectsModule } from '@ngrx/effects';

import {  TokenInterceptor } from '@app/core/auth/token.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { NotFoundComponent } from '@app/common/not-found/not-found.component';
import { HomeWelcomeComponent, BusinessTypeDialog } from './home-welcome/home-welcome.component';
import { HomeContainerComponent } from './home.component';
import { AppSidebarComponent } from '@app/common/sidebar/sidebar.component';
import { AppHeaderComponent } from '@app/common/header/header.component';

import { ComponentsModule } from '@app/common/components.module';
import { reducers, FEATURE_NAME } from '@app/state/home/home.state';

import { HomeEffects } from '@app/state/home/home.effects';
import { ClientOnboardingEffects } from '@app/state/client-onboarding/client-onboarding.effects';

import { TenantsService } from '@app/state/tenants.service';
import { UnitsService } from '@app/state/units/units.service';
import { UnitUsersEffects } from '@app/state/users/users.effects';
import { UsersService } from '@app/state/users/users.service';
import { SharedModule } from '@app/common/shared';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HomeRoutingModule,
    NgxPermissionsModule.forChild(),
    SharedModule,
    ComponentsModule,
    StoreModule.forFeature(FEATURE_NAME, reducers),
    EffectsModule.forFeature([HomeEffects, ClientOnboardingEffects, UnitUsersEffects]),
  ],
  declarations: [
    NotFoundComponent,
    HomeWelcomeComponent,
    HomeContainerComponent,
    BusinessTypeDialog,
    AppSidebarComponent,
    AppHeaderComponent,
  ],
  providers: [
    TenantsService,
    UsersService,
    UnitsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: ErrorInterceptor,
    //   multi: true
    // }
  ],
  entryComponents: [
    BusinessTypeDialog,
    AppSidebarComponent,
    AppHeaderComponent,
  ]
})
export class HomeModule { }
