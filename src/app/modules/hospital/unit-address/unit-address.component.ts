import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { takeUntil, tap } from 'rxjs/operators';
import { Subject, forkJoin } from 'rxjs';
import { State } from '@app/state/home/home.state';

import { isObjectEmpty } from '@app/utils/obj-utils';

import { ActionGetUnitAddressDetails, DetailsActionTypes, ActionGetUnitAddressDetailsSuccess, ActionProceedToFinance, ActionUpdateUnitAddressDetails, ActionUpdateUnitAddressDetailsSuccess, ActionApproveUnitAddressSuccess, ActionApproveUnitAddress } from '@app/state/details/details.actions';
import { selectDetails } from '@app/state/details/details.selectors';
import { MessageModalComponent } from '@app/common/message-modal/message-modal.component';
import { AddressComponent } from '@app/common/address/address.component';
import { selectApprovals } from '@app/state/approvals/approvals.selectors';
import { ActionRejectApprovals, ActionRejectApprovalsSuccess, ApprovalsActionTypes } from '@app/state/approvals/approvals.actions';
import { ActionGetCountryIdStateIdByCityId, ActionGetCountryIdStateIdByCityIdSuccess, LocationsActionTypes, ActionGetStateByCountryId, ActionGetCityByStateId } from '@app/state/locations/locations.actions';
import { LocationsService } from '@app/state/locations/locations.service';


@Component({
  selector: 'app-unit-address',
  templateUrl: './unit-address.component.html',
  styleUrls: ['./unit-address.component.scss']
})
export class UnitAddressComponent implements OnInit {

 // unitDetailsFormGroup: FormGroup;
  unitData: any;

  private unsubscribe$: Subject<void> = new Subject<void>();

  sub: any;
  parentRouteId: any;
  routeName = "";
  address: any;
  contacts: any;
  state: any;
  unitId: any;
  tenantId: any;
  showApproveButton = false;
  breadCrumbs = [];
  statusForUpdate = "";
  approvalComments = [];
  approvedData: any;
  selectedApproval:any;
  obj;
  unitAddressData: any;
  unitAddressFormGroup: FormGroup;
  locationId = "";

  @ViewChild('AddressComponent') AddressComponent: AddressComponent;

  constructor(
    public store: Store<State>,
    private _formBuilder: FormBuilder,
    private updates$: Actions,
    private router: Router,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    public _locationService: LocationsService
  ) { }

initRouteIdBreadCrumb() {
    this.sub = this.route.params.subscribe(params => {
      this.unitId = params["unitId"];
    });
    this.sub = this.route.parent.params.subscribe(params => {
      this.tenantId = params["id"];
    });
    this.breadCrumbs = [{
      'label': 'Org Chart',
      'url': '#/home/business/hospital-info/' + this.tenantId
    },
    {
      'label': 'Unit Details',
      'url': '#/home/business/unit-view/' + this.tenantId + '/unit-summary/' + this.unitId
    }, {
      'label': 'Address Details'
    }];
    this.route.parent.url.subscribe(url => {
      this.routeName = url[0].path;
    });
    this.populateClientUnitDetails({});
  }

  ngOnInit() {
    this.initRouteIdBreadCrumb();
    this.store
      .pipe(select(selectDetails), takeUntil(this.unsubscribe$))
      .subscribe((unitData: any) => {
        this.unitData = unitData;
      });
    this.store
      .pipe(select(selectApprovals), takeUntil(this.unsubscribe$))
      .subscribe((state: any) => {
        this.state = state;
      });
  }

  ngAfterViewInit() {
    this.store.dispatch(
      new ActionGetUnitAddressDetails({
        unitId: this.unitId,
        tenantId: this.tenantId
      })
    );
    if (this.routeName === 'unit-approve') {
      this.handleApprovalRoute();
    }
    else {
      this.handleNonApprovalRoute();
    }
  }

