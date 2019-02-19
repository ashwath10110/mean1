import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';

import { Actions, ofType } from '@ngrx/effects';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { State } from '@app/state/home/home.state';
import { ActionCreateTenantUnitSuccess, UnitsActionTypes, ActionCreateTenantUnit } from '@app/state/units/units.actions';
import { selectUnits } from '@app/state/units/units.selectors';

@Component({
  selector: 'app-add-unit',
  templateUrl: './add-unit.component.html',
  styleUrls: ['./add-unit.component.css']
})
export class AddUnitComponent implements OnInit {

  private unsubscribe$: Subject<void> = new Subject<void>();

  orgChartFormGroup: FormGroup;
  parentId: any;
  state: any;
  tenantId: any;
  isFunctional = true;

  constructor(
    public dialogRef: MatDialogRef<AddUnitComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public store: Store<State>,
    private updates$: Actions,
    private _formBuilder: FormBuilder,
  ) {
    this.parentId = this.data.parentId;
    this.tenantId = this.data.tenantId;

  }

  ngOnInit() {
    this.store
      .pipe(select(selectUnits), takeUntil(this.unsubscribe$))
      .subscribe((state: any) => {
        this.state = state.client;
      });
    this.orgChartFormGroup = this._formBuilder.group({
      name: [
        name,
        Validators.compose([Validators.required])
      ],
      isFunctional: [
        false,
      ],
      cin: [
        "",
        Validators.compose([Validators.pattern('^([L|U]{1})([0-9]{5})([A-Za-z]{2})([0-9]{4})([A-Za-z]{3})([0-9]{6})$')])
      ],
      gstin: [
        "",
        Validators.compose([Validators.pattern('^([0][1-9]|[1-2][0-9]|[3][0-5])([a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}[zZ]{1}[0-9a-zA-Z]{1})+$')])
      ],
      pan: [
        "",
        Validators.compose([Validators.pattern('^([A-Za-z]{5})([0-9]{4})([A-Za-z]{1})$')])
      ],
    });
    this.initEffects();
  }

  initEffects() {
    this.updates$.pipe(
      ofType<ActionCreateTenantUnitSuccess>(UnitsActionTypes.CREATE_TENANT_UNIT_SUCCESS),
      tap(action =>
        this.handleCreateTenantUnitSuccess(action)
      )
    ).subscribe();
  }

  onSubmitOrgChart(event) {
    const formValue = event.value;
    const unit = {
      ...formValue,
      tenantId: this.tenantId,
      parentId: this.parentId,
      unitStatus: "ACTIVE",
      statusForUpdate: 'post',
    };
    this.store.dispatch(
      new ActionCreateTenantUnit({
        value: unit
      })
    );
  }

  handleCreateTenantUnitSuccess(e) {
    const unitId = e.payload.data.id;
    if (e.payload.data.status === 'CURRENT') {
      this.dialogRef.close({
        status: true,
        unitId: unitId,
        sentForApproval: false
      });
    }
    else if (e.payload.data.status === 'PENDING') {
      this.dialogRef.close({
        status: true,
        unitId: unitId,
        sentForApproval: true
      });
    }
    else {
      this.dialogRef.close({
        status: true,
        unitId: unitId
      });
    }
  }

  onNoClick(): void {
    this.dialogRef.close({
      status: false
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
