import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';
import { takeUntil, tap, take } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { State } from '@app/state/home/home.state';
import { selectClientOnboarding } from '@app/state/client-onboarding/client-onboarding.selectors';
import * as clientOnboardingActions from '@app/state/client-onboarding/client-onboarding.actions';

import { isObjectEmpty } from '@app/utils/obj-utils';
import { ClientTermsComponent } from '../client-terms/client-terms.component';
import { contractTypes } from 'api-config';

@Component({
  selector: 'anms-client-contract',
  templateUrl: './client-contract.component.html',
  styleUrls: ['./client-contract.component.scss'],
  entryComponents: [ClientTermsComponent]
})
export class ClientContractComponent implements OnInit {

  clientContractFormGroup: FormGroup;
  clientContract: any;
  sub: any;
  parentRouteId: any;
  statusForUpdate = "";
  agree = false;
  attachments = [];
  breadCrumbs = [];

  attachmentIds = [];
  maxSizeInKb = 2048;

  uploadStatus = false;

  fileTypes = contractTypes;

  @Output() updates: EventEmitter<any> = new EventEmitter<any>();

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    public store: Store<State>,
    private _formBuilder: FormBuilder,
    private updates$: Actions,
    private router: Router,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private snackbar: MatSnackBar,
  ) {
    this.sub = this.route.parent.params.subscribe(params => {
      this.parentRouteId = params["id"];
    });
    this.breadCrumbs = [{
      'label': 'Clients',
      'url': '#/home/business/clients-list'
    }, {
      'label': 'Client Details',
      'url': '#/home/business/client-view/' + this.parentRouteId + '/summary'
    }, {
      'label': 'Contract Details'
    }];

    this.initEffects();
    this.populateClientContractInfo({});
  }

  ngOnInit() {
    this.store
      .pipe(select(selectClientOnboarding), takeUntil(this.unsubscribe$))
      .subscribe((state: any) => {
      });
    this.store.dispatch(
      new clientOnboardingActions.ActionGetClientContractData({ tenantId: this.parentRouteId })
    );
  }

  initEffects() {
    this.updates$.pipe(
      takeUntil(this.unsubscribe$),
      // take(1),
      ofType<clientOnboardingActions.ActionGetClientContractDataSuccess>(clientOnboardingActions.ClientOnboardingActionTypes.GET_CLIENT_CONTRACT_DATA_SUCCESS),
      tap(action =>
        this.handleGetContractDataSuccess(action)
      )
    ).subscribe();
  }

  handleGetContractDataSuccess(action) {
    const clientContract = action.payload.data;
    if (isObjectEmpty(clientContract)) {
      this.statusForUpdate = "post";
    }
    else {
      this.statusForUpdate = "put";
    }
    this.populateClientContractInfo(clientContract || {});
  }

  loadDummyValidData() {
    const dummy = {
      "id": "",
      "tenantId": "",
      "contractType": "MULTIPLE",
      "contractStatus": "ACTIVE",
      "cin": "L17110MH1973PLC019786",
      "licenseNumber": "29ABCDE1234F2Z5",
      "gstin": "29ABCDE1234F2Z5",
      "pan": "ABCDE1234F",
      "creditPeriodStart": 1543602600000,
      "creditPeriodEnd": 1546194600000,
      "signedOn": 1544639400000,
      "signedBy": "Rohith",
      "numberOfLeads": 100,
      "leadCountThreshold": 10,
      "mga": 100,
      "mgaPeriod": "MONTHLY",
      "invoiceFrequency": "MONTHLY",
      "invoiceDay": 10
    };
    this.populateClientContractInfo(dummy);
  }

  populateClientContractInfo(obj) {
    let attachments = obj.attachments || "";
    let creditPeriodStart = obj.creditPeriodStart ? new Date(obj.creditPeriodStart) : "";
    let creditPeriodEnd = obj.creditPeriodStart ? new Date(obj.creditPeriodEnd) : "";
    let mgaPeriod = obj.mgaPeriod || "";
    let signedBy = obj.signedBy || "";
    let signedOn = obj.signedOn ? new Date(obj.signedOn) : "";
    let mga = obj.mga || "";
    let numberOfLeads = obj.numberOfLeads || "";
    let leadCountThreshold = obj.leadCountThreshold || "";
    let invoiceDay = obj.invoiceDay || "";
    let invoiceFrequency = obj.invoiceFrequency || "";
    let extraLeadMga = obj.extraLeadMga || "";
    let agree = obj.agree || false;
    let id = obj.id;
    const numPattern = '[0-9]+';
    //const datePattern = "^[0-9]{1,2}(/|-)[0-9]{1,2}(/|-)[0-9]{4}$";

    this.clientContractFormGroup = this._formBuilder.group({
      signedBy: [
        signedBy,
      ],
      signedOn: [
        signedOn,
        //Validators.pattern(datePattern)
      ],
      attachments: [
        attachments,
      ],
      mgaPeriod: [
        mgaPeriod,
      ],
      creditPeriodStart: [
        creditPeriodStart,
        //Validators.pattern(datePattern)
      ],
      creditPeriodEnd: [
        creditPeriodEnd,
        //Validators.pattern(datePattern)
      ],
      mga: [
        mga, Validators.pattern(numPattern)
      ],
      extraLeadMga: [
        extraLeadMga, Validators.pattern(numPattern)
      ],
      numberOfLeads: [
        numberOfLeads, Validators.pattern(numPattern)
      ],
      invoiceFrequency: [
        invoiceFrequency,
      ],
      invoiceDay: [
        invoiceDay, Validators.pattern(numPattern)
      ],
      leadCountThreshold: [
        leadCountThreshold, Validators.pattern(numPattern)
      ],
      agree: [
        agree
      ],
      id: [
        id
      ]
    }, {
        validator: this.dateLessThan('creditPeriodStart', 'creditPeriodEnd')
      });
    this.initMgaLogic();
    this.attachmentIds = obj.attachmentIds;
  }

  initMgaLogic() {
    const extraLeadMga = this.clientContractFormGroup.get('extraLeadMga');
    const numberOfLeads = this.clientContractFormGroup.get('numberOfLeads');
    const mga = this.clientContractFormGroup.get('mga');
    //Listening changes for extraLeadMga
    extraLeadMga.valueChanges.subscribe(val => {
      let numberOfLeads = this.clientContractFormGroup.get('numberOfLeads');
      mga.setValue(val * (numberOfLeads.value));
    });

    //Listening changes for numOfleads
    numberOfLeads.valueChanges.subscribe(val => {
      let extraLeadMga = this.clientContractFormGroup.get('extraLeadMga');
      mga.setValue(val * (extraLeadMga.value));
    });
  }

  private dateLessThan(from: string, to: string) {
    return (group: FormGroup): { [key: string]: any } => {
      let f = group.controls[from];
      let t = group.controls[to];
      if ((f.value && f.value !== "") && (t.value && t.value !== "") && (f.value > t.value)) {
        //group.controls.creditPeriodEnd.errors = [];
        group.controls.creditPeriodEnd.setErrors({
          dates: "Contract Start Date should be less than Contract End Date"
        });
        //  return group.controls.creditPeriodEnd.errors = {
        //    dates: "Contract Start Date should be less than Contract End Date"
        //  };
      }
      else {
        group.controls.creditPeriodEnd.setErrors(null);
      }
      return {};
    }
  }
  onClickTerms(event: Event) {
    event.preventDefault();
    this.dialog.open(ClientTermsComponent, {
      width: '90%'
    }).afterClosed()
      .subscribe((response) => {
        this.clientContractFormGroup.controls["agree"].setValue(true);
      });
  }

  onSubmitClientContract(event) {
    if (this.clientContractFormGroup.controls["agree"].value) {
      const value = {
        ...event.value,
        tenantId: this.parentRouteId,
        "contractStatus": "ACTIVE",
        attachmentIds: this.attachmentIds,
        statusForUpdate: this.statusForUpdate
      };
      this.store.dispatch(
        new clientOnboardingActions.ActionUpdateClientContractData({
          value: value
        })
      );
    }
    // else {
    //   this.snackbar.open("You cannot proceed unless you agree to the terms and conditions", "Okay", {
    //     duration: 0
    //   });
    // }
  }

  handleFileUpload(evt) {
    if (evt.status === "UPLOAD_SUCCESSFULL") {
      this.attachmentIds = evt.attachmentIds;
      this.uploadStatus = true;
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
