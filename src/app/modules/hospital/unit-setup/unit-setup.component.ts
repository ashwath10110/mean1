import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

import { Actions, ofType } from '@ngrx/effects';
import { Router, ActivatedRoute } from '@angular/router';

import { State } from '@app/state/home/home.state';
import { selectClientOnboarding } from '@app/state/client-onboarding/client-onboarding.selectors';
import { MatDialog } from '@angular/material';
import { MessageModalComponent } from '@app/common/message-modal/message-modal.component';
import { UnitsActions, ActionGoToSetUpUnit, UnitsActionTypes, ActionGetTenantUnitsSuccess } from '@app/state/units/units.actions';
import { ActionUpdateUnitAddressDetailsSuccess, DetailsActionTypes, ActionUpdateUnitFinanceSuccess } from '@app/state/details/details.actions';
import { ActionUpdateUnitSpecialityDetailsSuccess, SpecialitiesActionTypes, ActionProceedFromSpecialities } from '@app/state/specialities/specialities.actions';
import { DoctorsActionTypes, ActionAddDoctorsSuccess, ActionAddMoreDoctor } from '@app/state/doctors/doctors.actions';
import { ActionAddMoreUser, ActionUpdateUserSuccess, UsersActionTypes } from '@app/state/users/users.actions';
import { ClientsActionTypes, ActionGetTenantDetailsSuccess } from '@app/state/clients/clients.actions';


@Component({
  selector: 'app-unit-setup',
  templateUrl: './unit-setup.component.html',
  styleUrls: ['./unit-setup.component.css']
})
export class UnitSetupComponent implements OnInit {

  private unsubscribe$: Subject<void> = new Subject<void>();
  clientData: any;

  sub: any;
  parentRouteId: any;
  unitId: any;

  constructor(
    public store: Store<State>,
    private updates$: Actions,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
  ) {
    this.sub = this.route.params.subscribe(params => {
      this.parentRouteId = params["id"];
    });
  }

  ngOnInit() {
    this.store
      .pipe(select(selectClientOnboarding), takeUntil(this.unsubscribe$))
      .subscribe((clientData: any) => {
        this.clientData = clientData;
      });
    this.initEffects();
  }

  initEffects() {

    this.updates$.pipe(
      takeUntil(this.unsubscribe$),
      ofType<ActionProceedFromSpecialities>(SpecialitiesActionTypes.PROCEED_FROM_SPECIALITIES),
      tap(action =>
        this.handleProceedFromSpecialities(action)
      )
    ).subscribe();

    this.updates$.pipe(
      takeUntil(this.unsubscribe$),
      ofType<ActionGetTenantDetailsSuccess>(ClientsActionTypes.GET_TENANT_DETAILS_SUCCESS),
      tap(action =>
        this.handleGetTenantDetailsSuccess(action)
      )
    ).subscribe();

    this.updates$.pipe(
      takeUntil(this.unsubscribe$),
      ofType<ActionGetTenantUnitsSuccess>(UnitsActionTypes.GET_TENANT_UNITS_SUCCESS),
      tap(action =>
        this.handleGetTenantUnitsSuccess(action)
      )
    ).subscribe();

    // this.updates$.pipe(
    //   takeUntil(this.unsubscribe$),
    //   ofType<ActionUpdateUnitSpecialityDetailsSuccess>(SpecialitiesActionTypes.UPDATE_UNIT_SPECIALITY_DETAILS_SUCCESS),
    //   tap(action =>
    //     this.handleUpdateUnitSpecialitySuccess(action)
    //   )
    // ).subscribe();

    // this.updates$.pipe(
    //   takeUntil(this.unsubscribe$),
    //   ofType<ActionUpdateUserSuccess>(UsersActionTypes.UPDATE_USER_SUCCESS),
    //   tap(action =>
    //     this.handleUpdateUserSuccess(action)
    //   )
    // ).subscribe();

    this.updates$.pipe(
      takeUntil(this.unsubscribe$),
      ofType<ActionAddDoctorsSuccess>(DoctorsActionTypes.ADD_DOCTORS_SUCCESS),
      tap(action =>
        this.handleAddDoctorSuccess(action)
      )
    ).subscribe();

    // this.updates$.pipe(
    //   takeUntil(this.unsubscribe$),
    //   ofType<ActionUpdateUnitFinanceSuccess>(DetailsActionTypes.UPDATE_UNIT_FINANCE_SUCCESS),
    //   tap(action =>
    //     this.handleUpdateUnitFinanceSuccess(action)
    //   )
    // ).subscribe();

    // this.updates$.pipe(
    //   takeUntil(this.unsubscribe$),
    //   ofType<ActionUpdateUnitAddressDetailsSuccess>(DetailsActionTypes.UPDATE_UNIT_ADDRESS_DETAILS_SUCCESS),
    //   tap(action =>
    //     this.handleUpdateUnitDetailsSuccess(action)
    //   )
    // ).subscribe();

       
  }

