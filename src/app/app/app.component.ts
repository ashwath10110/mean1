import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { environment as env } from '@env/environment';

import { Router } from '@angular/router';
import { routeAnimations, AppState, LocalStorageService, selectAuthState, GetUser, ActionAuthLogout, selectAuth } from '@app/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routeAnimations]
})
export class AppComponent implements OnInit, OnDestroy {
  
  private unsubscribe$: Subject<void> = new Subject<void>();
  @HostBinding('class') componentCssClass;

  isProd = env.production;
  envName = env.envName;
  
  isAuthenticated: boolean;
  isHeaderSticky: boolean;
  loading: boolean;

  getState: any;
  errorMessage: string | null;

  APP_PREFIX = 'medbud-';

  constructor(
    public overlayContainer: OverlayContainer,
    private store: Store<AppState>,
    private router: Router,
    private localStorageService: LocalStorageService,
  ) {
    this.getState = this.store.select(selectAuthState);
  }

  ngOnInit(): void {
    const token = this.localStorageService.getItem('token');
    if (token) {
      this.store.dispatch(new GetUser({}));
      this.router.navigate(['/']);
    }
    else {
      // this.router.navigate(['/login']);
    }
  }

  onLogoutClick() {
    this.store.dispatch(new ActionAuthLogout());
  }

  private subscribeToIsAuthenticated() {
    this.store
      .pipe(select(selectAuth), takeUntil(this.unsubscribe$))
      .subscribe(auth => (this.isAuthenticated = auth.isAuthenticated));
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
