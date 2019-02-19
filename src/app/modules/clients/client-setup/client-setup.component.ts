import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

import { Actions, ofType } from '@ngrx/effects';
import { Router, ActivatedRoute } from '@angular/router';

import { State } from '@app/state/home/home.state';
import { selectClientOnboarding } from '@app/state/client-onboarding/client-onboarding.selectors';
import { ClientOnboardingActionTypes } from '@app/state/client-onboarding/client-onboarding.actions';
import * as clientOnboardingActions from '@app/state/client-onboarding/client-onboarding.actions';
import { MatDialog } from '@angular/material';
import { MessageModalComponent } from '@app/common/message-modal/message-modal.component';

@Component({
  selector: 'app-client-setup',
  templateUrl: './client-setup.component.html',
  styleUrls: ['./client-setup.component.css']
})
export class ClientSetupComponent implements OnInit {

  private unsubscribe$: Subject<void> = new Subject<void>();
  clientData: any;

  sub: any;
  parentRouteId: any;

  setupState = "contractState";

  initModal = 0;

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
    this.init();
    this.initEffects();
  }

  init() {
    if (this.setupState === 'contractState') {
      this.gotoContract();
    }
    else if (this.setupState === 'financeState') {
      this.gotoFinance();
    }
    else if (this.setupState === 'adminAccountState') {
      this.gotoAccount();
    }
    else if (this.setupState === 'contactsState') {
      this.gotoContacts();
    }
  }

  initEffects() {

    this.updates$.pipe(
      takeUntil(this.unsubscribe$),
      ofType<clientOnboardingActions.ActionUpdateClientContractDataSuccess>(ClientOnboardingActionTypes.UPDATE_CLIENT_CONTRACT_DATA_SUCCESS),
      tap(action =>
        this.updateClientContractSuccessHandler(action)
      )
    ).subscribe();

    this.updates$.pipe(
      takeUntil(this.unsubscribe$),
      ofType<clientOnboardingActions.ActionCreateAdminUserSuccess>(ClientOnboardingActionTypes.CREATE_ADMIN_USER_SUCCESS),
      tap(action =>
        this.updateAdminUserSuccessHandler(action)
      )
    ).subscribe();

    // this.updates$.pipe(
    //   takeUntil(this.unsubscribe$),
    //   ofType<clientOnboardingActions.ActionUpdateClientAdminAccountsDataSuccess>(ClientOnboardingActionTypes.UPDATE_CLIENT_ADMIN_ACCOUNTS_DATA_SUCCESS),
    //   tap(action =>
    //     this.clientAdminAccountsDataSuccessHandler(action)
    //   )
    // ).subscribe();

    this.updates$.pipe(
      takeUntil(this.unsubscribe$),
      ofType<clientOnboardingActions.ActionUpdateClientAdminAccountsDataSuccess>(ClientOnboardingActionTypes.UPDATE_CLIENT_ADMIN_ACCOUNTS_DATA_SUCCESS),
      tap(action =>
        this.updateClientAddressSuccessHandler(action)
      )
    ).subscribe();
    this.updates$.pipe(
      takeUntil(this.unsubscribe$),
      ofType<clientOnboardingActions.ActionUpdateClientFinanceDataSuccess>(ClientOnboardingActionTypes.UPDATE_CLIENT_FINANCE_DATA_SUCCESS),
      tap(action =>
        this.updateClientFinanceDataSuccessHandler(action)
      )
    ).subscribe();

    this.updates$.pipe(
      takeUntil(this.unsubscribe$),
      ofType<clientOnboardingActions.ActionUpdateClientContactDetailsSuccessAutoFlow>(ClientOnboardingActionTypes.UPDATE_CLIENT_CONTACT_DETAILS_SUCCESS_AUTO_FLOW),
      tap(action =>
        this.updateClientContactsSuccessHandler(action)
      )
    ).subscribe();

  }

  gotoContract() {
    this.router.navigate(['home/business/client-setup/' + this.parentRouteId + '/contract']);
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

  gotoOrgTree() {
    this.router.navigate(['/home/business/hospital-info/' + this.parentRouteId]);
  }

  gotoAdmin() {
    this.router.navigate(['home/business/client-setup/' + this.parentRouteId + '/admin-setup']);
  }

  updateClientContractSuccessHandler(action) {
    this.handleContractSuccess(action);
  }


  updateAdminUserSuccessHandler(action) {
    const dialogRef = this.dialog.open(MessageModalComponent, {
      width: '300px',
      data: {
        name: "CreateAdminUserSuccess",
        data: {}
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.status) {
        if (result.message == "success") {
          this.gotoAccount();
        }
      }
      else if (result && !result.status) {
        if (result.message == "setup-again") {
        }
        else if (result.message == "cancel") {
          this.router.navigate(['home/business/clients-list/']);
        }
      }
    });
  }


  updateClientContactsSuccessHandler(action) {
    const dialogRef = this.dialog.open(MessageModalComponent, {
      width: '300px',
      data: {
        name: "clientContactsSuccess",
        data: {}
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.status) {
        if (result.message == "success") {
          this.gotoSummary();
        }
      }
      else if (result && !result.status) {
        if (result.message == "setup-again") {
        }
        else if (result.message == "cancel") {
          this.router.navigate(['home/business/clients-list/']);
        }
      }
    });
  }

  goToSetupUnitHandler(action) {
    let tenantId = this.parentRouteId;
    let unitId = "";
    this.router.navigate(['home/business/client-setup/' + tenantId + '/unit-account-setup/' + unitId]);
  }

  handleContractSuccess(action) {
    const contract = action.payload.data;
    const dialogRef = this.dialog.open(MessageModalComponent, {
      width: '300px',
      data: {
        name: "contractSuccess",
        data: {
          contract: contract
        }
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.status) {
        if (result.message == "success") {
          //this.gotoAccount();
          this.gotoAdmin();
        }
      }
      else if (result && !result.status) {
        if (result.message == "setup-again") {
        }
        else if (result.message == "cancel") {
          this.router.navigate(['home/business/clients-list/']);
        }
      }
    });
  }

  updateClientFinanceDataSuccessHandler(action) {
    const finance = action.payload.data;
    const dialogRef = this.dialog.open(MessageModalComponent, {
      width: '300px',
      data: {
        name: "financeSuccess",
        data: {
          contract: finance
        }
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.status) {
        if (result.message == "success") {
          this.gotoContacts();
        }
      }
      else if (result && !result.status) {
        if (result.message == "setup-again") {
        }
        else if (result.message == "cancel") {
          this.router.navigate(['home/business/clients-list/']);
        }
      }
    });

  }

  updateClientAddressSuccessHandler(action) {
    const address = action.payload.data;
    const dialogRef = this.dialog.open(MessageModalComponent, {
      width: '300px',
      data: {
        name: "addressSuccess",
        data: {
          contract: address
        }
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.status) {
        if (result.message == "success") {
          this.gotoFinance();
        }
      }
      else if (result && !result.status) {
        if (result.message == "setup-again") {
        }
        else if (result.message == "cancel") {
          this.router.navigate(['home/business/clients-list/']);
        }
      }
    });

  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
