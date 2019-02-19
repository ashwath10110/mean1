import { Component, OnInit, Inject } from '@angular/core';
import { Subject } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Store, select } from '@ngrx/store';

import { Router } from '@angular/router';
import { ofType, Actions } from '@ngrx/effects';

import { tap, takeUntil } from 'rxjs/operators';
import { State } from '@app/state/home/home.state';
import { ClientOnboardingActionTypes, ActionCreateTenant, ActionCreateTenantSuccess } from '@app/state/client-onboarding/client-onboarding.actions';

import { selectClientOnboarding } from '@app/state/client-onboarding/client-onboarding.selectors';

@Component({
  selector: 'app-new-client',
  templateUrl: './new-client.component.html',
  styleUrls: ['./new-client.component.css']
})
export class NewClientComponent {

  private unsubscribe$: Subject<void> = new Subject<void>();

  initialized;
  stocks;

  constructor(
    public dialogRef: MatDialogRef<NewClientComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public store: Store<State>,
    private updates$: Actions,
    private router: Router
  ) {
    this.updates$.pipe(
      ofType<ActionCreateTenantSuccess>(ClientOnboardingActionTypes.UPDATE_CLIENT_INFO_DATA_SUCCESS),
      tap(action =>
        this.handleCreateTenantSuccess(action)
      )
    ).subscribe();

    this.store
      .pipe(select(selectClientOnboarding), takeUntil(this.unsubscribe$))
      .subscribe((stocks: any) => {
        this.stocks = stocks;
      });
  }

  handleCreateTenantSuccess(action) {
    const id = action.payload.data.id;
    // this.store.dispatch(
    //   new ActionSetClientName({
    //     value: id
    //   })
    // );
    this.dialogRef.close({
      status: true,
      tenantId: id
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  handleUpdates(event) {
    if (event.name == "update-client-info") {
      this.store.dispatch(
        new ActionCreateTenant({
          value: event.value
        })
      );
    }
  }

}