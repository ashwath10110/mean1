import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';

import { takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { State } from '@app/state/home/home.state';

import { MatDialog } from '@angular/material';
// import { EditUserComponent } from '../edit-user/edit-user.component';
import { selectUsers } from '@app/state/users/users.selectors';
import { ActionProceedToPartners } from '@app/state/details/details.actions';
import {  UsersActionTypes, ActionGetUsers, ActionAddMoreUser, ActionGetUsersSuccess, ActionDeleteUserSuccess, ActionDeleteUser, ActionUnitMappingUserByUserId, ActionUnitMappingUserByUserIdSuccess } from '@app/state/users/users.actions';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { isObjectEmpty } from '@app/common/utils/obj-utils';
import { selectUnits } from '@app/state/units/units.selectors';
import { MessageModalComponent } from '@app/common/message-modal/message-modal.component';
import { ActionGetTenantUnits } from '@app/state/units/units.actions';

@Component({
  selector: 'app-all-users-list',
  templateUrl: './all-users-list.component.html',
  styleUrls: ['./all-users-list.component.css']
})
export class AllUsersListComponent implements OnInit {

  private unsubscribe$: Subject<void> = new Subject<void>();

  state;

  breadCrumbs = [];

  sub: any;
  tenantId: any;
  userId:any;
  statusForUpdate: any;
  editUserData: any;
  unitsList: any = [];


  constructor(
    public store: Store<State>,
    private updates$: Actions,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.sub = this.route.parent.params.subscribe(params => {
      this.tenantId = params["id"];
    });

    if(!this.tenantId){
      this.tenantId = 'currentClient';
    }
  
    // Action to get Tenant Units.

    this.store.dispatch(
      new ActionGetTenantUnits({
        tenantId: this.tenantId
      })
    );
  }

  ngOnInit() {
    // Store Fetch states

    this.store
      .pipe(select(selectUsers), takeUntil(this.unsubscribe$))
      .subscribe((state: any) => {
        this.state = state;
      });
    this.store
      .pipe(select(selectUnits), takeUntil(this.unsubscribe$))
      .subscribe((tenantData: any) => {
        this.unitsList = tenantData.unitsList;
      });

  // Action Dispatcher .. 
    this.store.dispatch(
      new ActionGetUsers({
        tenantId: this.tenantId,
      })
    );
   
    this.initEffects();
  }

  initEffects() {
    // Action Success Listeners..

    // User Success
    this.updates$.pipe(
      takeUntil(this.unsubscribe$),
      ofType<ActionGetUsersSuccess>(UsersActionTypes.GET_USERS_SUCCESS),
      tap(action =>
        this.handleGetUsersSuccess(action)
      )
    ).subscribe();

  // Add MOre User
    this.updates$.pipe(
      takeUntil(this.unsubscribe$),
      ofType<ActionAddMoreUser>(UsersActionTypes.ADD_MORE_USERS),
      tap(action =>
        this.handleAddMoreUsers(action)
      )
    ).subscribe();

  // GEt Mapping Details By User ID
    this.updates$.pipe(
      takeUntil(this.unsubscribe$),
      ofType<ActionUnitMappingUserByUserIdSuccess>(UsersActionTypes.GET_USERS_UNIT_MAPPING_BY_USERID_SUCCESS),
      tap(action =>
        this.handleUserUnitMappingByUserIdSuccess(action)
      )
    ).subscribe();
  }

// Action Success Handler Methods...
 
  handleAddMoreUsers(action) {
    this.addUser();
  }

  handleGetUsersSuccess(action) {
    const userData = action.payload.data;
    if (isObjectEmpty(userData)) {
      this.statusForUpdate = "post";
    } else {
      this.statusForUpdate = "put";
    }
  }
  handleUserUnitMappingByUserIdSuccess(action){
    const mappingData = action.payload.data;
      this.editUserData = {
        ...this.editUserData,
        scopes: mappingData.data,
      };
      console.log('isFromOrgTree', action.payload.isFromOrgTree)
      if(!action.payload.isFromOrgTree){
        this.handleEditUserModal(this.editUserData);
      }
  }

  // Add USER

  addUser() {
    const dialogRef = this.dialog.open(EditUserComponent, {
      width: '800px',
      data: {
        user: {},
        status: 'new',
        unitsList: this.unitsList,
        tenaeditUserDatantId: this.tenantId? this.tenantId: 'currentClient',
        statusForUpdate: 'post'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.store.dispatch(
        new ActionGetUsers({
          tenantId: this.tenantId,
        })
      );
    });
  }

// EDIT USER 
  handleEditUser(event) {
    console.log(event, 'edit user');
    this.store.dispatch(
      new ActionUnitMappingUserByUserId({
        tenantId: this.tenantId,
        userId: event.id,
        isFromOrgTree: false
      })
    );
    this.editUserData =  event;
  }

// EDIT USER MODAL..
  handleEditUserModal(user){
    const dialogRef = this.dialog.open(EditUserComponent, {
      width: '800px',
      data: {
        user: user,
        status: 'edit',
        unitsList: this.unitsList,
        tenantId: this.tenantId,
        statusForUpdate: 'put',
      }
    });
    dialogRef.afterClosed().subscribe(result => {
    //   this.store.dispatch(
    //     new ActionGetUsersByUnitId({ unitId: this.unitId, tenantId: this.tenantId })
    //   );
     });
  }

  proceedToPartners() {
    this.store.dispatch(
      new ActionProceedToPartners({ tenantId: this.tenantId })
    );
  }

// DELETE 
  handleDeleteUser(event) {
    const dialogRef = this.dialog.open(MessageModalComponent, {
      width: '300px',
      data: {
        name: "deleteUser",
        data: {
          user: event
        }
      }
    });
   this.userId = event.id;
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.status) {
        if (result.message == "success") { 
          this.store.dispatch(
            new ActionDeleteUser({ tenantId: this.tenantId, userId:this.userId})
          );
          this.updates$.pipe(
            ofType<ActionDeleteUserSuccess>(UsersActionTypes.DELETE_USER_SUCCESS),
            tap(action =>
              this.handleDeleteUserSuccess(action)
            )
          ).subscribe();
        }
      }
      else if (result && !result.status) {
        if (result.message == "cancel") {
          //  this.router.navigate(['home/business/clients-list/']);
        }
      }
    });

  }

  handleDeleteUserSuccess(obj) {
    this.store.dispatch(
      new ActionGetUsers({ tenantId: this.tenantId })
    );
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
