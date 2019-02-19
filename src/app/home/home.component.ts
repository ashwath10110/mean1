import { Store, select } from '@ngrx/store';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActivationEnd, Router, ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { filter, takeUntil, map } from 'rxjs/operators';

import { routeAnimations, TitleService, ActionAuthLogout, selectAuth, selectAuthState } from '@app/core';
import { MediaMatcher } from '@angular/cdk/layout';

import { ChangeDetectorRef } from '@angular/core';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

import { fromEvent, merge, of } from 'rxjs';
import { mapTo } from 'rxjs/operators';
import { selectClientOnboarding } from '@app/state/client-onboarding/client-onboarding.selectors';
import { State } from '@app/state/home/home.state';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [routeAnimations]
})
export class HomeContainerComponent implements OnInit, OnDestroy {

  private unsubscribe$: Subject<void> = new Subject<void>();
  private isAuthenticated$: Observable<boolean>;

  color = 'primary';
  mode = 'determinate';
  value = 50;
  bufferValue = 75;

  mobileQuery: MediaQueryList;
  dir = 'ltr';
  green: boolean;
  blue: boolean;
  dark: boolean;
  minisidebar: boolean;
  boxed: boolean;
  danger: boolean;
  showHide: boolean;
  sidebarOpened;
  tenantId: string;

  public config: PerfectScrollbarConfigInterface = {};
  private _mobileQueryListener: () => void;
  online$: Observable<boolean>;

  orgChartState: any;
  tenantLevelData: any;

  constructor(
    private store: Store<State>,
    private router: Router,
    private titleService: TitleService,
    private actRoute: ActivatedRoute,
    private translate: TranslateService,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher
  ) {
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.online$ = merge(
      of(navigator.onLine),
      fromEvent(window, 'online').pipe(mapTo(true)),
      fromEvent(window, 'offline').pipe(mapTo(false))
    );
  }

  ngOnInit(): void {
    this.translate.setDefaultLang('en');
    this.subscribeToSettings();
    this.subscribeToRouterEvents();
    this.store
      .pipe(select(selectClientOnboarding), takeUntil(this.unsubscribe$))
      .subscribe((orgChartState: any) => {
        this.orgChartState = orgChartState;
      }); 
  }

  handleHeaderUpdates(event) {
    this.store.dispatch(new ActionAuthLogout());
  }

  handleSidebarUpdates(event) {
    const url = event.value.route;
    this.router.navigateByUrl(url);
  }

  handleClick(event) {
    this.router.navigate(['home']);
  }

  ngAfterViewInit() { }

  private subscribeToSettings() { }

  private subscribeToRouterEvents() {
    this.titleService.setTitle(
      this.router.routerState.snapshot.root,
      this.translate
    );
    this.router.events
      .pipe(
        filter(event => event instanceof ActivationEnd),
        map((event: ActivationEnd) => event.snapshot),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(snapshot =>
        this.titleService.setTitle(snapshot, this.translate)
      );
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
