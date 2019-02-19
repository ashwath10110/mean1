import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsComponent } from './clients/clients/clients.component';
import { ClientDataComponent } from './clients/client-data/client-data.component';

import { ClientContractComponent } from './clients/client-contract/client-contract.component';
import { ClientUsersComponent } from './hospital/users/client-users/client-users.component';
import { ClientSummaryComponent } from './clients/client-summary/client-summary.component';
import { ClientFinanceComponent } from './clients/client-finance/client-finance.component';

import { ClientOnboardSuccessComponent } from './clients/client-onboard-success/client-onboard-success.component';
import { UnitsDepartmentsComponent } from './hospital/specialities/units-departments/units-departments.component';

import { ClientViewComponent } from './clients/client-view/client-view.component';
import { OrgTreeComponent } from './hospital/org-tree/org-tree.component';
import { ClientSetupComponent } from './clients/client-setup/client-setup.component';
import { BusinessContainerComponent } from './clients/business-container/business-container.component';
import { ClientDoctorsComponent } from './hospital/client-doctors/client-doctors/client-doctors.component';

import { DetailsComponent } from './hospital/details/details.component';

import { PartnersContainerComponent } from './hospital/partners/partner-container/partner-container.component';
import { PartnerSetupComponent } from './hospital/partners/partner-setup/partner-setup.component';
import { PartnerLandingComponent } from './hospital/partners/partner-landing/partner-landing.component';
import { PartnerDetailsComponent } from './hospital/partners/partner-details/partner-details.component';
import { PartnerFinanceComponent } from './hospital/partners/partner-finance/partner-finance.component';
import { PartnerContactComponent } from './hospital/partners/partner-contacts/partner-contacts.component';
import { PartnerViewManagerComponent } from './hospital/partners/partner-view-manager/partner-view-manager.component';
import { ClientContactsComponent } from './clients/client-contacts/client-contacts.component';
import { UnitSetupComponent } from './hospital/unit-setup/unit-setup.component';
import { UnitFinanceComponent } from './hospital/finance/unit-finance.component';
import { AllDoctorsListComponent } from './hospital/client-doctors/all-doctors-list/all-doctors-list.component';
import { AllUsersListComponent } from './hospital/users/all-users-list/all-users-list.component';
import { UnitLandingComponent } from './hospital/unit-landing/unit-landing.component';
import { ClientAdminSetupomponent } from './clients/client-admin-setup/client-admin-setup.component';
import { UnitAddressComponent } from './hospital/unit-address/unit-address.component';
import { PartnerAddressComponent } from './hospital/partners/partner-address/partner-address.component';
import { ClientDetailComponent } from './clients/client-detail/client-detail.component';
import { UnitMediaComponent } from '@app/modules/hospital/unit-media/unit-media/unit-media.component';
import { UnitViewComponent } from '@app/modules/hospital/unit-view/unit-view.component';
// import { UnitViewComponent } from './hospital/unit-view/unit-view.component';

