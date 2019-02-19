import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Subject, Observable } from 'rxjs';
import { takeUntil, tap, take } from 'rxjs/operators';
import { Actions, ofType } from '@ngrx/effects';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';

import { State } from '@app/state/home/home.state';
import { selectClientOnboarding } from '@app/state/client-onboarding/client-onboarding.selectors';

import * as clientOnboardingActions from '@app/state/client-onboarding/client-onboarding.actions';
import { isObjectEmpty } from '@app/utils/obj-utils';


@Component({
  selector: 'app-client-admin-setup',
  templateUrl: './client-admin-setup.component.html',
  styleUrls: ['./client-admin-setup.component.scss']
})
export class ClientAdminSetupomponent implements OnInit {

  AdminUserFormGroup: FormGroup;
  clientData: any;

  @Output() updates: EventEmitter<any> = new EventEmitter<any>();

  private unsubscribe$: Subject<void> = new Subject<void>();

  sub: any;
  tenantId: any;

  address: any;
  contacts: any;
  breadCrumbs = [];
  statusForUpdate = "";

  constructor(
    public store: Store<State>,
    private _formBuilder: FormBuilder,
    private updates$: Actions,
    private router: Router,
    public dialog: MatDialog,
    private route: ActivatedRoute
  ) {

    this.sub = this.route.parent.params.subscribe(params => {
      this.tenantId = params["id"];
    });

    this.breadCrumbs = [{
      'label': 'Clients',
      'url': '#/home/business/clients-list'
    }, {
      'label': 'Client Details',
      'url': '#/home/business/client-view/' + this.tenantId + '/summary'
    }, {
      'label': 'Admin Details'
    }];

    this.initFormGroup({});
  }

  ngOnInit() {
    this.store
      .pipe(select(selectClientOnboarding), takeUntil(this.unsubscribe$))
      .subscribe((clientData: any) => {
        this.clientData = clientData.clientData;
      });
    this.store.dispatch(
      new clientOnboardingActions.ActionGetAdminUser({ tenantId: this.tenantId })
    );
    this.initEffects();
  }

  initEffects() {
    this.updates$.pipe(
      take(1),
      ofType<clientOnboardingActions.ActionGetAdminUserSuccess>(clientOnboardingActions.ClientOnboardingActionTypes.GET_ADMIN_USER_SUCCESS),
      tap(action =>
        this.handleGetAdminUsersAccountDataSuccess(action)
      )
    ).subscribe();
  }

  handleGetAdminUsersAccountDataSuccess(action) {
    const clientAdminData = action.payload.data;
    if (isObjectEmpty(clientAdminData)) {
      this.statusForUpdate = "post";
    }
    else {
      this.statusForUpdate = "put";
    }
    this.initFormGroup(clientAdminData || {});
  }

  initFormGroup(obj) {
    const firstName = obj.firstName || '';
    const middleName = obj.middleName || '';
    const lastName = obj.lastName || '';
    const username = obj.username || '';
    const email = obj.email || '';
    const designation = obj.designation || '';
    const reportsTo = obj.reportsTo || '';
    const primaryPhone = obj.primaryPhone || '';
    const alternatePhone = obj.alternatePhone || '';
    const emailRegEx = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$';
    const status = obj.status || '';
    const phoneRegEx = '^[0-9]{10}$';

    this.AdminUserFormGroup = this._formBuilder.group({
      firstName: [
        firstName,
        Validators.compose([Validators.required])
      ],
      lastName: [
        lastName, Validators.compose([Validators.required])
      ]
      , middleName: [
        middleName
      ]
      , username: [
        username
      ]
      , reportsTo: [
        reportsTo,
        Validators.compose([Validators.required])
      ]
      , status: [
        status
      ]
      , designation: [
        designation,
        Validators.compose([Validators.required])
      ],
      email: [
        email,
        Validators.compose([Validators.pattern(emailRegEx), Validators.required])
      ]
      ,
      primaryPhone: [
        primaryPhone, Validators.compose([Validators.required, Validators.pattern(phoneRegEx)])
      ]
      , alternatePhone: [
        alternatePhone, Validators.compose([Validators.pattern(phoneRegEx)])
      ]
    });

  }

  onSubmitClientUser(formValue: any) {
    const adminUser = {
      ...formValue.value,
      emailSignature: "",
      // status: "ACTIVE",
      roles: [
        "ADMINISTRATOR"
      ],
      tenantType: "CLIENT",
      tenantId: this.tenantId,
      statusForUpdate: this.statusForUpdate
    };

    this.store.dispatch(
      new clientOnboardingActions.ActionCreateAdminUser({ value: adminUser })
    );
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
