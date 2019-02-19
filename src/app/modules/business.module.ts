import 'hammerjs';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPermissionsModule } from 'ngx-permissions';

import { MatDialogModule } from '@angular/material';
import {
  TokenInterceptor
} from '@app/core/auth/token.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BusinessRoutingModule } from './business.routes';

import { SelectButtonModule } from 'primeng/selectbutton';
import { GrowlModule } from 'primeng/growl';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';

import { ClientOnboardingEffects } from '@app/state/client-onboarding/client-onboarding.effects';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { FEATURE_NAME, reducers } from '@app/state/home/home.state';
import { ComponentsModule } from '@app/common/components.module';
import { HomeEffects } from '@app/state/home/home.effects';

import { DoctorsService } from '@app/state/doctors/doctors.service';
import { DoctorsEffects } from '@app/state/doctors/doctors.effects';

import { BreadcrumbModule } from 'primeng/breadcrumb';

import { TableModule } from 'primeng/table';
import { ClientsEffects } from '@app/state/clients/clients.effects';
import { TreeModule } from 'angular-tree-component';
import { UnitsEffects } from '@app/state/units/units.effects';
import { UnitUsersEffects } from '@app/state/users/users.effects';
import { ClientListComponent } from './clients/client-list/client-list.component';
import { ClientsComponent } from './clients/clients/clients.component';
import { ClientInfoComponent } from './clients/client-info/client-info.component';
import { ClientContractComponent } from './clients/client-contract/client-contract.component';
import { ClientDataComponent } from './clients/client-data/client-data.component';
import { ClientTermsComponent } from './clients/client-terms/client-terms.component';
import { NewClientComponent } from './clients/new-client/new-client.component';
import { ClientOnboardSuccessComponent } from './clients/client-onboard-success/client-onboard-success.component';
import { BusinessContainerComponent } from './clients/business-container/business-container.component';
import { ClientViewComponent } from './clients/client-view/client-view.component';
import { ClientAdminSetupomponent } from './clients/client-admin-setup/client-admin-setup.component';
import { ClientSummaryComponent } from './clients/client-summary/client-summary.component';
import { ClientSetupComponent } from './clients/client-setup/client-setup.component';
import { ClientFinanceComponent } from './clients/client-finance/client-finance.component';
import { ClientContactsComponent } from './clients/client-contacts/client-contacts.component';

import * as treeModule from 'primeng/tree';
import { OrgTreeComponent } from './hospital/org-tree/org-tree.component';

import { MessageModalComponent } from '@app/common/message-modal/message-modal.component';
import { UsersListComponent } from './hospital/users/users-list/users-list.component';
import { ClientUsersComponent } from './hospital/users/client-users/client-users.component';
import { EditUserComponent } from './hospital/users/edit-user/edit-user.component';
import { AllUsersListComponent } from './hospital/users/all-users-list/all-users-list.component';
import { ClientOnboardingService } from '@app/state/client-onboarding/client-onboarding.service';
import { ClientsService } from '@app/state/clients/clients.service';
import { UsersService } from '@app/state/users/users.service';
import { AddUnitComponent } from './hospital/add-unit/add-unit.component';
import { SharedModule } from '@app/common/shared';

import { EditDoctorComponent } from './hospital/client-doctors/edit-doctor/edit-doctor.component';
import { ClientDoctorsComponent } from './hospital/client-doctors/client-doctors/client-doctors.component';
import { DoctorsListComponent } from './hospital/client-doctors/doctors-list/doctors-list.component';
import { AllDoctorsListComponent } from './hospital/client-doctors/all-doctors-list/all-doctors-list.component';
import { MapDoctorComponent } from './hospital/client-doctors/map-doctor/map-doctor.component';

import { UnitsDepartmentsComponent } from './hospital/specialities/units-departments/units-departments.component';
import { DepartmentListComponent } from './hospital/specialities/department-list/department-list.component';
import { DetailsEffects } from '@app/state/details/details.effects';
import { DetailsService } from '@app/state/details/details.service';
import { SpecialitiesEffects } from '@app/state/specialities/specialities.effects';
import { SpecialitiesService } from '@app/state/specialities/specialities.service';

import { DetailsComponent } from './hospital/details/details.component';

import { PartnerEffects } from '@app/state/partners/partners.effects';
import { PartnersService } from '@app/state/partners/partners.service';
import { NewPartnerComponent } from './hospital/partners/new-partner/new-partner.component';
import { PartnerInfoComponent } from './hospital/partners/partner-info/partner-info.component';
import { PartnerSetupComponent } from './hospital/partners/partner-setup/partner-setup.component';
import { PartnerDetailsComponent } from './hospital/partners/partner-details/partner-details.component';
import { PartnerFinanceComponent } from './hospital/partners/partner-finance/partner-finance.component';
import { PartnerContactComponent } from './hospital/partners/partner-contacts/partner-contacts.component';
import { PartnerLandingComponent } from './hospital/partners/partner-landing/partner-landing.component';
import { PartnerContactDetailsComponent } from './hospital/partners/partner-contact-details/partner-contact-details.component';
import { PartnerViewManagerComponent } from './hospital/partners/partner-view-manager/partner-view-manager.component';
import { PartnersContainerComponent } from './hospital/partners/partner-container/partner-container.component';

