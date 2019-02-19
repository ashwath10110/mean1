import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { takeUntil, tap } from 'rxjs/operators';
import { Subject, forkJoin } from 'rxjs';
import { State, selectHomeState } from '@app/state/home/home.state';
import { isObjectEmpty } from '@app/utils/obj-utils';
import { isApprover, createApprovalComments} from '@app/utils/partner-utils';
import { selectPartners } from '@app/state/partners/partners.selectors';
import { selectAuthState } from '@app/core';
import { ActionGetPartnerAddress, PartnersActionTypes, ActionGetPartnerAddressSuccess, ActionUpdatePartnerAddress, ActionApprovePartnerAddressSuccess, ActionApprovePartnerAddress } from '@app/state/partners/partners.actions';
import { selectClients } from '@app/state/clients/clients.selectors';
import { AddressComponent } from '@app/common/address/address.component';
import { selectApprovals } from '@app/state/approvals/approvals.selectors';
import { ActionRejectApprovals, ActionRejectApprovalsSuccess, ApprovalsActionTypes } from '@app/state/approvals/approvals.actions';
import { LocationsService } from '@app/state/locations/locations.service';

@Component({
  selector: 'partner-unit-address',
  templateUrl: './partner-address.component.html',
  styleUrls: ['./partner-address.component.scss']
})

export class PartnerAddressComponent implements OnInit {

  partnerAddressFormGroup: FormGroup;
  addressData: any;
  sub: any;
  parentRouteId: any;

  address: any = {
    address1: '',
    address2: '',
    state: '',
    city: '',
    country: '',
    pincode: null
  };
  unitId: any;
  tenantId: any;
  partnerId: any;

  routeName: any;
  breadCrumbs = [];
  statusForUpdate = "";
  obj;
  stocks: any;

  locationId = "";
  approvalState:any ={};

