import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { environment } from '@env/environment';

import { LocalStorageService } from './local-storage/local-storage.service';
import { AnimationsService } from './animations/animations.service';
import { TitleService } from './title/title.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AllMaterialModule } from '@app/common/shared/all-material-module';
import { ManagePasswordComponent } from './auth/components/manage-password/manage-password.component';

@NgModule({
  imports: [

    // angular
    CommonModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    AllMaterialModule,
    
    environment.production
      ? []
      : StoreDevtoolsModule.instrument({
        name: 'Medbud'
      }),

    // 3rd party
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  declarations: [
    // ManagePasswordComponent
  ],
  providers: [
    LocalStorageService,
    AnimationsService,
    TitleService
  ],
  exports: [TranslateModule]
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule
  ) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import only in AppModule');
    }
  }
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(
    http,
    `${environment.i18nPrefix}/assets/i18n/`,
    '.json'
  );
}