import { UnitSetupComponent } from './hospital/unit-setup/unit-setup.component';
import { UnitFinanceComponent } from './hospital/finance/unit-finance.component';
import { UnitLandingComponent } from './hospital/unit-landing/unit-landing.component';
import { ContactDetailsComponent } from '@app/common/contact-details/contact-details.component';
import { ApprovalsModule } from '@app/modules/approvals/approvals.module';
import { UnitAddressComponent } from './hospital/unit-address/unit-address.component';
import { PartnerAddressComponent } from './hospital/partners/partner-address/partner-address.component';
import { ClientDetailComponent } from '@app/modules/clients/client-detail/client-detail.component';
import { EditMediaItemComponent } from '@app/modules/hospital/unit-media/edit-media-item/edit-media-item.component';
import { MediaListComponent } from '@app/modules/hospital/unit-media/media-list/media-list.component';
import { UnitMediaComponent } from '@app/modules/hospital/unit-media/unit-media/unit-media.component';
import { MediaEffects } from '@app/state/media/media.effects';
import { MediaService } from '@app/state/media/media.service';
import { MediaUploadModule } from '@app/common/media-upload/media-upload.module';
import { UnitViewComponent } from '@app/modules/hospital/unit-view/unit-view.component';
import { LocationsEffects } from '@app/state/locations/locations.effects';
import { LocationsService } from '@app/state/locations/locations.service';
import { ClientsFacade } from '@app/state/clients/clients.facade';
import { ModalService } from '@app/common/modal.service';
import { ApprovalsEffects } from '@app/state/approvals/approvals.effects';
import { ApprovalsService } from '@app/state/approvals/approvals.service';
// import { UnitViewComponent } from './hospital/unit-view/unit-view.component';

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    BusinessRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPermissionsModule.forChild(),
    StoreModule.forFeature(FEATURE_NAME, reducers),
    EffectsModule.forFeature([
      HomeEffects,
      ClientsEffects,
      DetailsEffects,
      UnitsEffects,
      ClientOnboardingEffects,
      MediaEffects,
      UnitUsersEffects,
      PartnerEffects,
      SpecialitiesEffects,
      DoctorsEffects,
      LocationsEffects,
      ApprovalsEffects
    ]),
    SharedModule,
    MatDialogModule,
    SelectButtonModule,
    TreeModule.forRoot(),
    treeModule.TreeModule,
    GrowlModule,
    ToastModule,
    DialogModule,
    BreadcrumbModule,
    TableModule,
    TreeModule.forRoot(),
    ApprovalsModule,
    MediaUploadModule
  ],
  declarations: [

    ClientListComponent,
    ClientsComponent,

    ClientInfoComponent,
    ClientContractComponent,
    ClientDataComponent,
    ClientOnboardSuccessComponent,
    ClientTermsComponent,
    NewClientComponent,
    BusinessContainerComponent,
    UnitsDepartmentsComponent,
    DepartmentListComponent,
    ClientSetupComponent,
    ClientViewComponent,
    UnitViewComponent,
    ClientSummaryComponent,
    ClientFinanceComponent,

    ClientContactsComponent,
    OrgTreeComponent,
    UnitFinanceComponent,
    AddUnitComponent,
    MessageModalComponent,
    ClientAdminSetupomponent,
    ClientDetailComponent,


    UsersListComponent,
    ClientUsersComponent,
    EditUserComponent,
    AllUsersListComponent,
    DetailsComponent,

    PartnersContainerComponent,
    NewPartnerComponent,
    PartnerInfoComponent,
    PartnerSetupComponent,
    PartnerDetailsComponent,
    PartnerFinanceComponent,
    PartnerContactComponent,
    PartnerContactDetailsComponent,
    PartnerLandingComponent,
    PartnerViewManagerComponent,
    PartnerAddressComponent,

    EditDoctorComponent,
    ClientDoctorsComponent,
    DoctorsListComponent,
    AllDoctorsListComponent,
    MapDoctorComponent,
    UnitSetupComponent,
    UnitLandingComponent,
    ContactDetailsComponent,
    UnitAddressComponent,
    ClientDetailComponent,

    UnitMediaComponent,
    // MediaListComponent,
    // EditMediaItemComponent,

  ],
  providers: [
    ClientOnboardingService,
    ClientsService,
    DoctorsService,
    UsersService,
    DetailsService,
    SpecialitiesService,
    PartnersService,
    MediaService,
    LocationsService,
    ClientsFacade,
    ModalService,
    ApprovalsService,
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
    NewClientComponent,
    ClientTermsComponent,
    MessageModalComponent,
    AddUnitComponent,
    EditUserComponent,
    EditDoctorComponent,
    MapDoctorComponent,
    NewPartnerComponent,
    // EditMediaItemComponent
  ]
})
export class BusinessModule { }
