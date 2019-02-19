import { Component, OnInit, Inject, Input, Output, EventEmitter } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { Actions, ofType } from '@ngrx/effects';

import { takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { State } from '@app/state/home/home.state';
import { ActionDeleteDepartment, ActionGetUnitSpecialityDetails, ActionGetUnitSpecialityDetailsSuccess, ActionUpdateUnitSpecialityDetailsSuccess, SpecialitiesActionTypes, ActionUpdateUnitSpecialityDetails, ActionProceedFromSpecialities, ActionGetDepartments, ActionGetDepartmentsSuccess, ActionApproveUnitSpecialitySuccess, ActionApproveUnitSpeciality } from '@app/state/specialities/specialities.actions';
import { isObjectEmpty } from '@app/utils/obj-utils';

import { selectSpecialities } from '@app/state/specialities/specialities.selectors';
import { MessageModalComponent } from '@app/common/message-modal/message-modal.component';
import { selectClients } from '@app/state/clients/clients.selectors';
import { selectApprovals } from '@app/state/approvals/approvals.selectors';
import { ActionRejectApprovals, ActionRejectApprovalsSuccess, ApprovalsActionTypes } from '@app/state/approvals/approvals.actions';

@Component({
  selector: 'app-units-departments',
  templateUrl: './units-departments.component.html',
  styleUrls: ['./units-departments.component.scss']
})
export class UnitsDepartmentsComponent implements OnInit {

  private unsubscribe$: Subject<void> = new Subject<void>();

  state: any;
  unitSpecialities = [];

  dataForTree: any;

  showApproveButton = false;

  routeName = "";
  approvedData:any;
  allDepts = [];
  selectedSpecialities = [];
  obj = {};
  sub: any;
  selectedApproval:any;
  approvalComments:any;
  approvalspecs = [];
  tenantId: any;
  unitId: any;
  breadCrumbs = [];
  approvalstate: any;
  statusForUpdate = "";

  constructor(
    public store: Store<State>,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private updates$: Actions
  ) { }
  initRouteIdBreadCrumb() {
    this.sub = this.route.params.subscribe(params => {
      this.unitId = params["unitId"];
    });
    this.sub = this.route.parent.params.subscribe(params => {
      this.tenantId = params["id"];
    });

    this.route.parent.url.subscribe(url => {
      this.routeName = url[0].path;
    });

    this.breadCrumbs = [
      {
        'label': 'Org Tree',
        'url': '#/home/business/hospital-info/' + this.tenantId
      }, {
        'label': 'Unit Details',
        'url': '#/home/business/unit-view/' + this.tenantId + '/unit-summary/' + this.unitId
      }, {
        'label': 'Unit Specialities'
      }
    ];
    this.route.parent.url.subscribe(url => {
      this.routeName = url[0].path;
    });   
  }

  ngOnInit() {
    this.initRouteIdBreadCrumb();
    this.store
      .pipe(select(selectSpecialities), takeUntil(this.unsubscribe$))
      .subscribe((state: any) => {
        this.state = state;
      });

   this.store
      .pipe(select(selectApprovals), takeUntil(this.unsubscribe$))
      .subscribe((approvalstate: any) => {
        this.approvalstate = approvalstate;
      });
    }
   
ngAfterViewInit() {
   this.store.dispatch(
    new ActionGetUnitSpecialityDetails({
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
      new ActionGetUnitSpecialityDetails({
        unitId: this.unitId,
        tenantId: this.tenantId
      })
      );
      this.updates$.pipe(
        takeUntil(this.unsubscribe$),
        // TODO CHECK THE ACTIONS
        ofType<ActionGetUnitSpecialityDetailsSuccess>(SpecialitiesActionTypes.GET_UNIT_SPECIALITY_DETAILS_SUCCESS),
        tap(action =>
          this.handleGetUnitSpecialitySuccess(action)
        )
      ).subscribe();
      this.updates$.pipe(
        takeUntil(this.unsubscribe$),
        // TODO CHECK THE ACTIONS
        ofType<ActionUpdateUnitSpecialityDetailsSuccess>(SpecialitiesActionTypes.UPDATE_UNIT_SPECIALITY_DETAILS_SUCCESS),
        tap(action =>
          this.handleUpdateUnitSpecialityDetailsSuccess(action)
        )
      ).subscribe();
  }

  handleApprovalRoute() {
    
    this.updates$.pipe(
      takeUntil(this.unsubscribe$),
      // TODO CHECK THE ACTIONS
      ofType<ActionGetUnitSpecialityDetailsSuccess>(SpecialitiesActionTypes.GET_UNIT_SPECIALITY_DETAILS_SUCCESS),
      tap(action =>
        this.handleGetUnitSpecialityApprovalSuccess(action)
      )
    ).subscribe();
    this.updates$.pipe(
      takeUntil(this.unsubscribe$),
      // TODO CHECK THE ACTIONS
      ofType<ActionUpdateUnitSpecialityDetailsSuccess>(SpecialitiesActionTypes.UPDATE_UNIT_SPECIALITY_DETAILS_SUCCESS),
      tap(action =>
        this.handleUpdateUnitSpecialityDetailsSuccess(action)
      )
    ).subscribe();

    this.breadCrumbs = [];

    this.updates$.pipe(
      takeUntil(this.unsubscribe$),
      ofType<ActionApproveUnitSpecialitySuccess>(SpecialitiesActionTypes.APPROVE_UNIT_SPECIALITIES_SUCCESS),
      tap(action =>
        this.handleApproveUnitSpecialitySuccess(action)
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

  handleGetUnitSpecialityApprovalSuccess(action){
    const currentApproval = JSON.parse(this.approvalstate.currentApproval.data);
    this.approvedData = action.payload.data.specializationIds;
    let existingData = this.approvedData;
   
    this.breadCrumbs = [];

    this.selectedApproval = currentApproval.specializationIds;
    let masterList = this.state.masterSpecializations;
    
    let temp = this.selectedApproval.map(appr => {
      let obj = masterList.filter(childobj => {
        return childobj.id == appr;
      });
       return obj[0];
     });
    
     this.selectedApproval = this.processSpecs1(masterList,temp).selectedDepts;
     this.showApproveButton = true;
  }
  
  handleUpdateUnitSpecialityDetailsSuccess(action) {
    const hasApprovalId = action.payload.data.approvalId;
    if (hasApprovalId == null) {
      this.showDialog("unit-specialities-success", action);
    }
    else {
      this.showDialog("specialites-for-approval", action);
    }
  }

  handleApproveUnitSpecialitySuccess(action) {
    this.router.navigate(['/home/business/approvals/list']);
  }

  showDialog(name, action) {
    if (name == "unit-specialities-success") {
      const dialogRef = this.dialog.open(MessageModalComponent, {
        width: '300px',
        data: {
          name: "unit-specialities-success",
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
              this.router.navigate(['home/business/unit-setup/' + this.tenantId + '/unit-doctors/' + this.unitId]);
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

    if (name == "specialites-for-approval") {
      const dialogRef = this.dialog.open(MessageModalComponent, {
        width: '300px',
        data: {
          name: "specialites-for-approval",
          data: {
            specialisations: action.payload.data
          }
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result && result.status) {
          if (result.message == "success") {
            // this.router.navigate(['home/business/unit-view/' + this.tenantId + '/unit-summary/' + this.unitId]);
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

  getUnitSpecialitiesDetails() {
    this.store.dispatch(
      new ActionGetUnitSpecialityDetails({
        unitId: this.unitId,
        tenantId: this.tenantId
      })
    );
  }

  handleGetUnitSpecialitySuccess(action) {
    this.statusForUpdate = "post";
    this.unitSpecialities = action.payload.data.specializationIds;
  }

  saveDepartments(selectedSpecialities) {
    if (this.showApproveButton) {
      let obj = this.approvalstate.currentApproval.data;
      obj = JSON.parse(obj);
      const approvalId = this.approvalstate.currentApproval.id;
      const specializationIds = [];
      selectedSpecialities.forEach(element => {
        specializationIds.push(element.id);
      });
      const toAdd = {
        unitId: this.unitId,
        tenantId: this.tenantId,
        id: specializationIds,
        statusForUpdate: this.statusForUpdate,
        approvalId
      };
      this.store.dispatch(
        new ActionApproveUnitSpeciality(toAdd)
      );
    }
    else {
      const specializationIds = [];
      selectedSpecialities.forEach(element => {
        specializationIds.push(element.id);
      });
      const toAdd = {
        unitId: this.unitId,
        tenantId: this.tenantId,
        id: specializationIds,
        statusForUpdate: this.statusForUpdate
      };
      this.store.dispatch(
        new ActionUpdateUnitSpecialityDetails(toAdd)
      );
    }
  }

  processSpecs(masterList, obj) {
    const specializations = obj.specializationIds || [];
    const allDepts = masterList || [];
    const selectedDepts = [];
    for (let i = 0; i < allDepts.length; i++) {
      for (let j = 0; j < specializations.length; j++) {
        if (allDepts[i].id === specializations[j]) {
          selectedDepts.push(allDepts[i]);
        }
      }
    }
    return selectedDepts;
  }

  handleDeleteDepartment(event) {
    this.store.dispatch(
      new ActionDeleteDepartment({ value: event })
    );
  }

 processSpecs1(masterList, obj) {
    const specializations = obj || [];
    let allDepts = masterList || [];
    const selectedDepts = [];
    for (var i = 0; i < allDepts.length; i++) {
        for (var j = 0; j < specializations.length; j++) {
            if (allDepts[i].id === specializations[j].id) {
                selectedDepts.push(allDepts[i]);
            }
        }
    }
    return {
        selectedDepts: selectedDepts,
        allDepts: allDepts
    };
   }

 rejectApproval(){
    if (this.showApproveButton) {
      let rejChange = this.approvalstate.currentApproval; 
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
