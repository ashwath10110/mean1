import { Component, OnInit, OnDestroy } from '@angular/core';

import { Store, select } from '@ngrx/store';

import { Actions, ofType } from '@ngrx/effects';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { takeUntil, tap, take } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { TenantsService } from '@app/state/tenants.service';
import { MessageService } from 'primeng/api';
import { State } from '@app/state/home/home.state';
import { selectUnits } from '@app/state/units/units.selectors';
import { AppState, selectAuthState } from '@app/core';
import { ActionGetTenantUnits, ActionGetTenantUnitsSuccess, UnitsActionTypes, ActionDeleteTenantUnit, ActionDeleteTenantUnitSuccess } from '@app/state/units/units.actions';
import { AddUnitComponent } from '../add-unit/add-unit.component';
import { MessageModalComponent } from '@app/common/message-modal/message-modal.component';
import { ActionGetDepartments } from '@app/state/specialities/specialities.actions';
import { ActionGetTenantDetailsSuccess, ClientsActionTypes } from '@app/state/clients/clients.actions';
import { ClientsFacade } from '@app/state/clients/clients.facade';
import { selectClients } from '@app/state/clients/clients.selectors';

@Component({
  selector: 'app-org-hierarchy',
  templateUrl: './org-tree.component.html',
  styleUrls: ['./org-tree.component.scss'],
  providers: [TenantsService, MessageService]
})
export class OrgTreeComponent implements OnInit, OnDestroy {

  sub: any;
  parentRouteId: any;

  contractType = "";
  hospitalName = "";

  breadcrumbs = [];
  roles = [];

  private unsubscribe$: Subject<void> = new Subject<void>();

  state: any;

  constructor(
    public store: Store<State>,
    private updates$: Actions,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private clientsFacade: ClientsFacade
  ) {

    this.sub = this.route.params.subscribe(params => {
      this.parentRouteId = params["id"];
      console.log(this.parentRouteId);
    });

    this.breadcrumbs = (this.parentRouteId !== 'currentClient') ? [
      {
        'label': 'Clients',
        'url': `#/home/business/clients-list`
      }, {
        'label': 'Hospital Info',
      }
    ] : [];
  }