const routes: Routes = [
  {
    path: '',
    component: BusinessContainerComponent,
    children: [
      {
        path: 'hospital-info/:id',
        component: OrgTreeComponent
      },
      {
        path: 'client-setup/:id',
        component: ClientSetupComponent,
        children: [
          {
            path: 'contract',
            component: ClientContractComponent
          },
          {
            path: 'account-setup',
            component: ClientDataComponent
          },
          {
            path: 'finance',
            component: ClientFinanceComponent
          },
          {
            path: 'contacts',
            component: ClientContactsComponent
          },
          {
            path: 'admin-setup',
            component: ClientAdminSetupomponent
          },
          {
            path: 'client-detail',
            component: ClientDetailComponent
          },
          {
            path: 'onboarding-success',
            component: ClientOnboardSuccessComponent
          },
          {
            path: '',
            redirectTo: 'contract',
            pathMatch: 'full'
          },
        ]
      },
      {
        path: 'unit-setup/:id',
        component: UnitSetupComponent,
        children: [
          {
            path: 'unit-account-setup/:unitId',
            component: DetailsComponent
          },
          {
            path: 'unit-finance/:unitId',
            component: UnitFinanceComponent
          },
          {
            path: 'unit-users/:unitId',
            component: ClientUsersComponent
          },
          {
            path: 'unit-specialities/:unitId',
            component: UnitsDepartmentsComponent
          },
          {
            path: 'unit-address-details/:unitId',
            component: UnitAddressComponent
          },
          {
            path: 'unit-media/:unitId',
            component: UnitMediaComponent
          },
          {
            path: 'unit-doctors/:unitId',
            component: ClientDoctorsComponent
          },
          {
            path: 'unit-partners/:unitId',
            component: PartnersContainerComponent
          },
          {
            path: '',
            redirectTo: 'unit-account-setup/:unitId',
            pathMatch: 'full'
          },
        ]
      },
      {
        path: 'client-view/:id',
        component: ClientViewComponent,
        children: [
          {
            path: 'summary',
            component: ClientSummaryComponent
          },
          {
            path: 'contract',
            component: ClientContractComponent
          },
          {
            path: 'finance',
            component: ClientFinanceComponent
          },
          {
            path: 'contacts',
            component: ClientContactsComponent
          },
          {
            path: 'admin-setup',
            component: ClientAdminSetupomponent
          },
          {
            path: 'client-detail',
            component: ClientDetailComponent
          },
          {
            path: 'account-setup',
            component: ClientDataComponent
          },
          {
            path: 'onboarding-success',
            component: ClientOnboardSuccessComponent
          },
          {
            path: '',
            redirectTo: 'summary',
            pathMatch: 'full'
          },
        ]
      },
      {
        path: 'unit-view/:id',
        component: UnitViewComponent,
        children: [
          {
            path: 'unit-specialities/:unitId',
            component: UnitsDepartmentsComponent
          },
          {
            path: 'unit-users/:unitId',
            component: ClientUsersComponent
          },
          {
            path: 'unit-account-setup/:unitId',
            component: DetailsComponent
          },
          {
            path: 'unit-finance/:unitId',
            component: UnitFinanceComponent
          },
          {
            path: 'unit-doctors/:unitId',
            component: ClientDoctorsComponent
          },
          {
            path: 'unit-summary/:unitId',
            component: UnitLandingComponent
          },
          {
            path: 'unit-address-details/:unitId',
            component: UnitAddressComponent
          },
          {
            path: 'unit-media/:unitId',
            component: UnitMediaComponent
          },
          {
            path: 'unit-partners/:unitId',
            component: PartnersContainerComponent
          },
          {
            path: 'unit-partners/:unitId/partner-setup/:partnerId',
            component: PartnerSetupComponent,
            children: [
              {
                path: 'partner-summary',
                component: PartnerLandingComponent,
              },
              {
                path: 'partner-details',
                component: PartnerDetailsComponent,
              },
              {
                path: 'partner-finance',
                component: PartnerFinanceComponent,
              },
              {
                path: 'partner-contact-person',
                component: PartnerContactComponent,
              },
              {
                path: 'partner-address',
                component: PartnerAddressComponent,
              }
            ]
          },
          {
            path: 'unit-partners/:unitId/partner-view/:partnerId',
            component: PartnerViewManagerComponent,
            children: [
              {
                path: 'partner-summary',
                component: PartnerLandingComponent,
              },
              {
                path: 'partner-details',
                component: PartnerDetailsComponent,
              },
              {
                path: 'partner-finance',
                component: PartnerFinanceComponent,
              },
              {
                path: 'partner-contact-person',
                component: PartnerContactComponent,
              },
              {
                path: 'partner-address',
                component: PartnerAddressComponent,
              }
            ]
          },
          {
            path: 'unit-summary/:unitId',
            component: UnitLandingComponent
          },
          {
            path: '',
            redirectTo: 'unit-summary/:unitId',
            pathMatch: 'full'
          }
        ]
      },
      {
        path: 'unit-approve/:id',
        children: [
          {
            path: 'unit-specialities/:unitId',
            component: UnitsDepartmentsComponent
          },
          {
            path: 'unit-users/:unitId',
            component: ClientUsersComponent
          },
          {
            path: 'unit-account-setup/:unitId',
            component: DetailsComponent
          },
          {
            path: 'unit-address-details/:unitId',
            component: UnitAddressComponent
          },
          {
            path: 'unit-finance/:unitId',
            component: UnitFinanceComponent
          },
          {
            path: 'unit-doctors/:unitId',
            component: ClientDoctorsComponent
          },
          {
            path: 'unit-summary/:unitId',
            component: UnitLandingComponent
          },
          {
            path: 'unit-partners/:unitId',
            component: PartnersContainerComponent
          },
          {
            path: 'unit-media/:unitId',
            component: UnitMediaComponent
          },
          {
            path: 'unit-partners/:unitId/partner-setup/:partnerId',
            component: PartnerSetupComponent,
            children: [
              {
                path: 'partner-summary',
                component: PartnerLandingComponent,
              },
              {
                path: 'partner-details',
                component: PartnerDetailsComponent,
              },
              {
                path: 'partner-finance',
                component: PartnerFinanceComponent,
              },
              {
                path: 'partner-contact-person',
                component: PartnerContactComponent,
              },
              {
                path: 'partner-address',
                component: PartnerAddressComponent,
              }
            ]
          },
          {
            path: 'unit-partners/:unitId/partner-view/:partnerId',
            component: PartnerViewManagerComponent,
            children: [
              {
                path: 'partner-summary',
                component: PartnerLandingComponent,
              },
              {
                path: 'partner-details',
                component: PartnerDetailsComponent,
              },
              {
                path: 'partner-finance',
                component: PartnerFinanceComponent,
              },
              {
                path: 'partner-contact-person',
                component: PartnerContactComponent,
              },
              {
                path: 'partner-address',
                component: PartnerAddressComponent,
              }
            ]
          },
          {
            path: 'unit-summary/:unitId',
            component: UnitLandingComponent
          },
          {
            path: '',
            redirectTo: 'unit-summary/:unitId',
            pathMatch: 'full'
          }
        ]
      },
      {
        path: 'clients-list',
        component: ClientsComponent
      },
      {
        path: 'all-doctors',
        component: AllDoctorsListComponent
      },
      {
        path: 'all-users',
        component: AllUsersListComponent
      },
      {
        path: 'partners',
        component: PartnersContainerComponent
      },
      {
        path: 'partner-setup/:partnerId',
        component: PartnerSetupComponent,
        children: [
          {
            path: 'partner-summary',
            component: PartnerLandingComponent,
          },
          {
            path: 'partner-details',
            component: PartnerDetailsComponent,
          },
          {
            path: 'partner-finance',
            component: PartnerFinanceComponent,
          },
          {
            path: 'partner-contact-person',
            component: PartnerContactComponent,
          },
          {
            path: 'partner-address',
            component: PartnerAddressComponent,
          },
          {
            path: '',
            redirectTo: 'partner-summary',
            pathMatch: 'full'
          }
        ]
      },
      {
        path: 'partner-view/:partnerId',
        component: PartnerViewManagerComponent,
        children: [
          {
            path: 'partner-summary',
            component: PartnerLandingComponent,
          },
          {
            path: 'partner-details',
            component: PartnerDetailsComponent,
          },
          {
            path: 'partner-finance',
            component: PartnerFinanceComponent,
          },
          {
            path: 'partner-contact-person',
            component: PartnerContactComponent,
          },
          {
            path: 'partner-address',
            component: PartnerAddressComponent,
          },
          {
            path: '',
            redirectTo: 'partner-summary',
            pathMatch: 'full'
          },
        ]
      },
      {
        path: '',
        redirectTo: 'clients-list',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: "approvals", loadChildren: "./../modules/approvals/approvals.module#ApprovalsModule"
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinessRoutingModule { }
