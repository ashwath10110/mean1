import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';

import { takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { State } from '@app/state/home/home.state';
import { selectClients } from '@app/state/clients/clients.selectors';
import { selectDoctors } from '@app/state/doctors/doctors.selectors';
import { ActionGetDoctors, ActionGetDoctorsByUnitId, ActionAddMoreDoctor, ActionApproveUnitDoctorSuccess, ActionGetDoctorByDocId, ActionGetDoctorByDocIdSuccess } from '@app/state/doctors/doctors.actions';
import { MatDialog } from '@angular/material';
import { EditDoctorComponent } from '../edit-doctor/edit-doctor.component';
import { MapDoctorComponent } from '../map-doctor/map-doctor.component';
import { ActionRemoveDoctorFromUnit, ActionRemoveDoctorFromUnitSuccess, DoctorsActionTypes, ActionDeleteDoctors } from '@app/state/doctors/doctors.actions';
import { selectSpecialities } from '@app/state/specialities/specialities.selectors';
import { selectApprovals } from '@app/state/approvals/approvals.selectors';

@Component({
  selector: 'app-client-doctors',
  templateUrl: './client-doctors.component.html',
  styleUrls: ['./client-doctors.component.css']
})
export class ClientDoctorsComponent implements OnInit {

  private unsubscribe$: Subject<void> = new Subject<void>();
  state;

  sub: any;
  tenantId: any;
  unitId: any;
  specializationIds = [];
  routeName = "";
  currentApproval: any;

  showApproveButton = false;
  selectedSpecialities = [];
  breadCrumbs = [];
  specializationLists: any;

  clientsState: any;
  existingData:any;
  approvalsState: any;
  selectedApproval:any;

  constructor(
    public store: Store<State>,
    private updates$: Actions,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.sub = this.route.params.subscribe(params => {
      this.unitId = params["unitId"];
    });
    this.sub = this.route.parent.params.subscribe(params => {
      this.tenantId = params["id"];
    });
    this.route.parent.url.subscribe(url => {
      this.routeName = url[0].path;
    });
    if (this.routeName == 'unit-approve') {
      this.breadCrumbs = [];
    } else {
      this.breadCrumbs = [{
        'label': 'Org Chart',
        'url': '#/home/business/hospital-info/' + this.tenantId
      },
      {
        'label': 'Unit Details',
        'url': '#/home/business/unit-view/' + this.tenantId + '/unit-summary/' + this.unitId
      }, {
        'label': 'Unit Doctors'
      }];
    }
  }

  ngOnInit() {
    this.store
      .pipe(select(selectDoctors), takeUntil(this.unsubscribe$))
      .subscribe((state: any) => {
        this.state = state;
      });
    this.store
      .pipe(select(selectClients), takeUntil(this.unsubscribe$))
      .subscribe((state: any) => {
        this.clientsState = state;
        this.currentApproval = state.currentApproval;
      });
    this.store
      .pipe(select(selectSpecialities), takeUntil(this.unsubscribe$))
      .subscribe((state: any) => {
        this.specializationLists = state.currentClientDepartments || [];
      });

    this.store
      .pipe(select(selectApprovals), takeUntil(this.unsubscribe$))
      .subscribe((state: any) => {
        this.approvalsState = state;
      });

    this.store.dispatch(
      new ActionGetDoctors({})
    );
    this.store.dispatch(
      new ActionGetDoctorsByUnitId({
        unitId: this.unitId,
        tenantId: this.tenantId
      })
    );

    if (this.routeName === 'unit-approve') {
      this.handleApprovalRoute();
      this.showApproveButton = true;
    }
    else {
      this.initEffects();
    }
  }

  initEffects() {
    this.updates$.pipe(
      takeUntil(this.unsubscribe$),
      ofType<ActionAddMoreDoctor>(DoctorsActionTypes.ADD_MORE_DOCTORS),
      tap(action =>
        this.handleAddMoreDoctors(action)
      )
    ).subscribe();
  }

  handleApprovalRoute() {
    const doctorId = this.approvalsState.currentApproval.externalId;
    this.store.dispatch(
      new ActionGetDoctorByDocId({
        doctorId: doctorId,
        tenantId: this.tenantId
      })
    );
    this.updates$.pipe(
      takeUntil(this.unsubscribe$),
      ofType<ActionGetDoctorByDocIdSuccess>(DoctorsActionTypes.GET_DOCTOR_BY_DOC_ID_SUCCESS),
      tap(action =>
        this.handleApprovalsDocSuccess(action)
      )
    ).subscribe();
  }

  handleApprovalsDocSuccess(action) {
    let approvals;
      if(this.approvalsState.currentApproval.method.toLowerCase() == 'post'){
      approvals = action.payload.data.data;
      approvals["approvalId"] =  this.approvalsState.currentApproval.id;
      approvals["method"] =  this.approvalsState.currentApproval.method;
      this.existingData = [];
    }else{
      approvals = action.payload.data.data.approvals[0];
      approvals["approvalId"] =  this.approvalsState.currentApproval.id;
      approvals["method"] =  this.approvalsState.currentApproval.method;
      this.existingData = action.payload.data.data;
    }
     setTimeout(() => {
        this.editDoctors(approvals);
      }, 200);
  }

  handleAddMoreDoctors(action) {
    this.addDoctor();
  }

  proceedNext() {
    if (this.routeName == 'unit-setup') {
      this.router.navigate(['home/business/unit-setup/' + this.tenantId + '/unit-users/' + this.unitId]);
    }
    else if (this.routeName == 'unit-view') {
      this.router.navigate(['home/business/unit-view/' + this.tenantId + '/unit-summary/' + this.unitId]);
    }
  }

  addDoctor() {
    const dialogRef = this.dialog.open(EditDoctorComponent, {
      width: '800px',
      data: {
        doctor: {},
        status: 'new',
        showApproveButton: this.showApproveButton,
        routeName: this.routeName,
        specializationLists: this.specializationLists,
        tenantId: this.tenantId,
        unitId: this.unitId,
        statusForUpdate: 'post'
      }
    });
    dialogRef.afterClosed().subscribe(result => {

    });
  }

  handleRemoveDoctorFromUnit(doctor) {
    this.store.dispatch(
      new ActionRemoveDoctorFromUnit({
        doctor: doctor,
        unitId: this.unitId
      })
    );
  }

  editDoctors(event) {

    const dialogRef = this.dialog.open(EditDoctorComponent, {
      width: '800px',
      data: {
        doctor: event,
        status: 'edit',
        showApproveButton: this.showApproveButton,
        routeName: this.routeName,
        specializationLists: this.specializationLists,
        unitId: this.unitId,
        tenantId: this.tenantId,
        statusForUpdate: 'put',
        existingData:this.existingData? this.existingData:null
      }
    });
    dialogRef.afterClosed().subscribe(result => {

    });
  }

  deleteDoctorFn(doctor: any) {
    this.store.dispatch(
      new ActionDeleteDoctors({ id: doctor.id })
    );
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
