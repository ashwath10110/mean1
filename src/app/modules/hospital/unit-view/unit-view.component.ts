import { Component, Inject, OnInit, ViewChild, AfterViewInit, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Subject, Observable } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

import { Actions, ofType } from '@ngrx/effects';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';

import { State } from '@app/state/home/home.state';
import { selectClientOnboarding } from '@app/state/client-onboarding/client-onboarding.selectors';
import { ClientOnboardingActionTypes } from '@app/state/client-onboarding/client-onboarding.actions';
import * as clientOnboardingActions from '@app/state/client-onboarding/client-onboarding.actions';
import { MessageModalComponent } from '@app/common/message-modal/message-modal.component';
import { ActionUpdateUnitAddressDetailsSuccess, DetailsActionTypes, ActionUpdateUnitFinanceSuccess } from '@app/state/details/details.actions';
import { ActionUpdateUnitSpecialityDetailsSuccess, SpecialitiesActionTypes } from '@app/state/specialities/specialities.actions';

@Component({
  selector: 'app-unit-view',
  templateUrl: './unit-view.component.html',
  styleUrls: ['./unit-view.component.scss']
})
export class UnitViewComponent implements OnInit {

  private unsubscribe$: Subject<void> = new Subject<void>();
  clientData: any;

  sub: any;
  parentRouteId: any;

  constructor(
    public store: Store<State>,
    private updates$: Actions,
    private router: Router,
    public dialog: MatDialog,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.store
      .pipe(select(selectClientOnboarding), takeUntil(this.unsubscribe$))
      .subscribe((clientData: any) => {
        this.clientData = clientData;
      });
    
    this.sub = this.route.params.subscribe(params => {
      this.parentRouteId = params["id"];
    });

    this.initEffects();
  }

  initEffects() {

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
    //   takeUntil(this.unsubscribe$),
    //   ofType<ActionUpdateUnitSpecialityDetailsSuccess>(SpecialitiesActionTypes.UPDATE_UNIT_SPECIALITY_DETAILS_SUCCESS),
    //   tap(action =>
    //     this.updateUnitSpecialitiesDetailsSuccessHandler(action)
    //   )
    // ).subscribe();
  }

  // updateUnitAddressDetailsSuccessHandler(action) {
  //   this.gotoUnitSummary(action);
  // }

  // updateUnitFinanceDetailsSuccessHandler(action) {
  //   this.gotoUnitSummary(action);
  // }

  // updateUnitSpecialitiesDetailsSuccessHandler(action) {
  //   this.gotoUnitSummary(action);
  // }

  gotoUnitSummary(action) {
    let unitId = action.payload.data.id;
    const url = 'home/business/unit-view/' + this.parentRouteId + '/unit-summary/' + unitId;
    this.router.navigate([url]);
  }

  
  clientContractSuccessHandler(action) {
    const dialogRef = this.dialog.open(MessageModalComponent, {
      width: '300px',
      data: {
        name: "client-contract-success",
        data: {}
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.status) { 
        if (result.message == "success") {
         this.gotoSummary();
        }
      }
    });
  }

  clientAdminAccountsDataSuccessHandler(action) {
    const contract = action.payload.data;
    const dialogRef = this.dialog.open(MessageModalComponent, {
      width: '300px',
      data: {
        name: "client-data-success",
        data: {}
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.status) { 
        if (result.message == "success") {
         this.gotoSummary();
        }
      }
    });
  }

  clientDetailSuccessHandler(action) {
    const contract = action.payload.data;
    const dialogRef = this.dialog.open(MessageModalComponent, {
      width: '300px',
      data: {
        name: "client-detail-success",
        data: {}
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.status) { 
        if (result.message == "success") {
         this.gotoSummary();
        }
      }
    });
  }
   

  clientFinanceDataSuccessHandler(action) {
    const contract = action.payload.data;
    const dialogRef = this.dialog.open(MessageModalComponent, {
      width: '300px',
      data: {
        name: "client-finance-success",
        data: {}
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.status) { 
        if (result.message == "success") {
         this.gotoSummary();
        }
      }
    });
  }

  clientAdminUserSuccessHandler(action) {
    const dialogRef = this.dialog.open(MessageModalComponent, {
      width: '300px',
      data: {
        name: "client-admin-user",
        data: {}
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.status) { 
        if (result.message == "success") {
         this.gotoSummary();
        }
      }
    });
  }

  gotoSummary() {
    this.router.navigate(['home/business/client-view/' + this.parentRouteId + '/summary']);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
