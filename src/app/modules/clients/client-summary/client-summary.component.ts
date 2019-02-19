import { Component, Inject, OnInit, ViewChild, AfterViewInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Subject, Observable } from 'rxjs';
import { takeUntil, tap, distinctUntilChanged, debounceTime, switchMap, take } from 'rxjs/operators';

import { Actions, ofType } from '@ngrx/effects';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { State } from '@app/state/home/home.state';
import { selectClientOnboarding } from '@app/state/client-onboarding/client-onboarding.selectors';
import { ClientOnboardingActionTypes } from '@app/state/client-onboarding/client-onboarding.actions';
import * as clientOnboardingActions from '@app/state/client-onboarding/client-onboarding.actions';

import { isObjectEmpty } from '@app/utils/obj-utils';

@Component({
  selector: 'app-client-summary',
  templateUrl: './client-summary.component.html',
  styleUrls: ['./client-summary.component.scss']
})
export class ClientSummaryComponent implements OnInit {

  private unsubscribe$: Subject<void> = new Subject<void>();
  clientData: any;

  tenantId = '';

  isContractDone = false;
  isFinanceDone = false;
  isAdminAccountDone = false;
  clientType = "";
  breadCrumbs = [];

  constructor(
    public store: Store<State>,
    private _formBuilder: FormBuilder,
    private updates$: Actions,
    private router: Router,
    public dialog: MatDialog,
    private route: ActivatedRoute
  ) {
    this.route.parent.params.subscribe(params => {
      this.tenantId = params["id"];
    });
    // this.updates$.pipe(
    //   ofType<clientOnboardingActions.ActionGetClientOnboardingDataSuccess>(ClientOnboardingActionTypes.GET_CLIENT_ON_BOARDING_DATA_SUCCESS),
    //   tap(action =>
    //     this.onboardingDataSuccessHandler(action)
    //   )
    // ).subscribe();
  }

  ngOnInit() {
    this.breadCrumbs = [{
      'label': 'Clients',
      'url': '#/home/business/clients-list'
    }, {
      'label': 'Client Details'
    }];

    this.store
      .pipe(select(selectClientOnboarding), takeUntil(this.unsubscribe$))
      .subscribe((clientData: any) => {
        this.clientData = clientData;
      });

    this.route.parent.params
      .pipe(take(1))
      .subscribe((params) => {
        const id = params['id'];
        this.tenantId = id;
        // this.store.dispatch(
        //   new clientOnboardingActions.ActionGetClientOnboardingData({
        //     mode: 'edit',
        //     tenantId: id
        //   })
        // );
      });
  }

  onboardingDataSuccessHandler(action) {
    const finance = action.payload.data[0];
    const contract = action.payload.data[1].data;
    const clientData = action.payload.data[2];
    // const clientType = action.payload.data[4].data.tenantType;
    this.isContractDone = isObjectEmpty(contract) ? false : true;
    this.isFinanceDone = isObjectEmpty(finance) ? false : true;
    this.isAdminAccountDone = isObjectEmpty(clientData) ? false : true;
    this.clientType = "";

    // this.router.navigate(['home/business/clients/'+ this.tenantId]);
    // if (isObjectEmpty(contract)) {
    //   this.message = "Redirecting to Contract Page.";
    //   setTimeout(() => {
    //     this.message = "";
    //     // this.router.navigate(['home/tenants/tenant/' + this.tenantId + '/contract']);
    //     // this.router.navigate(['home/business/clients'+ this.tenantId]);
    //     this.router.navigate(['home/business/client-onboarding/' + this.tenantId + '/contract']);
    //   }, redirectTime);
    // }
    // else if (isObjectEmpty(clientData)) {
    //   this.message = "Redirecting to Admin Account Setup Page.";
    //   setTimeout(() => {
    //     this.message = "";
    //     this.router.navigate(['home/business/client-onboarding/' + this.tenantId + '/account-setup']);
    //   }, redirectTime);
    // }
    // else {
    //   this.message = "Successfully done till contract and admin setup !!!";
    //   setTimeout(() => {
    //     this.message = "";
    //     this.router.navigate(['home/business/client-onboarding/' + this.tenantId + '/onboarding-success']);
    //   }, redirectTime);
    // }
  }

  gotoContract() {
    this.router.navigate(['home/business/client-view/' + this.tenantId + '/contract']);
  }

  gotoAddressAccount() {
    this.router.navigate(['home/business/client-view/' + this.tenantId + '/account-setup']);
  }

  gotoAdminAccount() {
    this.router.navigate(['home/business/client-view/' + this.tenantId + '/admin-setup']);
  }


  gotoFinance() {
    this.router.navigate(['home/business/client-view/' + this.tenantId + '/finance']);
  }

  gotoContactDetails() {
    this.router.navigate(['home/business/client-view/' + this.tenantId + '/contacts']);
  }

  gotoOrgTree() {
    this.router.navigate(['home/business/hospital-info/' + this.tenantId]);
  }

  gotoClientDetails(){
     this.router.navigate(['home/business/client-view/' + this.tenantId + '/client-detail']);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