  handleNonApprovalRoute() {

    this.store.dispatch(
      new ActionGetUnitAddressDetails({
        unitId: this.unitId,
        tenantId: this.tenantId
      })
    );

    this.updates$.pipe(
      takeUntil(this.unsubscribe$),
      ofType<ActionGetUnitAddressDetailsSuccess>(DetailsActionTypes.GET_UNIT_ADDRESS_DETAILS_SUCCESS),
      tap(action =>
        this.handleGetUnitAddressSuccess(action)
      )
    ).subscribe();

    this.updates$.pipe(
      takeUntil(this.unsubscribe$),
      // TODO CHECK THE ACTIONS
      ofType<ActionUpdateUnitAddressDetailsSuccess>(DetailsActionTypes.UPDATE_UNIT_ADDRESS_DETAILS_SUCCESS),
      tap(action =>
        this.handleUpdateUnitAddressSuccess(action)
      )
    ).subscribe();
  }

  handleApprovalRoute() {
    
    this.updates$.pipe(
      takeUntil(this.unsubscribe$),
      ofType<ActionGetUnitAddressDetailsSuccess>(DetailsActionTypes.GET_UNIT_ADDRESS_DETAILS_SUCCESS),
      tap(action =>
        this.handleGetUnitAddressApproveSuccess(action)
      )
    ).subscribe();

    this.updates$.pipe(
      takeUntil(this.unsubscribe$),
      // TODO CHECK THE ACTIONS
      ofType<ActionUpdateUnitAddressDetailsSuccess>(DetailsActionTypes.UPDATE_UNIT_ADDRESS_DETAILS_SUCCESS),
      tap(action =>
        this.handleUpdateUnitAddressSuccess(action)
      )
    ).subscribe();

    this.breadCrumbs = [];

    this.updates$.pipe(
      takeUntil(this.unsubscribe$),
      ofType<ActionApproveUnitAddressSuccess>(DetailsActionTypes.APPROVE_UNIT_ADDRESS_SUCCESS),
      tap(action =>
        this.handleApproveUnitAddressSuccess(action)
      )
    ).subscribe();
    
    this.updates$.pipe(
      takeUntil(this.unsubscribe$),
      ofType<ActionRejectApprovalsSuccess>(ApprovalsActionTypes.REJECT_APPROVAL_SUCCESS),
      tap(action =>
        this.rejectApprovalsSuccessHandler(action)
      )
    ).subscribe();
    
    this.showApproveButton = true;
  }

  rejectApprovalsSuccessHandler(action){
    this.router.navigate(['/home/business/approvals/list']);
  }
  
  handleApproveUnitAddressSuccess(action){
    this.router.navigate(['/home/business/approvals/list']);
  }

  handleGetUnitAddressSuccess(action) {
    const unitData = action.payload.data;
    this.statusForUpdate = "put";
    this.unitAddressData = unitData;
    this.populateClientUnitDetails(unitData || {});
  }

  handleGetUnitAddressApproveSuccess(action){
    const approvals = action.payload.data.approvals;
    const currentApproval = this.state.currentApproval;
    this.approvedData = action.payload.data;
    let existingData = this.approvedData;
   
    this.breadCrumbs = [];

    const obj = approvals.filter(appr => {
      return (appr.approvalId == currentApproval.id);
    })[0];

    this.selectedApproval = obj;
    this.populateClientUnitDetails(this.selectedApproval || {});

    this.unitAddressData = obj;
    let formCtrls = { ...this.unitAddressFormGroup.value, ...this.AddressComponent.value };
    let approvalComments = this.approvalComments;
    if (currentApproval.method.toLowerCase() == 'post') { }
    else if (currentApproval.method.toLowerCase() == 'put') {
      Object.keys(formCtrls).forEach((fieldName) => {
        if (existingData[fieldName] != obj[fieldName]) {
          approvalComments[fieldName] = existingData[fieldName] + " -> " + obj[fieldName];
        }
      });
      if (existingData["locationId"] != obj["locationId"]) {
        let existingLocationData$ = this._locationService.getCountryIdStateIdByCityId({cityId:existingData["locationId"]});
        let newLocationData$ = this._locationService.getCountryIdStateIdByCityId({cityId:obj["locationId"]});
        forkJoin([existingLocationData$,newLocationData$]).subscribe(data => {
          approvalComments["City"] = data[0]["data"]["cityName"] + " -> " + data[1]["data"]["cityName"];
          approvalComments["State"] = data[0]["data"]["stateName"] + " -> " + data[1]["data"]["stateName"];
          approvalComments["Country"] = data[0]["data"]["countryName"] + " -> " + data[1]["data"]["countryName"];
        });
      }
    }
    this.approvalComments = approvalComments;
    this.showApproveButton = true;
  }
  
