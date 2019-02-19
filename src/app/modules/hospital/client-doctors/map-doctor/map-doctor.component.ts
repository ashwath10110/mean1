import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, Inject } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil, tap, take } from 'rxjs/operators';
import { Actions, ofType } from '@ngrx/effects';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { State, selectHomeState } from '@app/state/home/home.state';
import { selectClientOnboarding } from '@app/state/client-onboarding/client-onboarding.selectors';
import { ActionAddDoctorsToUnitId, ActionAddDoctorsToUnitIdSuccess ,DoctorsActionTypes} from '@app/state/doctors/doctors.actions';

@Component({
  selector: 'anms-map-doctor',
  templateUrl: './map-doctor.component.html',
  styleUrls: ['./map-doctor.component.scss']
})
export class MapDoctorComponent implements OnInit, OnDestroy {

  usersFormGroup: FormGroup;
  private unsubscribe$: Subject < void > = new Subject < void > ();
  specialities = [];
  selectedSpecialities: any;

  orgChartState: any;
  tenantLevelData: any;
  obj = {};

  doctorsLists = [];
  doctorListHasNoUnitId = [];
  unitId = "";

  @Output()
  updates: EventEmitter < any > = new EventEmitter < any > ();

  constructor(
    private _formBuilder: FormBuilder,
    public store: Store < State > ,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private updates$: Actions,
    public dialogRef: MatDialogRef < MapDoctorComponent > ,
  ) {
    this.unitId = this.data.unitId;
  }

  ngOnInit() {
    this.store
      .pipe(select(selectHomeState), takeUntil(this.unsubscribe$))
      .subscribe((tenantLevelData: any) => {
        this.tenantLevelData = tenantLevelData.client;
        this.doctorsLists = this.tenantLevelData.doctorsList || [];
        if (this.doctorsLists) {
          for (let i = 0; i < this.doctorsLists.length; i++) {
            let currentUnitIds = this.doctorsLists[i].unitIds;
            let index = currentUnitIds.indexOf(this.unitId);
            if (index == -1) {
              this.doctorListHasNoUnitId.push(this.doctorsLists[i]);
            }
          }
        }
      });
      this.initEffects();
    this.initFormGroup();
  }



  handleUpdateDoctor(action) {
    alert('created doctor');
  }

  initEffects() {
    this.updates$.pipe(
      ofType < ActionAddDoctorsToUnitIdSuccess > (DoctorsActionTypes.ADD_DOCTORS_TO_UNIT_ID_SUCCESS),
      tap(action =>
        this.handleAddDoctorsToUnitSuccess(action)
      )
    ).subscribe();
  }


  initFormGroup() {
    this.usersFormGroup = this._formBuilder.group({
      doctors: [
        null,
        Validators.compose([Validators.required])
      ]
    });
  }

  onSubmitMapDoctor(form) {
    let payload = form.value;
    payload = {
      ...payload,
      unitId: this.unitId
    };

    this.store.dispatch(
      new ActionAddDoctorsToUnitId({
        value: payload
      })
    );
  }

  handleAddDoctorsToUnitSuccess(action) {
    this.dialogRef.close({
      result: true
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
