import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { Router, ActivatedRoute } from '@angular/router';
import { takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { State } from '@app/state/home/home.state';

import { FinanceComponent } from '@app/common/finance/finance.component';
import { isObjectEmpty } from '@app/utils/obj-utils';
import { ActionGetUnitFinance, ActionProceedToSpecialities, ActionGetUnitFinanceSuccess, DetailsActionTypes, ActionUpdateUnitFinance, ActionApproveUnitFinanceSuccess, ActionApproveUnitFinance, ActionUpdateUnitFinanceSuccess } from '@app/state/details/details.actions';
import { selectDetails } from '@app/state/details/details.selectors';
import { selectClients } from '@app/state/clients/clients.selectors';
import { MatDialog } from '@angular/material';
import { MessageModalComponent } from '@app/common/message-modal/message-modal.component';
import { selectApprovals } from '@app/state/approvals/approvals.selectors';
import { ActionRejectApprovals, ActionRejectApprovalsSuccess, ApprovalsActionTypes } from '@app/state/approvals/approvals.actions';

@Component({
  selector: 'app-unit-finance',
  templateUrl: './unit-finance.component.html',
  styleUrls: ['./unit-finance.component.scss']
})
export class UnitFinanceComponent implements OnInit {

  tenantInfoFormGroup: FormGroup;

  @ViewChild("clientFinance") clientFinance: FinanceComponent;

  state: any;

  @Output() updates: EventEmitter<any> = new EventEmitter<any>();

  private unsubscribe$: Subject<void> = new Subject<void>();

  sub: any;
  parentRouteId: any;

  unitId: any;
  tenantId: any;

  address: any;
  contacts: any;
  breadCrumbs = [];
  statusForUpdate = "";

  clientFinanceData = {};

  showApproveButton = false;
  routeName = "";

  approvalComments = [];

  approvedData: any;
  selectedApproval: any;
  unitData: any;

  constructor(
    public store: Store<State>,
    private route: ActivatedRoute,
    private updates$: Actions,
    private router: Router,
    public dialog: MatDialog
  ) { }

  initRouteIdBreadCrumb() {
    this.route.parent.params.subscribe(params => {
      this.tenantId = params["id"];
    });
    this.route.params.subscribe(params => {
      this.unitId = params["unitId"];
    });
    this.breadCrumbs = [{
      'label': 'Org Chart',
      'url': '#/home/business/hospital-info/' + this.tenantId
    }, {
      'label': 'Unit Details',
      'url': '#/home/business/unit-view/' + this.tenantId + '/unit-summary/' + this.unitId
    }, {
      'label': 'Unit Finance'
    }];
    this.route.parent.url.subscribe(url => {
      this.routeName = url[0].path;
    });
  }

  ngOnInit() {
    this.initRouteIdBreadCrumb();
    this.store
      .pipe(select(selectDetails), takeUntil(this.unsubscribe$))
      .subscribe((state: any) => {
        this.unitData = state;
      });

    this.store
      .pipe(select(selectApprovals), takeUntil(this.unsubscribe$))
      .subscribe((state: any) => {
        this.state = state;
      });
    // this.route.parent.url.subscribe(url => {
    //   this.routeName = url[0].path;
    // });
  }

  ngAfterViewInit() {
    this.store.dispatch(new ActionGetUnitFinance({
      unitId: this.unitId,
      tenantId: this.tenantId
    }));
    if (this.routeName === 'unit-approve') {
      this.handleApprovalRoute();
    }
    else {
      this.handleNonApprovalRoute();
    }
  }

  proceedToSpecialities() {
    this.store.dispatch(
      new ActionProceedToSpecialities({
        unitId: this.unitId,
        tenantId: this.tenantId
      })
    );
  }

  handleNonApprovalRoute() {
    this.store.dispatch(new ActionGetUnitFinance({
      unitId: this.unitId,
      tenantId: this.tenantId
    }));
    this.updates$.pipe(
      takeUntil(this.unsubscribe$),
      ofType<ActionGetUnitFinanceSuccess>(DetailsActionTypes.GET_UNIT_FINANCE_SUCCESS),
      tap(action =>
        this.handleGetUnitFinanceSuccess(action)
      )
    ).subscribe();
    this.updates$.pipe(
      takeUntil(this.unsubscribe$),
      ofType<ActionUpdateUnitFinanceSuccess>(DetailsActionTypes.UPDATE_UNIT_FINANCE_SUCCESS),
      tap(action =>
        this.handleUpdateUnitFinanceSuccess(action)
      )
    ).subscribe();
  }

  handleApprovalRoute() {
    this.updates$.pipe(
      takeUntil(this.unsubscribe$),
      ofType<ActionGetUnitFinanceSuccess>(DetailsActionTypes.GET_UNIT_FINANCE_SUCCESS),
      tap(action =>
        this.handleGetUnitFinanceApprovalsSuccess(action)
      )
    ).subscribe();
    this.updates$.pipe(
      takeUntil(this.unsubscribe$),
      ofType<ActionUpdateUnitFinanceSuccess>(DetailsActionTypes.UPDATE_UNIT_FINANCE_SUCCESS),
      tap(action =>
        this.handleUpdateUnitFinanceSuccess(action)
      )
    ).subscribe();

    this.breadCrumbs = [];

    this.updates$.pipe(
      takeUntil(this.unsubscribe$),
      ofType<ActionApproveUnitFinanceSuccess>(DetailsActionTypes.APPROVE_UNIT_FINANCE_SUCCESS),
      tap(action =>
        this.handleApproveUnitFinanceSuccess(action)
      )
    ).subscribe();

    this.updates$.pipe(
      takeUntil(this.unsubscribe$),
      ofType<ActionRejectApprovalsSuccess>(ApprovalsActionTypes.REJECT_APPROVAL_SUCCESS),
      tap(action =>
        this.rejectApprovalsSuccessHandler(action)
      )
    ).subscribe();
  }

  handleUpdateUnitFinanceSuccess(action) {
    const hasApprovalId = action.payload.data.approvalId;
    if (!hasApprovalId) {
      this.showDialog("unit-finance-success", action);
    }
    else {
      this.showDialog("unit-finance-for-approval", action);
    }
  }

  handleApproveUnitFinanceSuccess(action) {
    this.router.navigate(['/home/business/approvals/list']);
  }

  showDialog(name, action) {
    if (name == "unit-finance-success") {
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
              this.router.navigate(['home/business/unit-setup/' + this.tenantId + '/unit-specialities/' + this.unitId]);
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
    else if (name == "unit-finance-for-approval") {
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

  handleGetUnitFinanceSuccess(action) {
    const unitData = action.payload.data;
    this.statusForUpdate = "put";
    this.clientFinanceData = unitData;
  }

  handleGetUnitFinanceApprovalsSuccess(action) {
    const approvals = action.payload.data.approvals;
    const currentApproval = this.state.currentApproval;
    this.approvedData = action.payload.data;
    let existingData = this.approvedData;

    this.breadCrumbs = [];

    const obj = approvals.filter(appr => {
      return (appr.approvalId == currentApproval.id);
    })[0];

    this.selectedApproval = obj;

    this.clientFinanceData = obj;
    let formCtrls = this.clientFinance.value;
    let approvalComments = this.approvalComments;
    if (currentApproval.method.toLowerCase() == 'post') { }
    else if (currentApproval.method.toLowerCase() == 'put') {
      Object.keys(formCtrls).forEach((fieldName) => {
        if (existingData[fieldName] != obj[fieldName]) {
          approvalComments[fieldName] = existingData[fieldName] + " -> " + obj[fieldName];
        }
      });
    }
    this.approvalComments = approvalComments;
    this.showApproveButton = true;
    // const unitData = action.payload.data;
    // this.statusForUpdate = "put";
    // this.clientFinanceData = unitData;

    // let existingData = this.state.currentApprovedData;
    // let approvalData = JSON.parse(this.state.currentApproval.data);
    // if (!existingData.approvals) {
    //   this.clientFinanceData = approvalData;
    // }
    // else {
    //   this.clientFinanceData = existingData.approvals.filter(approval => {
    //     return approval.approvalId === this.state.currentApproval.id;
    //   })[0] || {};
    //   let formValue = this.clientFinance.value;
    //   Object.keys(formValue).forEach((fieldName) => {
    //     if (existingData[fieldName] != approvalData[fieldName]) {
    //       if (approvalData && approvalData[fieldName]) {
    //         this.approvalComments[fieldName] = existingData[fieldName] + " -> " + approvalData[fieldName];
    //       }
    //     }
    //   });
    // }
    // this.showApproveButton = true;
  }

  rejectApprovalsSuccessHandler(action){
    this.router.navigate(['/home/business/approvals/list']);
  }

  handleFormStatusChanges(event) { }

  updateUnitFinance() {
    if (this.showApproveButton) {
      const financeValue = this.clientFinance.value;
      const approvalId = this.state.currentApproval.id;
      // let approvalComments = null;
      this.store.dispatch(
        new ActionApproveUnitFinance({
          ...financeValue,
          ...this.clientFinanceData,
          unitId: this.unitId,
          tenantId: this.tenantId,
          statusForUpdate: 'put',
          approvalId,
          // approvalComments
        })
      );
    }
    else {
      const financeValue = this.clientFinance.value;
      this.store.dispatch(
        new ActionUpdateUnitFinance({
          ...this.clientFinanceData,
          ...financeValue,
          unitId: this.unitId,
          tenantId: this.tenantId,
          statusForUpdate: this.statusForUpdate
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