  ngOnInit() {
    this.store
      .pipe(
        select(selectUnits),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(st => {
        this.state = st;
      });

    //Get Tenant Details
    this.clientsFacade.getTenantDetails({ tenantId: this.parentRouteId });

    this.store.dispatch(
      new ActionGetTenantUnits({ tenantId: this.parentRouteId })
    );

    this.store.dispatch(
      new ActionGetDepartments({})
    );

    this.store.pipe(select(selectAuthState), takeUntil(this.unsubscribe$))
    .subscribe((state: any) => {
      if(state.user.data.roles)
      this.roles.push(state.user.data.roles);
    });

    this.initEffects();
  }

  addNode(event) {
    const dialogRef = this.dialog.open(AddUnitComponent, {
      width: '800px',
      data: {
        tenantId: this.parentRouteId,
        parentId: event.data.id
      }
    });
    dialogRef.afterClosed()
      .subscribe(result => {
        if (result && result.status && result.sentForApproval) {
          this.handleUnitSentForApproval({});
        }
        else {
          this.handleUnitCreationSuccessful();
        }
      });
  }

  handleUnitSentForApproval(action) {
    const dialogRef = this.dialog.open(MessageModalComponent, {
      width: '300px',
      data: {
        name: "unit-sent-for-approvals",
        data: {}
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.status) { }
    });
  }

  handleUnitCreationSuccessful() {
    const dialogRef = this.dialog.open(MessageModalComponent, {
      width: '400px',
      data: {
        name: "unit-creation-successfull",
        data: {}
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.status) { }
    });
    this.store.dispatch(
      new ActionGetTenantUnits({ tenantId: this.parentRouteId })
    );
  }

  initEffects() {
    this.updates$.pipe(
      takeUntil(this.unsubscribe$),
      ofType<ActionGetTenantDetailsSuccess>(ClientsActionTypes.GET_TENANT_DETAILS_SUCCESS),
      tap(action =>
        this.handleGetTenantDetailsSuccess(action)
      )
    ).subscribe();
    this.updates$.pipe(
      takeUntil(this.unsubscribe$),
      ofType<ActionDeleteTenantUnitSuccess>(UnitsActionTypes.DELETE_TENANT_UNIT_SUCCESS),
      tap(action =>
        this.handleDeleteTenantUnitsSuccess(action)
      )
    ).subscribe();
    this.updates$.pipe(
      takeUntil(this.unsubscribe$),
      ofType<ActionGetTenantUnitsSuccess>(UnitsActionTypes.GET_TENANT_UNITS_SUCCESS),
      tap(action =>
        this.handleGetTenantUnitsSuccess(action)
      )
    ).subscribe();
  }

  handleGetTenantUnitsSuccess(action) {
    // let unitIds = [];
    // if (this.tenantLevelData.unitsList) {
    //   this.tenantLevelData.unitsList.forEach(unitId => {
    //     unitIds.push(unitId.id);
    //   });
    // }
  }

  handleDeleteTenantUnitsSuccess(action) {
    this.store.dispatch(
      new ActionGetTenantUnits({ tenantId: this.parentRouteId })
    );
  }

  handleEmptyUnitData(action) {
    const contract = action.payload[0].data[0];
    const dialogRef = this.dialog.open(MessageModalComponent, {
      width: '400px',
      data: {
        name: "one-unit",
        data: {}
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.status) {
        this.router.navigate(['home/business/unit-view/' + this.parentRouteId + '/unit-account-setup/' + contract.id]);
      }
    });
  }

  handleGetTenantDetailsSuccess(action) {
    const data = action.payload[0].data;
    this.contractType = data.type || 'SINGLE';
  }

  setupNode(event) {
    this.navigateToSetupUnit(event.data.id);
  }

  navigateToSetupUnit(unitId) {
    this.router.navigate(['home/business/unit-setup/' + this.parentRouteId + '/unit-account-setup/' + unitId]);
  }

  deleteNode($event) {
    if ($event.data.children && $event.data.children.length && !$event.data.parentId) {
      const dialogRef = this.dialog.open(MessageModalComponent, {
        width: '800px',
        data: {
          name: "delete-hospital-unit"

        }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result && result.status) {
          let unitId = $event.data.id;
        }
      });
    }
    else {
      if ($event.data.children && $event.data.children.length && $event.data.parentId) {
        const dialogRef = this.dialog.open(MessageModalComponent, {
          width: '800px',
          data: {
            name: "sub-units-exist"
          }
        });
        dialogRef.afterClosed().subscribe(result => {
          if (result && result.status) {
            let unitId = $event.data.id;
            this.store.dispatch(
              new ActionDeleteTenantUnit(
                {
                  id: unitId,
                  tenantId: this.parentRouteId
                }
              )
            );
          }
        });
      }
      else {
        const dialogRef = this.dialog.open(MessageModalComponent, {
          width: '800px',
          data: {
            name: "common-message-delete"
          }
        });
        dialogRef.afterClosed().subscribe(result => {
          if (result && result.status) {
            let unitId = $event.data.id;
            this.store.dispatch(
              new ActionDeleteTenantUnit(
                {
                  id: unitId,
                  tenantId: this.parentRouteId
                }
              )
            );
          }
        });
      }
    }
  }

  goToUnitDoctors(event) {
    this.router.navigate(['home/business/unit-view/' + this.parentRouteId + '/unit-doctors/' + event.data.id]);
  }

  goToUnitSummary(event) {
    this.router.navigate(['home/business/unit-view/' + this.parentRouteId + '/unit-summary/' + event.data.id]);
  }

  goToUnitSpecialities(event) {
    this.router.navigate(['home/business/unit-view/' + this.parentRouteId + '/unit-specialities/' + event.data.id]);
  }

  goToUnitDetails(event) {
    this.router.navigate(['home/business/unit-view/' + this.parentRouteId + '/unit-account-setup/' + event.data.id]);
  }

  goToUnitUsers(event) {
    this.router.navigate(['home/business/unit-view/' + this.parentRouteId + '/unit-users/' + event.data.id]);
  }

  goToUnitPartners(event) {
    this.router.navigate(['home/business/unit-view/' + this.parentRouteId + '/unit-partners/' + event.data.id]);

  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
