import { Component, OnInit, ViewChild } from '@angular/core';
import { selectClientOnboarding } from '@app/state/client-onboarding/client-onboarding.selectors';
import { ActivatedRoute } from '@angular/router';
import { takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { State } from '@app/state/home/home.state';
import { Store, select } from '@ngrx/store';
import { ActionUpdateClientFinanceData, ActionGetClientFinanceData, ClientOnBoardingActions, ClientOnboardingActionTypes, ActionGetClientFinanceDataSuccess } from '@app/state/client-onboarding/client-onboarding.actions';
import { FinanceComponent } from '@app/common/finance/finance.component';
import { Actions, ofType } from '@ngrx/effects';
import { isObjectEmpty } from '@app/utils/obj-utils';

@Component({
  selector: 'app-client-finance',
  templateUrl: './client-finance.component.html',
  styleUrls: ['./client-finance.component.scss']
})
export class ClientFinanceComponent implements OnInit {

  @ViewChild("clientFinance") clientFinance: FinanceComponent;

  clientContract: any;
  sub: any;
  parentRouteId: any;

  agree = false;
  attachments = [];
  breadCrumbs = [];
  financeData = {};

  statusForUpdate = "";

  isFinanceFormValid = false;

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    public store: Store<State>,
    private route: ActivatedRoute,
    private updates$: Actions,
  ) {
    this.sub = this.route.parent.params.subscribe(params => {
      this.parentRouteId = params["id"];
      this.breadCrumbs = [{
        'label': 'Clients',
        'url': '#/home/business/clients-list'
      }, {
        'label': 'Client Details',
        'url': '#/home/business/client-view/' + this.parentRouteId + '/summary'
      }, {
        'label': 'Finance Details'
      }];
    });
  }

  ngOnInit() {
    this.store
      .pipe(select(selectClientOnboarding), takeUntil(this.unsubscribe$))
      .subscribe((clientContract: any) => {
        this.clientContract = clientContract.finance;
      });
    this.store.dispatch(
      new ActionGetClientFinanceData({
        value: this.parentRouteId
      })
    );
    this.initEffects();
  }

  initEffects() {
    this.updates$.pipe(
      ofType<ActionGetClientFinanceDataSuccess>(ClientOnboardingActionTypes.GET_CLIENT_FINANCE_DATA_SUCCESS),
      tap(action =>
        this.handleGetFinanceDataSuccess(action)
      )
    ).subscribe();
  }

  handleGetFinanceDataSuccess(action) {
    const clientFinance = action.payload.data;
    this.financeData = clientFinance;
    if (isObjectEmpty(clientFinance)) {
      this.statusForUpdate = "post";
    }
    else {
      this.isFinanceFormValid = true;
      this.statusForUpdate = "put";
    }
  }

  // loadDummyValidData() {
  //   const dummy = {
  //     "id": "",
  //     "tenantId": "",
  //     "bankingType": "DOMESTIC",
  //     "accountType": "SAVINGS",
  //     "accountName": "Rohith",
  //     "accountNo": "213213213",
  //     "bankName": "ICICi",
  //     "branchName": "Hyderabad",
  //     "currency": "INR",
  //     "ifscCode": "",
  //     "swiftCode": "",
  //     "micr": "ICIC2900512",
  //     "unitId": null
  //   };
  //   this.financeData = dummy;
  // }

  handleFormStatusChanges(event){
    if(event === 'INVALID'){
      this.isFinanceFormValid = false;
    }
    else if(event === 'VALID'){
      this.isFinanceFormValid = true;
    }
  }

  updateFinance() {
    const financeValue = this.clientFinance.value;
    const value = {
      ...this.financeData,
      ...financeValue,
      tenantId: this.parentRouteId,
      statusForUpdate: this.statusForUpdate
    };
    this.store.dispatch(
      new ActionUpdateClientFinanceData({
        value: value
      })
    );
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
