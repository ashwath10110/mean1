import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AppState, selectAuthState } from '@app/core';
import { currentclient } from 'api-config';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  isAuthenticated: boolean;
  loading: boolean;

  getState: any;
  errorMessage: string | null;

  state: any;
  roles = [];

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    private store: Store<AppState>,
    private router: Router,
  ) {
    this.getState = this.store.pipe(select(selectAuthState), takeUntil(this.unsubscribe$));
  }

  ngOnInit() {
    this.getState
      .subscribe((state) => {
        this.errorMessage = state.errorMessage;
        this.isAuthenticated = state.isAuthenticated;
        this.state = state;
        
        if (state && state.user && state.user.data && state.user.data.roles) {
          this.roles = state.user.data.roles;
          this.loading = state.loading;
          const url = 'home/business/client-view/56fe021c-5dae-4399-8135-e18115dc4fa3/contract';
          // this.router.navigate([url]);
        }
      });
  }

  hasRole(role) {
    return this.roles.indexOf(role) >= 0
  }

  onOrgtreeClick() {
    const tenantId = this.state.user.data.tenantId;
    const isAdmin = this.state.user.data.roles.indexOf('ADMINISTRATOR') !== -1;
    const keyId =  isAdmin ? 'currentClient': tenantId;

    this.router.navigate(['/home/business/hospital-info/' + keyId]);
  }

  onAgenciesClick() {
    const url = '/home/client/client-users';
    this.router.navigate([url]);
  }

  onClientsClick() {
    this.router.navigate(['/home/business/clients-list']);
  }

  onApprovalsClick() {
    this.router.navigate(['/home/business/approvals/list']);
  }

  onHomeClick() {
    this.router.navigate(['/home/welcome']);
  }

  onTroubleShootClick() {
    this.router.navigate(['/home/troubleshoot']);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
