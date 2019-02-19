import { Component, OnInit, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { Actions, ofType } from '@ngrx/effects';

import { takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { State, selectHomeState } from '@app/state/home/home.state';
import { DetailsActionTypes, ActionUpdateUnitAddressDetailsSuccess, ActionUpdateUnitFinanceSuccess } from '@app/state/details/details.actions';

@Component({
  selector: 'app-unit-landing',
  templateUrl: './unit-landing.component.html',
  styleUrls: ['./unit-landing.component.scss']
})
export class UnitLandingComponent implements OnInit {

  tenantLevelData;
  orgChartState;

  @Input() unitId: any;
  private unsubscribe$: Subject<void> = new Subject<void>();

  sub: any;
  parentRouteId: any;

  currentUnit: any;
  init = false;
  breadcrumbs: any;

  constructor(
    public store: Store<State>,
    private updates$: Actions,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.sub = this.route.parent.params.subscribe(params => {
      this.parentRouteId = params["id"];
    });

    this.sub = this.route.params.subscribe(params => {
      this.unitId = params["unitId"];
    });
    this.store
      .pipe(select(selectHomeState), takeUntil(this.unsubscribe$))
      .subscribe((tenantLevelData: any) => {
        this.tenantLevelData = tenantLevelData.client;
      });

    this.breadcrumbs = [
      {
        'label': 'Org Tree',
        'url': '#/home/business/hospital-info/' + this.parentRouteId
      },
      {
        'label': 'Unit Details'
      }
    ]

    // if (!this.init) {
    // this.init = true;

    // this.store.dispatch(
    //   new ActionTenantUnitDetails({})
    // );

    // //ToDo: If already loaded, dont load it.
    // this.store.dispatch(
    //   new ActionGetUsers({})
    // );
    // this.store.dispatch(
    //   new ActionGetDoctors({})
    // );
    // this.store.dispatch(
    //   new ActionGetDoctorsByUnitId({ unitId: this.parentRouteId })
    // );
    // this.store.dispatch(
    //   new ActionGetAllMappingByUnitId({ unitId: this.parentRouteId })
    // );
    // // }

    // this.updates$.pipe(
    //   ofType<ActionTenantUnitDetailsSuccess>(HomeActionTypes.GET_TENANT_UNITS_SUCCESS),
    //   tap(action =>
    //     this.initFilteredList(action)
    //   )
    // ).subscribe();
    // this.updates$.pipe(
    //   takeUntil(this.unsubscribe$),
    //   ofType<ActionUpdateUnitAddressDetailsSuccess>(DetailsActionTypes.UPDATE_UNIT_ADDRESS_DETAILS_SUCCESS),
    //   tap(action =>
    //     this.updateUnitAddressDetailsSuccessHandler(action)
    //   )
    // ).subscribe();

    // this.updates$.pipe(
    //   takeUntil(this.unsubscribe$),
    //   ofType<ActionUpdateUnitFinanceSuccess>(DetailsActionTypes.UPDATE_UNIT_FINANCE_SUCCESS),
    //   tap(action =>
    //     this.updateUnitFinanceDetailsSuccessHandler(action)
    //   )
    // ).subscribe();

    // this.updates$.pipe(
    //   ofType<ActionRemoveDoctorFromDepartmentSuccess>(HomeActionTypes.REMOVE_DOCTOR_FROM_DEPARTMENT_SUCCESS),
    //   tap(action =>
    //     this.reloadDoctors(action)
    //   )
    // ).subscribe();

    // this.updates$.pipe(
    //   tap(action => {
    //     this.refreshPageData();
    //   })
    // ).subscribe();

    // this.updates$.pipe(
    //   ofType<ActionDeleteDepartmentSuccess>(HomeActionTypes.DELETE_DEPARTMENT_SUCCESS),
    //   tap(action =>
    //     this.refreshPageData()
    //   )
    // ).subscribe();

    // this.updates$.pipe(
    //   ofType<ActionUpdateDepartmentsSuccess>(HomeActionTypes.UPDATE_DEPARTMENTS_SUCCESS),
    //   tap(action =>
    //     this.refreshPageData()
    //   )
    // ).subscribe();

    // this.updates$.pipe(
    //   ofType<ActionDeleteDepartmentSuccess>(HomeActionTypes.DELETE_DEPARTMENT_SUCCESS),
    //   tap(action =>
    //     this.refreshPageData()
    //   )
    // ).subscribe();

    // this.updates$.pipe(
    //   ofType<ActionGetDoctorsByUnitIdSuccess>(HomeActionTypes.GET_DOCTORS_BY_UNIT_ID_SUCCESS),
    //   tap(action =>
    //     this.doctorsSuccess(action)
    //   )
    // ).subscribe();
  }

  gotoDoctors() {
    const url = 'home/business/unit-view/' + this.parentRouteId + '/unit-doctors/' + this.unitId;
    this.router.navigate([url]);
  }

  gotoSpecialities() {
    const url = 'home/business/unit-view/' + this.parentRouteId + '/unit-specialities/' + this.unitId;
    this.router.navigate([url]);
  }

  gotoDetails() {
    //unit-setup/fa1710ad-9fa8-4ed4-afd6-197c6c623131/unit-account-setup/05c108eb-9eb0-4d03-92ad-02174ab13ec7
    const url = 'home/business/unit-view/' + this.parentRouteId + '/unit-account-setup/' + this.unitId;
    this.router.navigate([url]);
  }

  gotoAddressDetails() {
    const url = 'home/business/unit-view/' + this.parentRouteId + '/unit-address-details/' + this.unitId;
    //  const url = 'home/business/unit-view/' + this.parentRouteId + '/unit-account-setup/'+ this.unitId;
    this.router.navigate([url]);
  }

  gotoFinance() {
    const url = 'home/business/unit-view/' + this.parentRouteId + '/unit-finance/' + this.unitId;
    this.router.navigate([url]);
  }

  gotoUnitUsers() {
    const url = 'home/business/unit-view/' + this.parentRouteId + '/unit-users/' + this.unitId;
    this.router.navigate([url]);
  }

  gotoUnitSummary() {
    const url = 'home/business/unit-view/' + this.parentRouteId + '/unit-summary/' + this.unitId;
    this.router.navigate([url]);
  }

  goToUnitMedia() {
    const url = 'home/business/unit-view/' + this.parentRouteId + '/unit-media/' + this.unitId;
    this.router.navigate([url]);
  }

  goToPartner() {
    const url = 'home/business/unit-view/' + this.parentRouteId + '/unit-partners/' + this.unitId;
    this.router.navigate([url]);
  }

  doctorsSuccess(action) { }

  refreshPageData() {
    // this.store.dispatch(
    //   new ActionGetUsers({})
    // );
    // this.store.dispatch(
    //   new ActionGetDoctors({})
    // );
    // this.store.dispatch(
    //   new ActionGetDoctorsByUnitId({ unitId: this.parentRouteId })
    // );
    // this.store.dispatch(
    //   new ActionGetAllMappingByUnitId({ unitId: this.parentRouteId })
    // );
  }

  initFilteredList(action) {
    // this.currentUnit = this.tenantLevelData.unitsList.filter(ele => {
    //   return ele.mbid === this.parentRouteId;
    // })[0];
    // this.currentUnit = JSON.parse(JSON.stringify(this.currentUnit));
  }

  reloadDoctors(action) {
    // this.refreshPageData();
    // this.store.dispatch(
    //   new ActionGetDoctors({})
    // );
  }

  // getList(mappingsByUnitId, doctorsList) {
  //   const filtered = [];
  //   const processAllDoctors = [];
  //   for (var arr in doctorsList) {
  //     for (var filter in mappingsByUnitId) {
  //       let assigned = false;
  //       if (doctorsList[arr].mbid == mappingsByUnitId[filter].doctorId) {
  //         filtered.push(doctorsList[arr]);
  //         const mbid = doctorsList[arr].mbid;
  //         const res = mappingsByUnitId.filter(ele => {
  //           return ele.depId === mbid;
  //         });
  //       }
  //       else {
  //         assigned = false;
  //       }
  //       processAllDoctors.push({
  //         ...doctorsList[arr],
  //         assigned: assigned
  //       });
  //     }
  //   }
  //   return processAllDoctors;
  // }

  handleDeleteDepartment(event) {
    // this.store.dispatch(
    //   new ActionDeleteDepartment({ value: event })
    // );
  }

  updateUnitAddressDetailsSuccessHandler(action) {
    this.gotoUnitSummary();
  }

  updateUnitFinanceDetailsSuccessHandler(action) {

    this.gotoUnitSummary();
  }

  addSpecialities() {
    // const dialogRef = this.dialog.open(AddBulkDepartmentsComponent, {
    //   width: '800px',
    //   data: {
    //     dataForForm: {},
    //     statusForUpdate: 'post',
    //     unitId: this.parentRouteId
    //   }
    // });
    // dialogRef.afterClosed().subscribe(result => {
    //   if (result && result.status) {

    //   }
    //   else {

    //   }
    // });
  }

  addDoctors() {
    // const url = '/home/client/all-doctors';
    // this.router.navigate([url]);
  }

  /*addUnitContacts(){}
  editUnitContacts(){}*/

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
