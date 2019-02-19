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
import { ActionGetUsersByUnitId, ActionGetUsersByUnitIdSuccess, UsersActionTypes, ActionGetUsers, ActionAddMoreUser, ActionDeleteUnitUserMapping, ActionDeleteUnitUserMappingSuccess, ActionUnitMappingUser, ActionGetUsersDataForApprovalViewSuccess, ActionGetUsersDataForApprovalView, ActionUnitMappingUserByUserId, ActionUnitMappingUserByUserIdSuccess } from '@app/state/users/users.actions';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { isObjectEmpty } from '@app/common/utils/obj-utils';
import { selectUnits } from '@app/state/units/units.selectors';
import { MessageModalComponent } from '@app/common/message-modal/message-modal.component';
import { selectClients } from '@app/state/clients/clients.selectors';
import { ActionGetTenantUnits } from '@app/state/units/units.actions';
import { selectApprovals } from '@app/state/approvals/approvals.selectors';

@Component({
  selector: 'app-client-users',
  templateUrl: './client-users.component.html',
  styleUrls: ['./client-users.component.css']
})
export class ClientUsersComponent implements OnInit {

  private unsubscribe$: Subject<void> = new Subject<void>();

  state;

  breadCrumbs = [];

  sub: any;
  tenantId: any;
  unitId: any;
  uumid: any;

  unitList: any = [];
  usersList: any = [];

  statusForUpdate: any;
  currentApproval: any;
  showApproveButton = false;
  routeName = "";

  userData: any = {};
  modalStatus: string;

  unitState: any;
  approvalState: any;

