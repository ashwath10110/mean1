import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { takeUntil, tap, take } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { State } from '@app/state/home/home.state';
import { selectClientOnboarding } from '@app/state/client-onboarding/client-onboarding.selectors';

import { isObjectEmpty } from '@app/utils/obj-utils';

import { ActionGetClientAdminAccountsData, ActionGetClientAdminAccountsDataSuccess, ClientOnboardingActionTypes, ActionUpdateClientAdminAccountsData } from '@app/state/client-onboarding/client-onboarding.actions';
import { AddressComponent } from '@app/common/address/address.component';

@Component({
  selector: 'app-client-data',
  templateUrl: './client-data.component.html',
  styleUrls: ['./client-data.component.scss']
})
export class ClientDataComponent implements OnInit {

  tenantInfoFormGroup: FormGroup;
  clientData: any;

  @Output() updates: EventEmitter<any> = new EventEmitter<any>();

  private unsubscribe$: Subject<void> = new Subject<void>();

  sub: any;
  parentRouteId: any;

  address: any;
  contacts: any;
  breadCrumbs = [];
  statusForUpdate = "";
  obj;

  locationId = -1;

  @ViewChild('AddressComponent') AddressComponent: AddressComponent;
  

  constructor(
    public store: Store<State>,
    private _formBuilder: FormBuilder,
    private updates$: Actions,
    private router: Router,
    public dialog: MatDialog,
    private route: ActivatedRoute
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
        'label': 'Address Details'
      }];
    });
    this.address = {
      city: 0,
      state: 0,
      country: 0,
      pincode: null
    };
    this.populateClientAdminData({});
  }

  ngOnInit() {
    this.store
      .pipe(select(selectClientOnboarding), takeUntil(this.unsubscribe$))
      .subscribe((clientData: any) => {
        this.clientData = clientData.clientData;
      });
    this.store.dispatch(
      new ActionGetClientAdminAccountsData({ tenantId: this.parentRouteId })
    );
    this.initEffects();
  }

  initEffects() {
    this.updates$.pipe(
      takeUntil(this.unsubscribe$),
      ofType<ActionGetClientAdminAccountsDataSuccess>(ClientOnboardingActionTypes.GET_CLIENT_ADMIN_ACCOUNTS_DATA_SUCCESS),
      tap(action =>
        this.handleGetAdminAccountDataSuccess(action)
      )
    ).subscribe();
  }

  handleGetAdminAccountDataSuccess(action) {
    const clientAdminData = action.payload.data;
    if (isObjectEmpty(this.clientData)) {
      this.statusForUpdate = "post";
    }
    else {
      this.statusForUpdate = "put";
    }
    this.populateClientAdminData(this.clientData || {});
  }

  handleAddressChanges($event) {
    this.address = $event;
  }

  populateClientAdminData(obj) {
    const businessEmail = obj.businessEmail || "";
    this.address = {
      address1: obj.address1 || "",
      address2: obj.address2 || "",
      pincode: obj.pincode || "",
    };
    this.locationId = obj.locationId || 0;
    const name = obj.name || "";
    const primaryPhone = obj.primaryPhone || '';
    const alternatePhone = obj.alternatePhone || '';
    const emailRegEx = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$';
    const phoneRegEx = '^[0-9]{10}$';
    this.obj = obj;
    this.tenantInfoFormGroup = this._formBuilder.group({
      name: [
        name,
      ],
      businessEmail: [
        businessEmail,
        Validators.compose([Validators.pattern(emailRegEx), Validators.required])
      ],
      primaryPhone: [
        primaryPhone, Validators.compose([Validators.required, Validators.pattern(phoneRegEx)])
      ],
      alternatePhone: [
        alternatePhone, Validators.compose([Validators.pattern(phoneRegEx)])
      ]
    });
  }

  loadDummyValidData() {
    const dummy = {
      "tenantId": "",
      "bankingType": "DOMESTIC",
      "accountType": "SAVINGS",
      "accountName": "Rohith",
      "accountNo": "213213213",
      "bankName": "ICICI",
      "branchName": "Hyderabad",
      "currency": "INR",
      "ifscCode": "SBIN0006091",
      "swiftCode": "",
      "micr": "ICIC2900512",
      "unitId": null
    };
    this.populateClientAdminData(dummy);
  }

  onSubmitClientData(event) {
    this.address = this.AddressComponent.value;
    this.address["locationId"] = this.address.city;
    let value = {
      ...this.obj,
      ...this.address,
      ...event.value,
      tenantId: this.parentRouteId,
      statusForUpdate: this.statusForUpdate
    };
    this.store.dispatch(
      new ActionUpdateClientAdminAccountsData({
        value: value
      })
    );
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