  handleUpdateUnitAddressSuccess(action){
    const hasApprovalId = action.payload.data.approvalId;
    if (!hasApprovalId) {
      this.showDialog("unit-address-success", action);
    }
    else {
      this.showDialog("unit-address-for-approval", action);
    }
  }

  populateClientUnitDetails(obj) {
    this.address = {
      address1: obj.address1 || "",
      address2: obj.address2 || "",
      pincode: obj.pincode || "",
    };
    this.locationId = obj.locationId;
    const businessEmail = obj.businessEmail || "";
    const primaryPhone = obj.primaryPhone || "";
    const alternatePhone = obj.alternatePhone || "";
    const website = obj.website || "";
    const additionalInfo = obj.additionalInfo || "";
    const emailRegEx = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$';
    const phoneRegEx = '^[0-9]{10}$';

    this.obj = obj;

    this.unitAddressFormGroup = this._formBuilder.group({
      businessEmail: [
        businessEmail,
        Validators.compose([Validators.pattern(emailRegEx), Validators.required])
      ],
      primaryPhone: [
        primaryPhone, Validators.compose([Validators.pattern(phoneRegEx)])
      ],
      alternatePhone: [
        alternatePhone, Validators.compose([Validators.pattern(phoneRegEx)])
      ],
      website: [
        website,
      ],
      additionalInfo: [
        additionalInfo,
      ]
    });
  }

  showDialog(name, action) {
    if (name == "unit-address-success") {
      const dialogRef = this.dialog.open(MessageModalComponent, {
        width: '300px',
        data: {
          name: name,
          data: {
            specialisations: action.payload.data
          }
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result && result.status) {
          if (result.message == "success") {
           if (this.routeName == 'unit-view') {
            this.router.navigate(['home/business/unit-view/' + this.tenantId + '/unit-summary/' + this.unitId]);
           }
           else if (this.routeName == 'unit-setup'){
            this.router.navigate(['home/business/unit-setup/' + this.tenantId + '/unit-finance/' + this.unitId]);
           }
           else if (this.routeName == 'unit-approve'){
              this.router.navigate(['/home/business/approvals/list']);
           }
          }
        }
        else if (result && !result.status) {
          if (result.message == "cancel") {

          }
        }
      });
    }

    else if (name == "unit-address-for-approval") {
      const dialogRef = this.dialog.open(MessageModalComponent, {
        width: '300px',
        data: {
          name: name,
          data: {
            specialisations: action.payload.data
          }
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result && result.status) {
          if (result.message == "success") {
            this.router.navigate(['home/business/unit-view/' + this.tenantId + '/unit-summary/' + this.unitId]);
          }
        }
        else if (result && !result.status) {
          if (result.message == "cancel") {

          }
        }
      });
    }
  }

  handleAddressChanges($event) {
    this.address = $event;
  }

  proceedToFinance() {
    this.store.dispatch(
      new ActionProceedToFinance({ unitId: this.parentRouteId })
    );
  }

  onSubmitUnitData(form) {
    this.address = this.AddressComponent.value;
    if (this.showApproveButton) {
     // const addressValue = this.unitAddressFormGroup.value;
      const approvalId = this.state.currentApproval.id;
      // let approvalComments = null;
      this.store.dispatch(
        new ActionApproveUnitAddress({
          ...this.unitAddressData,
          ...form.value,
          ...this.address,
          locationId: this.address.city,
          unitId: this.unitId,
          tenantId: this.tenantId,
          statusForUpdate: 'put',
          approvalId,
          // approvalComments
        })
      );
    }
    else {
    this.store.dispatch(
      new ActionUpdateUnitAddressDetails({
        id:this.obj.id,
        ...form.value,
        ...this.address,
        locationId: this.address.city,
        unitId: this.unitId,
        tenantId: this.tenantId,
        statusForUpdate: this.statusForUpdate,
      })
    );
   }
 }

  rejectApproval(form){
    if (this.showApproveButton) {
      let rejChange = this.state.currentApproval; 
      this.store.dispatch(new ActionRejectApprovals({
        ...rejChange
      }));
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
