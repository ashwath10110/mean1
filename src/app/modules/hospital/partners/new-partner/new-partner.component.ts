import { Component, OnInit, Inject } from '@angular/core';
import { Subject } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Store, select } from '@ngrx/store';

import { Router } from '@angular/router';
import { ofType, Actions } from '@ngrx/effects';

import { tap, takeUntil } from 'rxjs/operators';
import { State, selectHomeState } from '@app/state/home/home.state';
import * as  PartnersActions  from '@app/state/partners/partners.actions';
import { selectPartners } from '@app/state/partners/partners.selectors';

@Component({
    selector: 'anms-new-partner',
    templateUrl: './new-partner.component.html',
    styleUrls: ['./new-partner.component.scss']
  })

  export class NewPartnerComponent {

    private unsubscribe$: Subject<void> = new Subject<void>();
    initialized;
    stocks;
    tenantId;
    
    constructor(
        public dialogRef: MatDialogRef<NewPartnerComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public store: Store<State>,
        private updates$: Actions,
        private router: Router
      ){

        this.updates$.pipe(
          ofType<PartnersActions.ActionCreatePartnerSuccess>(PartnersActions.PartnersActionTypes.CREATE_PARTNER_SUCCESS),
          tap(action =>
                this.handleCreatePartnerSuccess(action)
            )
        ).subscribe();
    
        this.store
          .pipe(select(selectPartners), takeUntil(this.unsubscribe$))
          .subscribe((stocks: any) => {
            this.stocks = stocks;
          });
      }

      handleCreatePartnerSuccess(action){
        console.log(action.payload);
        const id = action.payload.tenants.id;
        const approvalId = action.payload.tenants.approvalId;
        this.dialogRef.close({
          status: true,
          partnerId: id,
          approvalId: approvalId
        });
      }

      handleUpdates(event) {
        if (event.name == "update-partner-info") {
          this.store.dispatch(
            new PartnersActions.ActionCreatePartner({
              value: event.value,
              tenantId: this.data.tenantId
            })
          );
        }
      }
  }
