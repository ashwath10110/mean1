import { Component, OnInit, ViewChild } from '@angular/core';
import { selectClientOnboarding } from '@app/state/client-onboarding/client-onboarding.selectors';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { State } from '@app/state/home/home.state';
import { Store, select } from '@ngrx/store';

import { Actions, ofType } from '@ngrx/effects';
import { isObjectEmpty } from '@app/utils/obj-utils';
import { ActionGetClientContactDetails, ClientOnboardingActionTypes, ActionGetClientContactDetailsSuccess, ActionUpdateClientContactDetails, ActionDeleteClientContactDetails, ActionDeleteClientContactDetailsSuccess, ActionUpdateClientContactDetailsSuccess, ActionUpdateClientContactDetailsSuccessAutoFlow } from '@app/state/client-onboarding/client-onboarding.actions';
import { MessageModalComponent } from '@app/common/message-modal/message-modal.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-client-contacts',
  templateUrl: './client-contacts.component.html',
  styleUrls: ['./client-contacts.component.css']
})
export class ClientContactsComponent implements OnInit {

  sub: any;
  parentRouteId: any;
  breadCrumbs = [];
  clientContactDetails: any;
  contactDetails: any;
  statusForUpdate = "";
  obj = {};
  currentContact: any;
  routeName = "";
  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    public store: Store<State>,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private updates$: Actions,
    private router: Router
  ) {
    this.sub = this.route.parent.params.subscribe(params => {
      this.parentRouteId = params["id"];
      this.breadCrumbs = [{
        'label': 'Clients',
        'url': '#/home/business/clients-list'
      }, {
        'label': 'Client Details',
        'url': '#/home/business/client-view/' + this.parentRouteId + '/summary'
      }, {
        'label': 'Contact Details'
      }];
    });
  }

  ngOnInit() {
    this.route.parent.url.subscribe(url => {
      this.routeName = url[0].path;
    });
    this.store
      .pipe(select(selectClientOnboarding), takeUntil(this.unsubscribe$))
      .subscribe((state: any) => {
        this.clientContactDetails = state.contacts;
      });
    this.store.dispatch(
      new ActionGetClientContactDetails({
        tenantId: this.parentRouteId
      })
    );
    this.initEffects();
  }

  initEffects() {
    this.updates$.pipe(
      takeUntil(this.unsubscribe$),
      ofType<ActionGetClientContactDetailsSuccess>(ClientOnboardingActionTypes.GET_CLIENT_CONTACT_DETAILS_SUCCESS),
      tap(action =>
        this.handleGetClientContactDetailsSuccess(action)
      )
    ).subscribe();

    this.updates$.pipe(
      takeUntil(this.unsubscribe$),
      ofType<ActionDeleteClientContactDetailsSuccess>(ClientOnboardingActionTypes.DELETE_CLIENT_CONTACT_DETAILS_SUCCESS),
      tap(action =>
        this.store.dispatch(
          new ActionGetClientContactDetails({
            tenantId: this.parentRouteId
          })
        )
      )
    ).subscribe();

    this.updates$.pipe(
      takeUntil(this.unsubscribe$),
      ofType<ActionUpdateClientContactDetailsSuccess>(ClientOnboardingActionTypes.UPDATE_CLIENT_CONTACT_DETAILS_SUCCESS),
      tap(action =>
        this.store.dispatch(
          new ActionGetClientContactDetails({
            tenantId: this.parentRouteId
          })
        )
      )
    ).subscribe();
  }

  handleGetClientContactDetailsSuccess(action) {
    let contactDetails = action.payload.data || [];
    contactDetails = contactDetails.map(ele => {
      return {
        ...ele,
        fullName: ele.fullName,
        phone: ele.phone,
      }
    });
    this.contactDetails = contactDetails;
    this.obj = this.contactDetails;
    if (isObjectEmpty(this.obj)) {
      this.statusForUpdate = "post";
    }
    else {
      this.statusForUpdate = "put";
    }
  }

  handleContactsChange(event) {
    if (event.name === 'update-contact-details') {
      this.currentContact = {
        ...event.value,
        tenantId: this.parentRouteId
      }
      let statusForUpdate = event.value.hasOwnProperty('id') ? 'put' : 'post';

      this.store.dispatch(
        new ActionUpdateClientContactDetails({
          tenantId: this.parentRouteId,
          statusForUpdate: statusForUpdate,
          value: this.currentContact
        })
      );
    }

    if (event.name === 'get-contact-details') {
      this.store.dispatch(
        new ActionGetClientContactDetails({
          tenantId: this.parentRouteId
        })
      );
    }
  }

  proceedFromContacts() {
    if (this.routeName == 'client-setup') {
      this.store.dispatch(
        new ActionUpdateClientContactDetailsSuccessAutoFlow({})
      );
    }
    else if (this.routeName == 'client-view') {
      this.router.navigate(['home/business/client-view/' + this.parentRouteId + '/summary']);
    }
  }

  handleRemoveContact(event) {
    if (event.name === 'remove-contact-detail') {
      const dialogRef = this.dialog.open(MessageModalComponent, {
        width: '300px',
        data: {
          name: "check-delete-client-contact",
          data: {}
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result && result.status) {
          if (result.message == "success") {
            this.store.dispatch(
              new ActionDeleteClientContactDetails({
                tenantId: this.parentRouteId,
                id: event.value.id
              })
            );
          }
        }
      });
    }
  }
  updateContacts() {
    const value = {
      ...this.obj,
      tenantId: this.parentRouteId,
      contacts: this.contactDetails,
      statusForUpdate: this.statusForUpdate
    };
    this.store.dispatch(
      new ActionUpdateClientContactDetails({
        value: value
      })
    );
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}