  handleProceedFromSpecialities(action) {
    const unitId = action.payload.data.id;
    this.router.navigate(['home/business/unit-setup/' + this.parentRouteId + '/unit-doctors/' + unitId]);
  }

  // handleUpdateUnitSpecialitySuccess(action) {
  //   const unitId = action.payload.data.id;
  //   const dialogRef = this.dialog.open(MessageModalComponent, {
  //     width: '400px',
  //     data: {
  //       name: "specialities-successful",
  //       data: {}
  //     }
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result && result.status) {
  //       this.router.navigate(['home/business/unit-setup/' + this.parentRouteId + '/unit-doctors/' + unitId]);
  //     }
  //   });
  // }

  // handleUpdateUserSuccess(action) {
  //   const unitId = action.payload.data.id;
  //   const dialogRef = this.dialog.open(MessageModalComponent, {
  //     width: '400px',
  //     data: {
  //       name: "add-user-success",
  //       data: {}
  //     }
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result && result.status) {
  //       if (result.message == 'add-more') {
  //         this.store.dispatch(
  //           new ActionAddMoreUser({})
  //         );
  //       }
  //       if (result.message == 'success') {
  //         this.router.navigate(['home/business/unit-view/' + this.parentRouteId + '/unit-partners/' + unitId]);
  //       }
  //     }
  //   });
  // }

  handleAddDoctorSuccess(action) {
    const unitId = action.payload.data.id;
    const dialogRef = this.dialog.open(MessageModalComponent, {
      width: '400px',
      data: {
        name: "add-doctor-success",
        data: {}
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.status) {
        if (result.message == 'add-more') {
          this.store.dispatch(
            new ActionAddMoreDoctor({})
          );
        }
        if (result.message == 'success') {
          this.router.navigate(['home/business/unit-setup/' + this.parentRouteId + '/unit-users/' + unitId]);
        }
      }
    });
  }

  // handleUpdateUnitFinanceSuccess(action) {
  //   const unitId = action.payload.data.unitId;
  //   const dialogRef = this.dialog.open(MessageModalComponent, {
  //     width: '400px',
  //     data: {
  //       name: "unit-finance-success",
  //       data: {}
  //     }
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result && result.status) {
  //       if (result.message == 'success') {
  //        // this.router.navigate(['home/business/unit-setup/' + this.parentRouteId + '/unit-contacts/' + unitId]);
  //       }
  //     }
  //   });
  // }

  //handleUpdateUnitDetailsSuccess(action) {
    // const unitId = action.payload.data.id;
    // const dialogRef = this.dialog.open(MessageModalComponent, {
    //   width: '400px',
    //   data: {
    //     name: "unit-details-success",
    //     data: {}
    //   }
    // });
    // dialogRef.afterClosed().subscribe(result => {
    //   if (result && result.status) {
    //     if (result.message == 'success') {
    //       this.router.navigate(['home/business/unit-setup/' + this.parentRouteId + '/unit-finance/' + unitId]);
    //     }
    //   }
    // });
  //}

  handleGetTenantUnitsSuccess(action) {
    const data = action.payload[0].data;
    if (data.length == 1) {
      this.handleEmptyUnitData(action);
    }
  }

  handleGetTenantDetailsSuccess(action) { }

  handleEmptyUnitData(action) {
    const contract = action.payload[0].data[0];
    const dialogRef = this.dialog.open(MessageModalComponent, {
      width: '400px',
      data: {
        name: "one-unit",
        data: {}
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.status) {
        this.router.navigate(['home/business/client-view/' + this.parentRouteId + '/unit-account-setup/' + contract.id]);
      }
    });
  }

  gotoOrgTree() {
    this.router.navigate(['home/business/client-setup/' + this.parentRouteId + '/hospital-info']);
  }

  gotoAccount() {
    this.router.navigate(['home/business/client-setup/' + this.parentRouteId + '/account-setup']);
  }

  gotoFinance() {
    this.router.navigate(['home/business/client-setup/' + this.parentRouteId + '/finance']);
  }

  gotoContacts() {
    this.router.navigate(['home/business/client-setup/' + this.parentRouteId + '/contacts']);
  }

  gotoSummary() {
    this.router.navigate(['home/business/client-setup/' + this.parentRouteId + '/onboarding-success']);
  }

  updateClientContactsSuccessHandler(action) {
    this.gotoSummary();
  }

  goToSetupUnitHandler(action) {
    let tenantId = this.parentRouteId;
    let unitId = "";
    this.router.navigate(['home/business/client-setup/' + tenantId + '/hospital-info/' + unitId]);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
