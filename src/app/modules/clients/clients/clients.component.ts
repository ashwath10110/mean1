import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';

import { MessageModalComponent } from '@app/common/message-modal/message-modal.component';

import { NewClientComponent } from '../new-client/new-client.component';
import { ClientsFacade } from '@app/state/clients/clients.facade';
import { takeUntil, take } from 'rxjs/operators';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit, OnDestroy {

  private unsubscribe$: Subject<void> = new Subject<void>();

  allTenants$ = this.clientsFacade.allTenants$;
  loading$ = this.clientsFacade.loading$;
  tenantsIsLoaded$ = this.clientsFacade.tenantsIsLoaded$;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private clientsFacade: ClientsFacade,
  ) { }

  ngOnInit() {
    this.tenantsIsLoaded$
      .pipe(
        take(1),
        takeUntil(this.unsubscribe$)
      ).subscribe(st => {
        if (!st) {
          this.clientsFacade.loadAllTenants();
        }
      });
  }

  deleteTenantFn(tenant) {
    this.handleDeleteClient(tenant);
  }

  viewTenantFn(tenant) {
    this.router.navigate(['home/business/client-view/' + tenant.id + '/summary']);
  }

  part2Flow(tenant) {
    this.router.navigate(['/home/business/hospital-info/' + tenant.id]);
  }

  setUpTenantFn(tenant) {
    this.router.navigate(['home/business/client-setup/' + tenant.id]);
  }

  createNewTenant(): void {
    const dialogRef = this.dialog.open(NewClientComponent, {
      width: '600px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.status) {
        this.router.navigate(['home/business/client-setup/' + result.tenantId + '/contract']);
      }
    });
  }

  handleDeleteClient(tenant) {
    const dialogRef = this.dialog.open(MessageModalComponent, {
      width: '300px',
      data: {
        name: "delete-client",
        data: tenant
      }
    });
    dialogRef
      .afterClosed()
      .subscribe(result => {
        if (result && result.status) {
          this.clientsFacade.deleteTenant({ tenantId: tenant.id });
        }
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
