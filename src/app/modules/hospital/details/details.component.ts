import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { State } from '@app/state/home/home.state';

import { isObjectEmpty } from '@app/utils/obj-utils';

import { ActionGetUnitDetails, DetailsActionTypes, ActionGetUnitDetailsSuccess, ActionProceedToFinance, ActionUpdateUnitDetails, ActionApproveUnitDetails, ActionApproveUnitDetailsSuccess, ActionUpdateUnitDetailsSuccess } from '@app/state/details/details.actions';
import { selectDetails } from '@app/state/details/details.selectors';
import { selectClients } from '@app/state/clients/clients.selectors';
import { MessageModalComponent } from '@app/common/message-modal/message-modal.component';
import { selectApprovals } from '@app/state/approvals/approvals.selectors';
import { ActionRejectApprovals, ActionRejectApprovalsSuccess, ApprovalsActionTypes } from '@app/state/approvals/approvals.actions';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  unitDetailsFormGroup: FormGroup;
  unitData: any;

  state: any;

  private unsubscribe$: Subject<void> = new Subject<void>();

  sub: any;
  parentRouteId: any;

  contacts: any;

  unitId: any;
  tenantId: any;

  breadCrumbs = [];
  statusForUpdate = "";

  obj;
  isFunctional = false;
  approvalComments = {};

  showApproveButton = false;
  routeName = "";

  approvedData: any;
  selectedApproval: any;

  constructor(
    public store: Store<State>,
    private _formBuilder: FormBuilder,
    private updates$: Actions,
    private router: Router,
    public dialog: MatDialog,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    this.initRouteIdBreadCrumb()

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

    this.populateClientUnitDetails({});

    if (this.routeName === 'unit-approve') {
      this.handleApprovalRoute();
    }
    else {
      this.handleNonApprovalRoute();
    }
  }

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
    }, {
      'label': 'Unit Details',
      'url': '#/home/business/unit-view/' + this.tenantId + '/unit-summary/' + this.unitId
    }, {
      'label': 'Basic Details'
    }];

    this.route.parent.url.subscribe(url => {
      this.routeName = url[0].path;
    });

  }

  handleNonApprovalRoute() {

    //Get page data
    this.store.dispatch(
      new ActionGetUnitDetails({
        unitId: this.unitId,
        tenantId: this.tenantId
      })
    );

    //Initialise effect for this.
    this.updates$.pipe(
      takeUntil(this.unsubscribe$),
      ofType<ActionGetUnitDetailsSuccess>(DetailsActionTypes.GET_UNIT_DETAILS_SUCCESS),
      tap(action =>
        this.handleGetUnitDetailsSuccess(action)
      )
    ).subscribe();

    this.updates$.pipe(
      takeUntil(this.unsubscribe$),
      ofType<ActionUpdateUnitDetailsSuccess>(DetailsActionTypes.UPDATE_UNIT_DETAILS_SUCCESS),
      tap(action =>
        this.handleUpdateUnitDetailsSuccess(action)
      )
    ).subscribe();

  }

  rejectApprovalsSuccessHandler(action) {
    this.router.navigate(['/home/business/approvals/list']);
  }

  handleApprovalRoute() {
    //Get page data
    this.store.dispatch(
      new ActionGetUnitDetails({
        unitId: this.unitId,
        tenantId: this.tenantId
      })
    );

    //Initialise effect for this.
    this.updates$.pipe(
      takeUntil(this.unsubscribe$),
      ofType<ActionGetUnitDetailsSuccess>(DetailsActionTypes.GET_UNIT_DETAILS_SUCCESS),
      tap(action =>
        this.handleGetUnitDetailsSuccessApprovals(action)
      )
    ).subscribe();

    this.updates$.pipe(
      takeUntil(this.unsubscribe$),
      ofType<ActionApproveUnitDetailsSuccess>(DetailsActionTypes.APPROVE_UNIT_DETAILS_SUCCESS),
      tap(action =>
        this.handleApproveUnitSuccess(action)
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

  handleGetUnitDetailsSuccessApprovals(action) {

    const approvals = action.payload.data.approvals;
    const currentApproval = this.state.currentApproval;
    this.approvedData = action.payload.data;
    let existingData = this.approvedData;
    this.breadCrumbs = [];
    let obj: any;
    
    if (currentApproval.method.toLowerCase() == 'post') {
      obj = action.payload.data;
      this.selectedApproval = obj;
    }
    else {
      obj = approvals.filter(appr => {
        return (appr.approvalId == currentApproval.id);
      })[0];
      this.selectedApproval = obj;
    }
    
    this.populateClientUnitDetails(obj);
    let formCtrls = this.unitDetailsFormGroup.value;
    let approvalComments = this.approvalComments;
    if (currentApproval.method.toLowerCase() == 'post') {

    }
    else if (currentApproval.method.toLowerCase() == 'put') {
      Object.keys(formCtrls).forEach((fieldName) => {
        if (existingData[fieldName] != formCtrls[fieldName]) {
          approvalComments[fieldName] = existingData[fieldName] + " -> " + formCtrls[fieldName];
        }
      });
    }
    this.approvalComments = approvalComments;
  }

  handleUpdateUnitDetailsSuccess(action) {
    const hasApprovalId = action.payload.data.approvalId;
    if (!hasApprovalId) {
      this.showDialog("unit-details-success", action);
    }
    else {
      this.showDialog("unit-details-for-approval", action);
    }
  }

  showDialog(name, action) {
    if (name == "unit-details-success") {
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
            else if (this.routeName == 'unit-setup') {
              this.router.navigate(['home/business/unit-setup/' + this.tenantId + '/unit-address-details/' + this.unitId]);
            }
            else if (this.routeName == 'unit-approve') {
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

    else if (name == "unit-details-for-approval") {
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

  handleApproveUnitSuccess(action) {
    this.router.navigate(['/home/business/approvals/list']);
  }

  handleGetUnitDetailsSuccess(action) {
    const unitData = action.payload.data;
    if (isObjectEmpty(unitData)) {
      this.statusForUpdate = "post";
    } else {
      this.statusForUpdate = "put";
    }
    if (this.routeName === 'unit-approve') {
    }
    this.populateClientUnitDetails(unitData || {});
  }

  populateClientUnitDetails(obj) {
    const name = obj.name || "";
    const cin = obj.cin || "";
    // const licenseNumber = obj.licenseNumber || "";
    const gstin = obj.gstin || "";
    const pan = obj.pan || "";
    const isFunctional = obj.isFunctional || false;
    this.isFunctional = isFunctional;

    this.obj = obj;
    this.unitDetailsFormGroup = this._formBuilder.group({
      name: [
        name,
      ],
      cin: [
        cin,
        Validators.compose([Validators.pattern('^([L|U]{1})([0-9]{5})([A-Za-z]{2})([0-9]{4})([A-Za-z]{3})([0-9]{6})$')])
      ],
      // licenseNumber: [
      //   licenseNumber,
      // ],
      gstin: [
        gstin,
        Validators.compose([Validators.pattern('^([0][1-9]|[1-2][0-9]|[3][0-5])([a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}[zZ]{1}[0-9a-zA-Z]{1})+$')])
      ],
      pan: [
        pan,
        Validators.compose([Validators.pattern('^([A-Za-z]{5})([0-9]{4})([A-Za-z]{1})$')])
      ],
      isFunctional: [
        isFunctional
      ]
    });

  }

  proceedToFinance() {
    this.store.dispatch(
      new ActionProceedToFinance({ unitId: this.parentRouteId })
    );
  }

  onSubmitUnitData(form) {

    if (this.showApproveButton) {

      let statusForUpdate = this.state.currentApproval.method;

      const id = this.selectedApproval.id;
      const approvalId = this.selectedApproval.approvalId;

      this.store.dispatch(
        new ActionApproveUnitDetails({
          ...this.obj,
          ...form.value,
          unitId: this.unitId,
          tenantId: this.tenantId,
          statusForUpdate: statusForUpdate,
          id,
          approvalId
        })
      );
    }
    else {

      if (this.statusForUpdate == 'put') {
        //  this.obj['approvalComments'] = JSON.stringify(this.approvalComments);
      }
      this.store.dispatch(
        new ActionUpdateUnitDetails({
          ...this.obj,
          ...form.value,
          unitId: this.unitId,
          tenantId: this.tenantId,
          statusForUpdate: this.statusForUpdate
        })
      );
    }
  }

  rejectApproval(form) {
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
