

import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { takeUntil, tap, take } from 'rxjs/operators';
import { State } from '@app/state/home/home.state';

import { MatDialog } from '@angular/material';
import { AppState, selectAuthState } from '@app/core';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  roles = [];

  private unsubscribe$: Subject<void> = new Subject<void>();
  @Input() users: any;

  @Output() deleteUser: EventEmitter<any> = new EventEmitter();

  @Output() editUser: EventEmitter<any> = new EventEmitter();

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    public store: Store<State>

  ) { }

  ngOnInit() {
    this.store.pipe(select(selectAuthState), takeUntil(this.unsubscribe$))
    .subscribe((state: any) => {
      if(state.user.data.roles)
      this.roles.push(state.user.data.roles);
    });
  }

  editUserFn(user){
    this.editUser.emit(user);
  }

  deleteUserFn(user){
    this.deleteUser.emit(user);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
