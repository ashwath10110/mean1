import { Component, Output, EventEmitter } from '@angular/core';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { selectAuthState } from '@app/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { State, selectHomeState } from '@app/state/home/home.state';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class AppHeaderComponent {
  
  private unsubscribe$: Subject<void> = new Subject<void>();
  user: any;
  
  @Output() updates: EventEmitter<any> = new EventEmitter<any>();
  
  constructor(
    private store: Store<State>,
    private router: Router,) { 
    this.store.pipe(select(selectAuthState), takeUntil(this.unsubscribe$))
    .subscribe((tenantState: any) => {
        this.user = tenantState.user.data;
    });
  }

  logout(event) {
    this.updates.emit({
      name: "logout",
      value: {}
    });
  }

  onClickProfile(event: Event) {
    this.router.navigate(['/user']);
  }

  public config: PerfectScrollbarConfigInterface = {};
  // This is for Notifications
  notifications: Object[] = [{
    round: 'round-danger',
    icon: 'ti-link',
    title: 'Launch Admin',
    subject: 'Just see the my new admin!',
    time: '9:30 AM'
  }, {
    round: 'round-success',
    icon: 'ti-calendar',
    title: 'Event today',
    subject: 'Just a reminder that you have event',
    time: '9:10 AM'
  }, {
    round: 'round-info',
    icon: 'ti-settings',
    title: 'Settings',
    subject: 'You can customize this template as you want',
    time: '9:08 AM'
  }, {
    round: 'round-primary',
    icon: 'ti-user',
    title: 'Pavan kumar',
    subject: 'Just see the my admin!',
    time: '9:00 AM'
  }];

  // This is for Mymessages
  mymessages: Object[] = [{
    useravatar: 'assets/images/users/1.png',
    status: 'online',
    from: 'Pavan kumar',
    subject: 'Just see the my admin!',
    time: '9:30 AM'
  }, {
    useravatar: 'assets/images/users/2.jpg',
    status: 'busy',
    from: 'Sonu Nigam',
    subject: 'I have sung a song! See you at',
    time: '9:10 AM'
  }, {
    useravatar: 'assets/images/users/2.jpg',
    status: 'away',
    from: 'Arijit Sinh',
    subject: 'I am a singer!',
    time: '9:08 AM'
  }, {
    useravatar: 'assets/images/users/4.jpg',
    status: 'offline',
    from: 'Pavan kumar',
    subject: 'Just see the my admin!',
    time: '9:00 AM'
  }];
}


//