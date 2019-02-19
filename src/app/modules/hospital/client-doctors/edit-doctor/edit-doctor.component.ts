import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, Inject, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Subject, forkJoin } from 'rxjs';
import { takeUntil, tap, take } from 'rxjs/operators';
import { Actions, ofType } from '@ngrx/effects';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { State } from '@app/state/home/home.state';
import {ActionGetDoctorsByUnitId, ActionUpdateDoctors, ActionUpdateDoctorsSuccess, ActionAddDoctors, ActionAddDoctorsSuccess, DoctorsActionTypes, ActionApproveUnitDoctor, ActionApproveUnitDoctorSuccess , ActionGetDoctorByDocId, ActionGetDoctorByDocIdSuccess} from '@app/state/doctors/doctors.actions';
import { selectUnits } from '@app/state/units/units.selectors';

import { selectSpecialities } from '@app/state/specialities/specialities.selectors';

import { ActionGetTenantUnits } from '@app/state/units/units.actions';
import { ActionGetUnitSpecialityDetails, ActionGetDepartments, ActionGetDepartmentsByUnitId, ActionGetSpecialitiesCurrentClient } from '@app/state/specialities/specialities.actions';
import { doctorTypes } from 'api-config';
import { MessageModalComponent } from '@app/common/message-modal/message-modal.component';
import { ActionGetCityByStateId } from '@app/state/locations/locations.actions';
import { AppState, selectAuthState } from '@app/core';
import { AddressComponent } from '@app/common/address/address.component';
import { selectApprovals } from '@app/state/approvals/approvals.selectors';
import { ActionRejectApprovals, ActionRejectApprovalsSuccess, ApprovalsActionTypes } from '@app/state/approvals/approvals.actions';
import { LocationsService } from '@app/state/locations/locations.service';
import { SpecialitiesService } from '@app/state/specialities/specialities.service';
import { UnitsService } from '@app/state/units/units.service';
import { diffOfTwoSTringArrays } from '@app/utils/obj-utils';


@Component({
  selector: 'anms-edit-doctor',
  templateUrl: './edit-doctor.component.html',
  styleUrls: ['./edit-doctor.component.css']
})
export class EditDoctorComponent implements OnInit, OnDestroy {

  state: any;
  doctorsFormGroup: FormGroup;
  private unsubscribe$: Subject<void> = new Subject<void>();
  specialities = [];
  selectedSpecialities: any;
  stock: any;
  address: any;
  contacts: any;
  statusForUpdate = '';
  specializationIds = [];
  routeName: any;
  currentApproval: any;
  showApproveButton: any;
  unitId = [];
  doctor;
  unitsList = [];
  tenantUnitIds = [];
  selectedSpecializationLists = [];
  tenantId;
  specializationLists = [];
  roles = [];
  approvalComments = [];
  disabledBtnFlag: Boolean;
  attachments = [];
  attachmentIds = [];
  maxSizeInKb = 2048;
  uploadStatus = false;
  fileTypes = doctorTypes;
  approvalId: any;
  approvalsState:any;
  approvalstate:any;
  @Input() departments = [];

  @Output() updates: EventEmitter<any> = new EventEmitter<any>();
  
  locationId = "";

  @ViewChild('AddressComponent') AddressComponent: AddressComponent;
  

  constructor(
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EditDoctorComponent>,
    public store: Store<State>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    private updates$: Actions,
    public snackBar: MatSnackBar,
    public _locationService: LocationsService,
    public _specialitiesService:SpecialitiesService,
    public _unitsService:UnitsService

  ) {
    this.statusForUpdate = this.data.statusForUpdate;
    this.tenantId = this.data.tenantId ? this.data.tenantId : "currentclient";
    this.specializationLists = this.data.specializationLists;
    this.disabledBtnFlag = false;
    this.showApproveButton = this.data.showApproveButton;
    if (this.showApproveButton) {     
      this.doctor = this.data.doctor;
      
    } else {
      this.doctor = this.data.doctor;
    }
    this.locationId = this.doctor.locationId ? this.doctor.locationId : "";

    this.routeName = this.data.routeName;
    this.specialities = [...this.departments];

    if (this.doctor.unitId) {
      this.unitId.push(this.doctor.unitId);
    } else {
      this.unitId = [];
    }

    this.initEffects();
    this.address = {
      city: 0,
      state: 0,
      country: 0,
      pincode: null
    };
    if(this.showApproveButton != true &&  this.locationId){
      this.initFormGroup(this.doctor);
    }else{
      this.initFormGroup({})
    }
   
  }