  constructor(
    public store: Store<State>,
    private updates$: Actions,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
      this.unitId = params["unitId"];
    });
    this.sub = this.route.parent.params.subscribe(params => {
      this.tenantId = params["id"];
    });
    this.route.parent.url.subscribe(url => {
      this.routeName = url[0].path;
    });

    this.store
      .pipe(select(selectApprovals), takeUntil(this.unsubscribe$))
      .subscribe((state: any) => {
        this.currentApproval = state.currentApproval;
      });

    this.store
      .pipe(select(selectApprovals), takeUntil(this.unsubscribe$))
      .subscribe((state: any) => {
        console.log('approvalState', state);
        this.approvalState = state;
      });

    this.store
      .pipe(select(selectUsers), takeUntil(this.unsubscribe$))
      .subscribe((state: any) => {
        this.state = state;
        this.usersList = this.state.usersList;
      });

    this.store
      .pipe(select(selectUnits), takeUntil(this.unsubscribe$))
      .subscribe((unitState: any) => {
        this.unitState = unitState;
        this.unitList = unitState.unitsList;
      });

    // Unit Approve ROute condition.
    if (this.routeName == 'unit-approve') {
      this.handleApprovalRoute();
      this.updates$.pipe(
        takeUntil(this.unsubscribe$),
        ofType<ActionGetUsersDataForApprovalViewSuccess>(UsersActionTypes.GET_USERS_DATA_FOR_APPROVAL_VIEW_SUCCESS),
        tap(action =>
          this.handleGetuserDataForApprovalSuccess(action)
        )
      ).subscribe();
    }
    else {
      this.handleNonApprovalRoute();
      this.initEffects();
    }
  }

  handleApprovalRoute() {
    this.breadCrumbs = [];
    let userid = this.currentApproval.externalId;
    this.store.dispatch(
      new ActionGetUsersDataForApprovalView({
        tenantId: this.tenantId,
        userId: userid
      })
    );
  }

  handleNonApprovalRoute() {
    this.breadCrumbs = [{
      'label': 'Org Chart',
      'url': `#/home/business/hospital-info/${this.tenantId}`
    },
    {
      'label': 'Unit Details',
      'url': '#/home/business/unit-view/' + this.tenantId + '/unit-summary/' + this.unitId
    }, {
      'label': 'Unit Users'
    }];
    this.store.dispatch(
      new ActionGetTenantUnits({
        tenantId: this.tenantId
      })
    );
    this.store.dispatch(
      new ActionGetUsersByUnitId({
        tenantId: this.tenantId,
        unitId: this.unitId,
      })
    );
    this.store.dispatch(
      new ActionUnitMappingUser({
        tenantId: this.tenantId,
        unitId: this.unitId,
      })
    );
  }

  initEffects() {
    this.updates$.pipe(
      takeUntil(this.unsubscribe$),
      ofType<ActionGetUsersByUnitIdSuccess>(UsersActionTypes.GET_USERS_BY_UNIT_ID_SUCCESS),
      tap(action =>
        this.handleGetUnitUsersSuccess(action)
      )
    ).subscribe();

    this.updates$.pipe(
      takeUntil(this.unsubscribe$),
      ofType<ActionUnitMappingUserByUserIdSuccess>(UsersActionTypes.GET_USERS_UNIT_MAPPING_BY_USERID_SUCCESS),
      tap(action =>
        this.handleUserUnitMappingByUserIdSuccess(action)
      )
    ).subscribe();

    this.updates$.pipe(
      takeUntil(this.unsubscribe$),
      ofType<ActionAddMoreUser>(UsersActionTypes.ADD_MORE_USERS),
      tap(action =>
        this.handleAddMoreUsers(action)
      )
    ).subscribe();
  }


  handleGetuserDataForApprovalSuccess(action) {

    let userMappingsData = action.payload.data[0].data;
    let approvals = userMappingsData.approvals;
    // userMappingsData = userMappingsData.map(dat=>{
    //   return {
    //     ...dat,
    //   };
    // });

    let userData = action.payload.data[1].data;
    let unitsData = action.payload.data[2].data;
    let approvalObj = approvals.filter(appr => {
      return appr.approvalId === this.currentApproval.id;
    })[0];
    this.unitList = unitsData;
    let exist = approvalObj.scopes;
    exist = exist.map(dat => {
      return {
        ...dat,
        roles: dat.userRoles,
        rolesAndScopes: dat.userRoles
      };
    });
    this.showApproveButton = true;
    let approvalComments = {};
    approvalComments['old Roles'] = '';
    userMappingsData.scopes.forEach(obj => {
      let roles = obj.roles || obj.userRoles || [];
      let unitId = obj.unitId;
      let unitName = this.unitList.filter(unit=>{
        return unit.id === unitId;
      })[0].name;
      approvalComments[unitName] = roles.join(', ');
      // roles.forEach(role => {
      //   approvalComments['Role: '] = role;
      // });
    });
    // approvalComments['New Roles'] = '';
    // exist.forEach(obj => {
    //   obj.roles.forEach(role => {
    //     approvalComments['Role: '] = role;
    //   });
    // });

    let user = {
      // ...user,
      ...this.currentApproval,
      ...userData,
      scopes: approvalObj.scopes,
      rolesAndScopes: approvalObj.scopes,
      units: this.unitList,
      approvalComments: approvalComments
    };
    setTimeout(() => {
      user['approvalPayload'] = this.currentApproval;
      this.handleEditUserModal(user);
    }, 300);

  }

  proceedNext() {
    if (this.routeName == 'unit-setup') {
      this.router.navigate(['home/business/unit-setup/' + this.tenantId + '/unit-partners/' + this.unitId]);
    }
    else if (this.routeName == 'unit-view') {
      this.router.navigate(['home/business/unit-view/' + this.tenantId + '/unit-summary/' + this.unitId]);
    }
  }

  handleAddMoreUsers(action) {
    this.addUser();
  }

  handleGetUnitUsersSuccess(action) {
    const unitUserData = action.payload.data;
    if (isObjectEmpty(unitUserData)) {
      this.statusForUpdate = "post";
    } else {
      this.statusForUpdate = "put";
    }
  }

  handleUserUnitMappingByUserIdSuccess(action) {
    console.log(action);
    const mappingData = action.payload.data;
    if (mappingData.data.length === 0 && this.routeName === 'unit-approve') {
      this.userData = {
        ...this.userData,
      }
    } else {
      this.userData = {
        ...this.userData,
        scopes: mappingData.data,
      }
    }

    if (action.payload.isFromOrgTree) {
      this.handleEditUserModal(this.userData);
    }

  }

  addUser() {
    const unitListForUsers = this.getChildUnitsList(this.unitList, this.unitId, this.unitState.orgData);
    const dialogRef = this.dialog.open(EditUserComponent, {
      width: '800px',
      data: {
        user: {},
        status: 'new',
        // unitsList: this.unitList,
        unitsList: unitListForUsers,
        showApproveButton: this.showApproveButton,
        unitId: this.unitId,
        tenantId: this.tenantId,
        statusForUpdate: 'post'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.store.dispatch(
        new ActionUnitMappingUser({ unitId: this.unitId, tenantId: this.tenantId })
      );
    });
  }

  handleEditUserModal(user) {
    const unitListForUsers = this.getChildUnitsList(this.unitList, this.unitId, this.unitState.orgData);
    const dialogRef = this.dialog.open(EditUserComponent, {
      width: '800px',
      data: {
        user: user,
        status: 'edit',
        // unitsList: this.unitList,
        unitsList: unitListForUsers,
        showApproveButton: this.showApproveButton,
        unitId: this.unitId,
        tenantId: this.tenantId,
        statusForUpdate: 'put',
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.isApprove) {
        this.router.navigate(['/home/business/approvals/list']);
      } else {
        this.store.dispatch(
          new ActionUnitMappingUser({ unitId: this.unitId, tenantId: this.tenantId })
        );
      }
    });
  }

  handleEditUser(event) {
    console.log(event);
    this.store.dispatch(
      new ActionUnitMappingUserByUserId({
        tenantId: this.tenantId,
        userId: event.id,
        isFromOrgTree: true
      })
    );
    this.userData = event;
  }

  getChildUnitsList(unitList, unitId, unitsListTree) {

    //Algorithm to get child nodes only. (Breadth first search algorithm on a tree should do the trick).
    return unitList;
  }

  allDescendants(node) {
    node.children = node.children || [];
    for (var i = 0; i < node.children.length; i++) {
      var child = node.children[i];
      this.allDescendants(child);
      this.doSomethingToNode(child);
    }
  }

  doSomethingToNode(child) {
    console.log(child);
  }

  proceedToPartners() {
    this.store.dispatch(
      new ActionProceedToPartners({ unitId: this.unitId, tenantId: this.tenantId })
    );
  }

  handleDeleteUnitUserMap(event) {
    const dialogRef = this.dialog.open(MessageModalComponent, {
      width: '300px',
      data: {
        name: "deleteUnitUserMap",
        data: {
          user: event
        }
      }
    });
    this.uumid = event.id;
    let userId = event.userId;

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.status) {
        if (result.message == "success") {
          this.store.dispatch(
            new ActionDeleteUnitUserMapping({ unitId: this.unitId, tenantId: this.tenantId, uumid: this.uumid, userId: userId })
          );
          this.updates$.pipe(
            ofType<ActionDeleteUnitUserMappingSuccess>(UsersActionTypes.DELETE_UNIT_USER_MAP_SUCCESS),
            tap(action =>
              this.handleDeleteUnitUserSuccess(action)
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
  handleDeleteUnitUserSuccess(obj) {
    this.store.dispatch(
      new ActionUnitMappingUser({ unitId: this.unitId, tenantId: this.tenantId })
    );
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
