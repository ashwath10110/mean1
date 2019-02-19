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

@Component({
  selector: 'app-client-view',
  templateUrl: './client-view.component.html',
  styleUrls: ['./client-view.component.scss']
})
export class ClientViewComponent implements OnInit {

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

    this.updates$.pipe(
      takeUntil(this.unsubscribe$),
      ofType<clientOnboardingActions.ActionUpdateClientContractDataSuccess>(ClientOnboardingActionTypes.UPDATE_CLIENT_CONTRACT_DATA_SUCCESS),
      tap(action =>
        this.clientContractSuccessHandler(action)
      )
    ).subscribe();

    this.updates$.pipe(
      takeUntil(this.unsubscribe$),
      ofType<clientOnboardingActions.ActionUpdateClientData>(ClientOnboardingActionTypes.UPDATE_CLIENT_DATA_SUCCESS),
      tap(action =>
        this.clientDetailSuccessHandler(action)
      )
    ).subscribe();

    this.updates$.pipe(
      takeUntil(this.unsubscribe$),
      ofType<clientOnboardingActions.ActionUpdateClientAdminAccountsDataSuccess>(ClientOnboardingActionTypes.UPDATE_CLIENT_ADMIN_ACCOUNTS_DATA_SUCCESS),
      tap(action =>
        this.clientAdminAccountsDataSuccessHandler(action)
      )
    ).subscribe();

    this.updates$.pipe(
      takeUntil(this.unsubscribe$),
      ofType<clientOnboardingActions.ActionUpdateClientFinanceDataSuccess>(ClientOnboardingActionTypes.UPDATE_CLIENT_FINANCE_DATA_SUCCESS),
      tap(action =>
        this.clientFinanceDataSuccessHandler(action)
      )
    ).subscribe();

    this.updates$.pipe(
      takeUntil(this.unsubscribe$),
      ofType<clientOnboardingActions.ActionCreateAdminUser>(ClientOnboardingActionTypes.CREATE_ADMIN_USER_SUCCESS),
      tap(action =>
        this.clientAdminUserSuccessHandler(action)
      )
    ).subscribe();

    this.updates$.pipe(
      takeUntil(this.unsubscribe$),
      ofType<clientOnboardingActions.ActionUpdateClientContactDetails>(ClientOnboardingActionTypes.UPDATE_CLIENT_CONTACT_DETAILS),
      tap(action =>
        this.clientContactSuccessHandler(action)
      )
    ).subscribe();

    this.updates$.pipe(
      takeUntil(this.unsubscribe$),
      ofType<clientOnboardingActions.ActionDeleteClientContactDetails>(ClientOnboardingActionTypes.DELETE_CLIENT_CONTACT_DETAILS),
      tap(action =>
        this.clientDeleteContactSuccessHandler(action)
      )
    ).subscribe();

    
  }


  clientDeleteContactSuccessHandler(action) {
    const dialogRef = this.dialog.open(MessageModalComponent, {
      width: '300px',
      data: {
        name: "delete-client-contact-success",
        data: {}
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.status) { 
        if (result.message == "cancel") {
         this.gotoSummary();
        }
      }
    });
  }

  clientContactSuccessHandler(action) {
    const dialogRef = this.dialog.open(MessageModalComponent, {
      width: '300px',
      data: {
        name: "client-contact-success",
        data: {}
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.status) { 
        if (result.message == "cancel") {
         this.gotoSummary();
        }
      }
    });
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
