import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { CoreModule, LocalStorageService, reducers, metaReducers } from '@app/core';

import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { TokenInterceptor } from '@app/core/auth/token.interceptor';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { NgxPermissionsModule } from 'ngx-permissions';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ToastModule } from 'primeng/toast';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { MessageService } from 'primeng/api';
import { AuthEffects } from '@app/core/auth/auth.effects';

import { AppRoutingModule } from './app.routes';
import { ComponentsModule } from '@app/common/components.module';
import { AppComponent } from './app.component';
import { LogInComponent } from '@app/core/auth/components/log-in/log-in.component';

import { AuthGuardService } from '@app/core/auth/auth-guard.service';
import { NoAuthGuardService } from '@app/core/auth/no-auth-guard.service';
import { ClientOnboardingService } from '@app/state/client-onboarding/client-onboarding.service';
import { AppService } from './app.service';
import { AuthService } from '@app/core/auth/auth.service';
import { GrowlService } from '@app/core/growl.service';

import { LandingComponent } from '@app/landing/landing.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { SettingsModule } from '@app/core/settings';

import { ReactiveFormsModule } from '@angular/forms';
import { ManagePasswordComponent } from '@app/core/auth/components/manage-password/manage-password.component';
import { SharedModule } from '@app/common/shared';

import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';

@NgModule({
  imports: [
    // angular
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    ToastModule,

    // core & shared

    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([AuthEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 10
    }),
    CoreModule,
    SharedModule,
    SettingsModule,

    // app
    AppRoutingModule,

    StoreRouterConnectingModule.forRoot(),

    //UI and Layout related
    ComponentsModule,
    NgxPermissionsModule.forRoot()
  ],
  exports: [
    ComponentsModule,
  ],
  declarations: [
    AppComponent,
    LogInComponent,
    LandingComponent,
    ManagePasswordComponent
  ],
  providers: [
    AuthGuardService,
    NoAuthGuardService,
    LocalStorageService,
    ClientOnboardingService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: ErrorInterceptor,
    //   multi: true
    // },
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    AppService,
    AuthService,
    GrowlService,
    MessageService
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
