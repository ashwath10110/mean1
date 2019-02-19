import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Subject, Observable } from 'rxjs';
import { takeUntil, tap, take } from 'rxjs/operators';
import { Actions, ofType } from '@ngrx/effects';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';

import { State } from '@app/state/home/home.state';
import { selectClientOnboarding } from '@app/state/client-onboarding/client-onboarding.selectors';import * as clientOnboardingActions from '@app/state/client-onboarding/client-onboarding.actions';
import { isObjectEmpty } from '@app/utils/obj-utils';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.scss']
})
export class ClientDetailComponent implements OnInit {

  tenantInfoFormGroup: FormGroup;
 

  @Output() updates: EventEmitter<any> = new EventEmitter<any>();

  private unsubscribe$: Subject<void> = new Subject<void>();

  sub: any;
  tenantId: any;
  clientData = [];
  clientsData:any;
  address: any;
  contacts: any;
  breadCrumbs = [];
  statusForUpdate = "";
  clientAdminData:any;
  routeName:any;
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

    this.route.parent.url.subscribe(url => {
      this.routeName = url[0].path;
    });

    if(this.routeName == 'unit-approve'){
      this.breadCrumbs = [];
    }else{
      this.breadCrumbs = [{
      'label': 'Clients',
      'url': '#/home/business/clients-list'
      }, {
        'label': 'Client Details',
        'url': '#/home/business/client-view/' + this.tenantId + '/summary'
      }, {
      'label': 'Client Details'
      }];
    } 
    this.initFormGroup({});
  }

  ngOnInit() {
    this.store
    .pipe(select(selectClientOnboarding), takeUntil(this.unsubscribe$))
    .subscribe((clientData: any) => {
      this.clientData = clientData.clientData;
    });
  this.store.dispatch(
    new clientOnboardingActions.ActionGetClientDetails({ tenantId: this.tenantId })
  );
    this.initEffects();
  }


  initEffects() {
    this.updates$.pipe(
      take(1),
      ofType<clientOnboardingActions.ActionGetClientDetailsSuccess>(clientOnboardingActions.ClientOnboardingActionTypes.GET_CLIENT_DETAILS_SUCCESS),
      tap(action =>
        this.handleGetAdminUsersAccountDataSuccess(action)
      )
    ).subscribe();
  }

  handleGetAdminUsersAccountDataSuccess(action) {
    this.clientAdminData = action.payload.data;
    if (isObjectEmpty(this.clientAdminData)) {
      this.statusForUpdate = "post";
    }
    else {
      this.statusForUpdate = "put";
    }
    this.initFormGroup(this.clientAdminData || {});
  }
 
  initFormGroup(obj) {
    const name = obj.name || '';
    const type =obj.type || '';
    const cin = obj.cin || '';
    const gstin = obj.gstin || '';
    const pan = obj.pan || '';
    this.tenantInfoFormGroup = this._formBuilder.group({
      name: [
        name,
        Validators.compose([
          Validators.pattern("^[a-zA-Z0-9 ,']+$")
        ])
      ],
      type: [
        type,
      ],
      cin: [
        cin,
        Validators.compose([
          Validators.pattern('^([L|U]{1})([0-9]{5})([A-Za-z]{2})([0-9]{4})([A-Za-z]{3})([0-9]{6})$')
        ])
      ],
      gstin: [
        gstin,
        Validators.compose([
          Validators.pattern('^([0][1-9]|[1-2][0-9]|[3][0-5])([a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}[zZ]{1}[0-9a-zA-Z]{1})+$')
        ])
      ],
      pan: [
        pan,
        Validators.compose([Validators.pattern('^([A-Za-z]{5})([0-9]{4})([A-Za-z]{1})$')])
      ],
    });
  }

  onSubmitTenantInfo(formValue: any) {
    const client = {
     ...formValue.value,
     "id":this.clientAdminData.id,
      "tenantId": this.tenantId,
      "statusForUpdate": this.statusForUpdate
    };

    this.store.dispatch(
       new clientOnboardingActions.ActionUpdateClientData({ value: client })
     );
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
