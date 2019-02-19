import { ChangeDetectorRef, Component, NgZone, OnDestroy, ViewChild, HostListener, Directive, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { selectAuthState } from '@app/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { State } from '@app/state/home/home.state';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: []
})
export class AppSidebarComponent implements OnDestroy {

  public config: PerfectScrollbarConfigInterface = {};
  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  @Output()
  updates: EventEmitter<any> = new EventEmitter<any>();

  user: any;
  role: any;

  MENUITEMS = [
    {
      route: '/home/welcome',
      name: 'Welcome',
      icon: 'home',
      id: "homebtn",
      permissions: [],
      // permissions: ['PORTAL_ADMIN', 'SUPER_ADMIN', 'ADMINISTRATOR', 'TENANT_ADMIN', 'ROLE_USER']
    },
    {
      route: '/home/business/clients-list',
      name: 'Manage Clients',
      icon: 'supervisor_account',
      id: "manageClientsBtn",
      // permissions:[],
      // permissions: ['PORTAL_ADMIN', 'SUPER_ADMIN'],
      permissions: ['PORTAL_ADMIN', 'SUPER_ADMIN']
    },
    {
      route: '/home/business/hospital-info/currentClient',
      name: 'Org Chart',
      icon: 'bubble_chart',
      id: "orgChart",
      // permissions:[],
      permissions: ['ADMINISTRATOR', 'TENANT_ADMIN']
    },
    {
      route: '/home/business/all-doctors',
      name: 'All Doctors',
      icon: 'bubble_chart',
      id: "allDoctors",
      permissions: ['ADMINISTRATOR', 'TENANT_ADMIN'],
      // permissions: [],
    },
    {
      route: '/home/business/all-users',
      name: 'All Users',
      icon: 'bubble_chart',
      id: "allUsers",
      // permissions:[],
      permissions: ['ADMINISTRATOR', 'TENANT_ADMIN']
    },
    // {
    //   route: '/home/business/hospital-units',
    //   name: 'Hospital Units',
    //   icon: 'local_pharmacy',
    //   // permissions:[]
    //   permissions: ['ADMINISTRATOR', 'TENANT_ADMIN']
    // },
    {
      route: '/home/business/partners',
      name: 'Manage Partners',
      icon: 'supervisor_account',
      id: "managePartners",
      permissions: ['ADMINISTRATOR', 'TENANT_ADMIN'],
    },
    {
      route: '/home/business/approvals/list',
      name: 'Pending Approvals',
      icon: 'bubble_chart',
      id: "approvals",
      permissions: ['ADMINISTRATOR'],
    }
  ];
  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private store: Store<State>,
    private router: Router,

  ) {
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    this.store.pipe(select(selectAuthState), takeUntil(this.unsubscribe$))
      .subscribe((tenantState: any) => {
        this.user = tenantState.user.data;
        this.role = tenantState.user.data && tenantState.user.data.roles.toString();
      });
  }

  handleSideBarClick(name) {
    this.updates.emit({
      name: "sidebar",
      value: name,
      user: this.user
    });
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

}
