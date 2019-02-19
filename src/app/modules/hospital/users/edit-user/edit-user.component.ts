import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, Inject } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil, tap, take } from 'rxjs/operators';
import { Actions, ofType } from '@ngrx/effects';

import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { selectHomeState, State } from '@app/state/home/home.state';
import { UsersActionTypes, ActionUpdateUserSuccess, ActionUpdateUser, ActionUnitMappingUser, ActionUnitMappingUserSuccess, ActionUnitMappingUserByUserIdSuccess, ActionUnitMappingUserByUserId, ActionApproveUsersData, ActionApproveUsersDataSuccess } from '@app/state/users/users.actions';

import { isObjectEmpty } from '@app/utils/obj-utils';
import { userRoles } from 'api-config';
import { ApprovalsService } from '@app/state/approvals/approvals.service';
import { ActionRejectApprovals, ActionRejectApprovalsSuccess, ApprovalsActionTypes } from '@app/state/approvals/approvals.actions';

@Component({
  selector: 'anms-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  private unsubscribe$: Subject<void> = new Subject<void>();
  obj;
  statusForUpdate = '';
  tenantId = '';
  unitsList = [];

  roles = userRoles;

  public userForm: FormGroup;

  state;
  user = {};
  routeName: any;
  currentApproval: any;
  showApproveButton: any;
  isDisabled: boolean = false;

  approvalComments = {};

  approvalPayload: any;

  @Output()
  updates: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private formBuilder: FormBuilder,
    public store: Store<State>,
    private updates$: Actions,
    public dialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private approvalsService: ApprovalsService
  ) {
    this.store
      .pipe(select(selectHomeState), takeUntil(this.unsubscribe$))
      .subscribe((state: any) => {
        this.state = state.client;
      });



    console.log(this.data);
    this.unitsList = this.data.unitsList;
    console.log(this.unitsList);
    this.tenantId = this.data.tenantId;
    this.approvalPayload = this.data.user.approvalPayload;

    this.user = this.data.user;
    this.approvalComments = this.data.user.approvalComments;
    this.showApproveButton = this.data.showApproveButton;
    //this.isDisabled = this.data.user.status === 'ACTIVE';

    if (this.showApproveButton) {
      this.updates$.pipe(
        takeUntil(this.unsubscribe$),
        ofType<ActionRejectApprovalsSuccess>(ApprovalsActionTypes.REJECT_APPROVAL_SUCCESS),
        tap(action =>
          this.rejectApprovalsSuccessHandler(action)
        )
      ).subscribe();
      this.tenantId = this.data.user.tenantId;
    }

    if (this.data.status == "new") {
      this.initFormGroup({});
    }
    else if (this.data.status == "edit") {
      console.log(this.data, 'data');
      this.initFormGroup(this.user);
    }

    this.statusForUpdate = this.data.statusForUpdate;
  }

  ngOnInit() {
    this.updates$.pipe(
      ofType<ActionUpdateUserSuccess>(UsersActionTypes.UPDATE_USER_SUCCESS),
      tap(action =>
        this.handleUserSuccess(action)
      )
    ).subscribe();

    this.updates$.pipe(
      ofType<ActionApproveUsersDataSuccess>(UsersActionTypes.APPROVE_USERS_DATA_SUCCESS),
      tap(action =>
        this.handleApproveUsersDataSuccess(action)
      )
    ).subscribe();
  }

  initFormGroup(obj) {
    console.log(obj);
    let someArray = [];
    const firstName = obj.firstName || '';
    const middleName = obj.middleName || '';
    const lastName = obj.lastName || '';
    const username = obj.username || '';

    const email = obj.email || '';

    const designation = obj.designation || '';
    const reportsTo = obj.reportsTo || '';

    const primaryPhone = obj.primaryPhone || '';
    const alternatePhone = obj.alternatePhone || '';
    const emailRegEx = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$';
    const phoneRegEx = '^[0-9]{10}$';

    if (isObjectEmpty(obj)) {
      this.statusForUpdate = "post";
    }
    else {
      this.statusForUpdate = "put";
    }
    if (this.data.status === 'edit') {
      someArray = !(this.showApproveButton) ? this.setUserMappingsForEditMode(obj) : this.setUserMappingsForApprovals(obj);
      this.isDisabled = true;
    }


    this.userForm = this.formBuilder.group({
      firstName: [
        firstName,
        Validators.compose([Validators.required])
      ],
      lastName: [
        lastName, Validators.compose([Validators.required])
      ]
      , middleName: [
        middleName
      ]
      , username: [
        { value: username, disabled: this.isDisabled }
      ]
      , reportsTo: [
        reportsTo,
        Validators.compose([Validators.required])
      ]
      , designation: [
        designation,
        Validators.compose([Validators.required])
      ],
      email: [
        { value: email, disabled: this.isDisabled },
        Validators.compose([Validators.required, Validators.pattern(emailRegEx)])
      ]
      ,
      primaryPhone: [
        primaryPhone, Validators.compose([Validators.required, Validators.pattern(phoneRegEx)])
      ]
      , alternatePhone: [
        alternatePhone, Validators.compose([Validators.pattern(phoneRegEx)])
      ],
      rolesAndScopes: this.formBuilder.array(this.getRolesAndScopes(obj))
    });

    this.obj = obj;

    this.userForm.patchValue({
      rolesAndScopes: someArray
    });

  }

  setUserMappingsForEditMode(obj) {
    let someArray = obj.scopes.map((item) => {
      return {
        unit: this.getUnit(item.unitId),
        roles: item.roles
      }
    });

    return someArray;
  }

  setUserMappingsForApprovals(obj) {
    let someArray = obj.scopes.map((item) => {
      return {
        unit: this.getUnit(item.unitId),
        roles: item.userRoles || item.roles || []
      }
    });

    return someArray;
  }

  handleApproveUsersDataSuccess(action) {

    this.dialogRef.close({
      result: true,
      isApproval: true
    });

  }

  loadDummyValidData() {
    const dummy = {
      "firstName": "First",
      "lastName": "Last",
      "middleName": "Middle",
      "username": new Date().toDateString(),
      "reportsTo": "managerx",
      "designation": "assistant",
      "email": "user@gmail.com",
      "primaryPhone": "9911991199",
      "alternatePhone": "991199119911",
      "rolesAndScopes": [
        {
          "unit": "",
          "mappingId": "",
          "roles": ["FEEDER"]
        }
      ]
    };
    this.initFormGroup(dummy);
  }

  getUnit(id) {
    if (this.unitsList.length) {
      const item = this.unitsList.find((obj) => {
        return obj.id === id;
      });
      return item;
    } else {
      return {};
    }
  }

  getRolesAndScopes(obj) {
    let scopesArray = [];
    if (obj.scopes && obj.scopes.length) {
      for (let i = 0; i < obj.scopes.length; i++) {
        scopesArray.push(this.createRow(obj.scopes[i]));
      }
      return scopesArray
    } else {
      return [this.createRow(obj)];
    }
  }

  createRow(obj): FormGroup {
    console.log(obj);
    const unit = this.getUnit(obj.unitId);
    return this.formBuilder.group({
      unit: [unit || ''],
      roles: [obj.roles || []],
      id: [obj.id || ''],
      userId: [obj.userId || '']
    });
  }

  get rolesAndScopes(): FormArray {
    return this.userForm.get('rolesAndScopes') as FormArray;
  };


  addRow(): void {
    this.rolesAndScopes.push(this.createRow({}));
  }

  onUserFormSubmit(formValue: any) {
    console.log(this.obj);
    if (this.showApproveButton) {
      const value = {
        ...this.obj,
        ...formValue.value,
        tenantId: this.tenantId,
        tenantType: "CLIENT",
      };
      const isPost = this.obj.status === 'PENDING' ? 'post' : 'put';
      const payload = {
        user: value,
        statusForUpdate: isPost
      }
      let approvalPayload = this.approvalPayload;
      this.approvalsService.bulkApprove([approvalPayload]).subscribe(s => {
        this.dialogRef.close({
          isApprove: true
        });
      });
      // this.store.dispatch(
      //   new ActionApproveUsersData({ value: payload })
      // );


    } else {
      const value = {
        ...this.obj,
        ...formValue.value,
        status: "ACTIVE",
        tenantId: this.tenantId,
        tenantType: "CLIENT",
      };
      const payload = {
        user: value,
        statusForUpdate: this.statusForUpdate
      };
      this.store.dispatch(
        new ActionUpdateUser({ value: payload })
      );
    }

  }

  handleUserSuccess(action) {
    this.dialogRef.close({
      result: true
    });
  }

  rejectChanges() {
    if (this.showApproveButton) {
      let rejChange = this.approvalPayload;
      this.store.dispatch(new ActionRejectApprovals({
        ...rejChange
      }));
    }
  }

  rejectApprovalsSuccessHandler(action){
    this.dialogRef.close({
      isApprove: true
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  deleteRow(item, index) {
    console.log(item, index);
    this.rolesAndScopes.removeAt(index);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}