import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhoneContactsComponent } from './phone-contacts/phone-contacts.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FinanceComponent } from './finance/finance.component';

import { AddressComponent } from './address/address.component';
import { AllMaterialModule } from './shared/all-material-module';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '@app/common/shared';
import { PopupModule } from '@app/common/popups/popups.module';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    AllMaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    PopupModule
  ],
  declarations: [
    AddressComponent,
    PhoneContactsComponent,
    FinanceComponent,
  ],
  exports: [
    AddressComponent,
    PhoneContactsComponent,
    FinanceComponent
  ]
})
export class ComponentsModule { }