  loading: boolean = false;
  partnerAddressData: any;
  state: any;
  showApproveButton: boolean = false
  isApproverRole: any;
  approvedData:any;
  approvalComments: any ={};
  selectedApproval:any;
  @ViewChild('AddressComponent') AddressComponent: AddressComponent;

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    public store: Store<State>,
    private _formBuilder: FormBuilder,
    private updates$: Actions,
    private router: Router,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    public _locationService: LocationsService
  ) {

    this.sub = this.route.parent.params.subscribe(params => {
      this.partnerId = params["partnerId"];
      this.unitId = params["unitId"];
    });

    this.sub = this.route.parent.parent.params.subscribe(params => {
      this.tenantId = params["id"];
    });

    this.route.parent.url.subscribe(url => {
      this.routeName = url[0].path;
    });
    if (this.unitId && this.routeName == 'unit-approve') {
      this.breadCrumbs = [];
    } else if (this.unitId) {
      this.breadCrumbs = [{
        'label': 'Org Chart',
        'url': `#/home/business/hospital-info/${this.tenantId}`
      }, {
        'label': 'Partners',
        'url': `#/home/business/unit-view/${this.tenantId}/unit-partners/${this.unitId}`
      }, {
        'label': 'Partner Details',
        'url': `#/home/business/unit-view/${this.tenantId}/unit-partners/${this.unitId}/partner-view/${this.partnerId}/partner-summary`
      }, {
        'label': 'Partner Address Details'
      }];
    } else {

      this.breadCrumbs = [{

        'label': 'Partners',
        'url': '#/home/business/partners'
      }, {
        'label': 'Partner Details',
        'url': '#/home/business/partner-view/' + this.partnerId + '/partner-summary'
      }, {
        'label': 'Partner Address Details'
      }];
    }
  }
  ngOnInit() {

    let isApproverRole = false;
    if (this.unitId) {
      isApproverRole = isApprover(this.route);
    }

    this.getAllStates();



    this.getFormObj();

    if (isApproverRole) {
      this.updates$.pipe(
        // TODO CHECK THE ACTIONS
        ofType<ActionApprovePartnerAddressSuccess>(PartnersActionTypes.APPROVE_PARTNER_ADDRESS_SUCCESS),
        tap(action =>
          this.handleApprovePartnerAddressSuccess(action)
        )
      ).subscribe();

      this.store.dispatch(
        new ActionGetPartnerAddress({
          id: this.partnerId,
          tenantId: this.tenantId
        })
      );

      // let obj = this.state.currentApproval.data;
      // obj = JSON.parse(obj);

      this.showApproveButton = true;
      // this.populatePartnerAddressDetails(obj || {});

    } else {
      this.store.dispatch(
        new ActionGetPartnerAddress({
          id: this.partnerId,
          tenantId: this.tenantId
        })
      );
      this.getFormObj();
     
    }
    this.initEffects();
  }


  getAllStates() {
    this.store.pipe(select(selectPartners), takeUntil(this.unsubscribe$))
      .subscribe((partnerState: any) => {
        console.log(partnerState);
        this.loading = partnerState.loading;
        this.partnerAddressData = partnerState.partnerAddressData;
      });

    this.store.pipe(select(selectAuthState), takeUntil(this.unsubscribe$))
      .subscribe((tenantState: any) => {
        console.log(tenantState);
        if (!this.tenantId) {
          this.tenantId = tenantState.user.data.tenantId;
        }
      });

    this.store
      .pipe(select(selectHomeState), takeUntil(this.unsubscribe$))
      .subscribe((stocks: any) => {
        this.stocks = stocks.client;
      });

    this.store
      .pipe(select(selectClients), takeUntil(this.unsubscribe$))
      .subscribe((state: any) => {
        this.state = state;
      });

    
      this.store
      .pipe(select(selectApprovals), takeUntil(this.unsubscribe$))
      .subscribe((state: any) => {
        console.log('approvalState', state);
        this.approvalState = state;
      });
  }

  initEffects() {
    this.updates$.pipe(
      takeUntil(this.unsubscribe$),
      ofType<ActionRejectApprovalsSuccess>(ApprovalsActionTypes.REJECT_APPROVAL_SUCCESS),
      tap(action =>
        this.rejectApprovalsSuccessHandler(action)
      )
    ).subscribe();
    
    this.updates$.pipe(
      ofType<ActionGetPartnerAddressSuccess>(PartnersActionTypes.GET_PARTNER_ADDRESS_SUCCESS),
      tap(action =>{
        return isApprover(this.route)? this.handleGetPartnerAddressApproveSuccess(action): this.handleGetAddressDataSuccess(action)
      }
       
      )
    ).subscribe();
  }

  handleApprovePartnerAddressSuccess(action) {
    this.router.navigate(['/home/business/approvals/list']);

  }
  handleGetAddressDataSuccess(action) {

    const addressData = action.payload[0].data;
    this.partnerAddressData = addressData;

    if (isObjectEmpty(addressData) || !addressData.address1) {
      this.statusForUpdate = "post";
    }
    else {
      this.statusForUpdate = "put";
    }

    this.populatePartnerAddressDetails(addressData || {});
  }

  populatePartnerAddressDetails(obj) {
    this.address = {
      address1: obj.address1 || "",
      address2: obj.address2 || "",
      state: obj && obj.state || "",
      country: obj && obj.country || "",
      city: obj && obj.city || "",
      pincode: obj.pincode || "",
    };
    this.locationId = obj.locationId;

    const email = obj.email || "";
    const website = obj.website || "";

    const primaryPhone = obj.primaryPhone || "";

    this.partnerAddressFormGroup.patchValue({
      email: email,
      website: website,
      primaryPhone: primaryPhone,
    })
  }

  rejectApprovalsSuccessHandler(action){
    this.router.navigate(['/home/business/approvals/list']);
  }

  handleAddressChanges($event) {
    this.address = $event;
    console.log(this.address);
  }

  onSubmitAddressData(form) {
    this.address = this.AddressComponent.value;
    if (this.showApproveButton) {
      let obj = this.approvalState.currentApproval.data;
      obj = JSON.parse(obj);
      console.log(this.approvalState.currentApproval);
      let approvalId = this.approvalState.currentApproval.id;
      const value = {
        ...this.obj,
        ...form.value,
        ...this.address,
        statusForUpdate: 'put',
        approvalId,
        id: this.partnerId,
        locationId: this.address.city
      }
      this.store.dispatch(
        new ActionApprovePartnerAddress({
          value: value,
          tenantId: this.tenantId
        })
      );
    } else {
      const value = {
        ...this.partnerAddressData,
        ...form.value,
        ...this.address,
        id: this.partnerId,
        locationId: this.address.city,
        unitId: this.unitId
      }
      this.store.dispatch(
        new ActionUpdatePartnerAddress({
          value: value,
          tenantId: this.tenantId,
          statusForUpdate: this.statusForUpdate
        })
      );
    }
  }

  getFormObj() {
     const emailRegEx = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$';
     // const emailRegEx = '^.+@[^\.].*\.[a-z]{2,4}$';
    // const emailRegEx ='^[a-zA-Z0-9_-.]+@[a-zA-Z0-9_-.]+\\.[a-zA-Z]{2,4}';
    const phoneRegEx = '^[0-9]{10}$';
    this.partnerAddressFormGroup = this._formBuilder.group({
      email: ['', [Validators.pattern(emailRegEx), Validators.required]],
      primaryPhone: ['', [Validators.required, Validators.pattern(phoneRegEx)]],
      website: ['', Validators.pattern('^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$')],
    });
  }

  rejectApproval(form){
    if (this.showApproveButton) {
      let rejChange = this.approvalState.currentApproval; 
      this.store.dispatch(new ActionRejectApprovals({
        ...rejChange
      }));
    }
  }
  
  handleGetPartnerAddressApproveSuccess(action){
    const approvals = action.payload[0].data.approvals;
    const currentApproval = this.approvalState.currentApproval;
    this.approvedData = action.payload[0].data;
    let existingData = this.approvedData;

    let obj =approvals && approvals.filter(appr => {
      return (appr.approvalId == currentApproval.id);
    })[0];
  
    if(!obj){
      obj = action.payload[0].data;
    }

    this.selectedApproval = obj;
    this.populatePartnerAddressDetails(obj);
    let formCtrls = { ...this.partnerAddressFormGroup.value, ...this.AddressComponent.value };
    let approvalComments = this.approvalComments;
    this.approvalComments = createApprovalComments(formCtrls, currentApproval, existingData, obj);
    if (existingData["locationId"] != obj["locationId"]) {
      let existingLocationData$ = this._locationService.getCountryIdStateIdByCityId({cityId:existingData["locationId"]});
      let newLocationData$ = this._locationService.getCountryIdStateIdByCityId({cityId:obj["locationId"]});
      forkJoin([existingLocationData$,newLocationData$]).subscribe(data => {
        this.approvalComments["City"] = data[0]["data"]["cityName"] + " -> " + data[1]["data"]["cityName"];
        this.approvalComments["State"] = data[0]["data"]["stateName"] + " -> " + data[1]["data"]["stateName"];
        this.approvalComments["Country"] = data[0]["data"]["countryName"] + " -> " + data[1]["data"]["countryName"];
      });
    }
    console.log(this.approvalComments);

  }

}