  ngAfterViewInit() {
    if(this.showApproveButton && this.locationId){
      this.handleApproveDoctor();
    }/*else if(this.showApproveButton && this.locationId && this.data.doctor.method.toLowerCase() == 'post'){
      this.initFormGroup(this.doctor);
    }*/
  }
  ngOnInit() {
    this.store.pipe(select(selectAuthState), takeUntil(this.unsubscribe$))
   .subscribe((state: any) => {
      if(state.user.data.roles)
      this.roles.push(state.user.data.roles);
    });
    this.store.dispatch(
      new ActionGetTenantUnits({
        tenantId: this.tenantId
      })
    );
    this.store.dispatch(
      new ActionGetDepartments({
      })
    );

    this.store
      .pipe(select(selectUnits), takeUntil(this.unsubscribe$))
      .subscribe((unitState: any) => {
        if (unitState.unitsList) {
          this.unitsList = unitState.unitsList ? unitState.unitsList : [];
          this.unitsList.forEach(unitId => {
            this.tenantUnitIds.push(unitId.id);
          });
        }
      });
    this.store
      .pipe(select(selectSpecialities), takeUntil(this.unsubscribe$))
      .subscribe((state: any) => {
        this.specializationLists = state.unitSpecializations;
        if( this.specializationLists){
          let uniqIds = {};
          let filtered = this.specializationLists.filter(obj => !uniqIds[obj.id] && (uniqIds[obj.id] = true));
          this.selectedSpecializationLists = filtered;
          }
      });

    if (this.tenantUnitIds.length && (this.showApproveButton || this.statusForUpdate == 'put' ))
      this.store.dispatch(
        new ActionGetSpecialitiesCurrentClient(
          {
            tenantId: this.tenantId,
            unitIds: this.tenantUnitIds
          }
        )
      );

    this.store.dispatch(
      new ActionGetDepartmentsByUnitId({
        unitId: this.unitId,
        tenantId: this.tenantId
      })
    );

    this.store
      .pipe(select(selectApprovals), takeUntil(this.unsubscribe$))
      .subscribe((approvalstate: any) => {
        this.approvalstate = approvalstate;
      });
    
    if (this.statusForUpdate == 'put' && this.unitsList.length && this.specializationLists) {
      let unitsIds = this.doctor["unitIds"] ? this.doctor["unitIds"] : [];
      this.getSepecializations(unitsIds);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


  initEffects() {
    if (this.statusForUpdate == 'post') {
      this.updates$.pipe(
        ofType<ActionAddDoctorsSuccess>(DoctorsActionTypes.ADD_DOCTORS_SUCCESS),
        tap(action =>
          this.handleAddDoctorsSuccess(action)
        )
      ).subscribe();
    } else if (this.statusForUpdate == 'put' && this.showApproveButton == true) {
      this.updates$.pipe(
        ofType<ActionApproveUnitDoctorSuccess>(DoctorsActionTypes.APPROVE_UNIT_DOCTORS_SUCCESS),
        tap(action =>
          this.handleApproveDoctorSuccess(action)
        )
      ).subscribe();
    } else {
      this.updates$.pipe(
        ofType<ActionUpdateDoctorsSuccess>(DoctorsActionTypes.UPDATE_DOCTORS_SUCCESS),
        tap(action =>
          this.handleUpdateDoctorsSuccess(action)
        )
      ).subscribe();
    }

    this.updates$.pipe(
      takeUntil(this.unsubscribe$),
      ofType<ActionRejectApprovalsSuccess>(ApprovalsActionTypes.REJECT_APPROVAL_SUCCESS),
      tap(action =>
        this.rejectApprovalsSuccessHandler(action)
      )
    ).subscribe();
  }

  handleApproveDoctor(){
    this.approvalId = this.data.doctor.approvalId;
    let existingData = this.data.existingData? this.data.existingData:null;
    this.initFormGroup(this.data.doctor);

    let formCtrls = { ...this.doctorsFormGroup.value, ...this.AddressComponent.value};
    let approvalComments = this.approvalComments;
    if (this.data.doctor.method.toLowerCase() == 'post') { }
    else if (this.data.doctor.method.toLowerCase() == 'put') {
      Object.keys(formCtrls).forEach((fieldName) => {
      if (existingData[fieldName] != this.data.doctor[fieldName]) {
        approvalComments[fieldName] = existingData[fieldName] + " -> " +  this.data.doctor[fieldName];
      }
      });
      if (existingData["locationId"] != this.data.doctor["locationId"]) {
        let existingLocationData$ = this._locationService.getCountryIdStateIdByCityId({cityId:existingData["locationId"]});
        let newLocationData$ = this._locationService.getCountryIdStateIdByCityId({cityId: this.data.doctor["locationId"]});
        forkJoin([existingLocationData$,newLocationData$]).subscribe(data => {
          approvalComments["City"] = data[0]["data"]["cityName"] + " -> " + data[1]["data"]["cityName"];
          approvalComments["State"] = data[0]["data"]["stateName"] + " -> " + data[1]["data"]["stateName"];
          approvalComments["Country"] = data[0]["data"]["countryName"] + " -> " + data[1]["data"]["countryName"];
        });
      }
      if(existingData["specializationId"] != this.data.doctor["specializationId"]){
        let existingSpecialization$ = this._specialitiesService.getUnitSpecialityDetailsById(existingData["specializationId"]);
        let newSpecialization$ =this._specialitiesService.getUnitSpecialityDetailsById(this.data.doctor["specializationId"]);
        forkJoin([ existingSpecialization$ ,newSpecialization$]).subscribe(data => {
          approvalComments["specialization"] = data[0]["data"].label + " -> " + data[1]["data"].label;
        });
      }
      if((JSON.stringify(existingData["unitIds"])) != JSON.stringify(this.data.doctor["unitIds"])){
        let prevUnitIds = existingData["unitIds"];
        let existingUnitIds = this.data.doctor["unitIds"];
        let diffIds = diffOfTwoSTringArrays(prevUnitIds, existingUnitIds);
        if(diffIds){
            this.getUnitsList(this.data.tenantId).subscribe(data => {
            let ExistingUnitIds = existingData["unitIds"];
            let newUnitIds = this.data.doctor["unitIds"];
            let unitLists = data[0].data;
            let existingUnitNames = [];
            let newUnitNames = [];
            ExistingUnitIds.forEach(ele => {
              unitLists.forEach(unitEle =>{
                if(unitEle.id == ele){
                  existingUnitNames.push(unitEle.name)
                }
              })
            })
            newUnitIds.forEach(ele => {
              unitLists.forEach(unitEle =>{
                if(unitEle.id == ele){
                  newUnitNames.push(unitEle.name)
                }
              })
            })
            approvalComments["units"] = existingUnitNames.toString() + " -> " + newUnitNames.toString();
          });
        }  
      }

    }
    this.approvalComments = approvalComments;
    this.initFormGroup(this.data.doctor);

  }

  getUnitsList(tenantId) {
    let unitLists$ = this._unitsService.getUnitsLists(tenantId);
    return forkJoin([unitLists$]);
  }
  

  initFormGroup(obj) {
    const emailRegEx = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$';
    const attachments = obj.attachments || "";
    const name = obj.name || '';
    const email = obj.email || '';
    const contactDetails = obj.contactDetails || '';
    const designation = obj.designation || '';
    const speciality = obj.speciality || '';
    const specialization = obj.specializationId || '';
    const qualification = obj.qualification || '';
    const consultingHospital = obj.unitIds || '';
    this.address = {
      address1: obj.address1 || "",
      address2: obj.address2 || "",
      pincode: obj.pincode || "",
    };
    this.doctorsFormGroup = this._formBuilder.group({
      email: [
        email, Validators.compose([Validators.required, Validators.pattern(emailRegEx)])
      ],
      name: [
        name, Validators.compose([Validators.required])
      ],
      attachments: [
        attachments,
      ],
      designation: [
        designation, Validators.compose([Validators.required])
      ],

      specialization: [
        specialization, Validators.compose([Validators.required])
      ],
      qualification: [
        qualification, Validators.compose([Validators.required])
      ],
      consultingHospital: [
        consultingHospital, Validators.compose([Validators.required])
      ]
    });
    this.attachmentIds = obj.attachmentIds;
  }

  onAddDoctor(form) {
    let payload = form.value;
    this.address = this.AddressComponent.value;
    payload = {
      ...this.address,
      "designation": payload.designation,
      "email": payload.email,
      "name": payload.name,
      "qualification": payload.qualification,
      "specializationId": payload.specialization,
      "tenantId": this.tenantId ? this.tenantId : null,
      "unitIds": payload.consultingHospital,
      "locationId": this.address.city,
      'phone': '',
      "doctorStatus": "PENDING",
      "attachmentIds": this.attachmentIds,
      "roles":this.roles,
    };

    if (this.showApproveButton) {
      payload["approvalId"] = this.approvalId;
      payload["statusForUpdate"] = 'put';
      this.store.dispatch(
        new ActionApproveUnitDoctor({
          value: payload
        })
      );
    } else {
      if (this.data.statusForUpdate == 'post') {
        this.store.dispatch(
          new ActionAddDoctors({
            value: payload
          })
        );
      } else {
        payload["id"] = this.data.doctor.id;
        this.store.dispatch(
          new ActionUpdateDoctors({
            value: payload
          })
        );
      }
    }
  }

  handleAddressChanges($event) {
    this.address = $event;
  }

  handleFileUpload(evt) {
    if (evt.status === "UPLOAD_SUCCESSFULL") {
      this.attachmentIds = evt.attachmentIds;
      this.uploadStatus = true;
    }
  }

  handleAddDoctorsSuccess(action) {
    this.dialogRef.close({
      result: true
    });
    if(this.roles[0].indexOf("SUPER_ADMIN") >= 0){
      this.openSnackBar("Doctor detail saved successfully, sent for approval.");
    }else{
      this.openSnackBar("Doctor detail saved successfully.");
    }  
  }

  handleUpdateDoctorsSuccess(action) {
    this.dialogRef.close({
      result: true
    });
    if(this.roles[0].indexOf("SUPER_ADMIN") >= 0){
      this.openSnackBar("Doctor detail updated successfully, sent for approval.");
    }else{
      this.openSnackBar("Doctor detail updated successfully");
    }   
  }

  handleApproveDoctorSuccess(action) {
    this.showApproveButton = false;
    this.dialogRef.close({
      result: true
    });
    this.openSnackBar("Doctor detail Approved successfully");
    this.router.navigate(['/home/business/approvals/list']);
  }

  onKeyChange(form) {
    if (form.value.consultingHospital.length > 0) {
      this.getSepecializations(form.value.consultingHospital);
    }else{
        form.value.specialization = "";
        this.selectedSpecializationLists = [];
    }
  }

  onReject() {
    this.router.navigate(['/home/business/approvals/list']);
  }

  getSepecializations(unitIds) {
    this.store.dispatch(
      new ActionGetSpecialitiesCurrentClient(
        {
          tenantId: this.tenantId,
          unitIds: unitIds
        }
      )
    );
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: 3000
    });
  }

  rejectApproval(){
    if (this.showApproveButton) {
      let rejChange = this.approvalstate.currentApproval; 
      this.store.dispatch(new ActionRejectApprovals({
        ...rejChange
      }));
    }
  }

  rejectApprovalsSuccessHandler(action){
    this.showApproveButton = false;
    this.dialogRef.close({
      result: true
    });
    this.openSnackBar("Doctor detail rejected successfully.");
    this.router.navigate(['/home/business/approvals/list']);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}