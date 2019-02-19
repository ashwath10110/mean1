import { Component, OnInit, OnDestroy, Inject, HostListener } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil, tap, take } from 'rxjs/operators';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Actions, ofType } from '@ngrx/effects';
import { Router, ActivatedRoute } from '@angular/router';
import { State, selectHomeState } from '@app/state/home/home.state';
import * as partnerActions from '@app/state/partners/partners.actions';
import * as unitActions from '@app/state/units/units.actions';
import { MessageModalComponent } from '@app/common/message-modal/message-modal.component';
import { NewPartnerComponent } from '../new-partner/new-partner.component';
import { selectPartners } from '@app/state/partners/partners.selectors';
import { selectUnits } from '@app/state/units/units.selectors';
import { selectDetails } from '@app/state/details/details.selectors';
import { selectAuthState } from '@app/core';
import { AppService } from '@app/app/app.service';

@Component({
    selector: 'app-partners-container',
    templateUrl: './partner-container.component.html',
    styleUrls: ['./partner-container.component.scss']
  })

  export class PartnersContainerComponent implements OnInit, OnDestroy {
    private unsubscribe$: Subject<void> = new Subject<void>();
    stocks;
    partnersList: any =[];
    hospitalUnits: any =[];
    breadcrumbs: any =[];
    sub:any;
    unitId: any;
    tenantId: any;
    details: any;
    loading =false;
    constructor(
        private route: ActivatedRoute,
        public store: Store<State>,
        public dialog: MatDialog,
        private updates$: Actions,
        private router: Router,
        private snack: MatSnackBar,
        private appService: AppService
      ) {
        this.sub = this.route.params.subscribe(params => {
          this.unitId = params["unitId"];
        });
        this.sub = this.route.parent.params.subscribe(params => {
          this.tenantId = params["id"];
        });

        this.breadcrumbs = [{
          'label': 'Hospital Info',
          'url': `#/home/business/hospital-info/${this.tenantId}`
        }, {
          'label': 'Partners',
        }];
      }

      ngOnInit() {
          this.store.pipe(select(selectAuthState), takeUntil(this.unsubscribe$))
          .subscribe((tenantState: any) => {
            console.log(tenantState);
              if(!this.tenantId){
                this.tenantId = tenantState.user.data.tenantId;
                
              }
          });
          
        this.store
        .pipe(select(selectDetails), takeUntil(this.unsubscribe$))
        .subscribe((details: any) => {
          this.details =  details || {};
          console.log(this.details);
        });

        // to fetch partnerState
        this.store
          .pipe(select(selectPartners), takeUntil(this.unsubscribe$))
          .subscribe((partnerState: any) => {
            this.stocks =  partnerState || {};
            this.partnersList = this.stocks.partnersList;
            this.loading = this.stocks.loading;
          });

          // to fetch units
          this.store
          .pipe(select(selectUnits), takeUntil(this.unsubscribe$))
          .subscribe((unitState: any) => {
            this.hospitalUnits = unitState.unitsList ? unitState.unitsList: [];
          });
        
        // Dispatchers

        this.store.dispatch(
          new partnerActions.ActionGetPartners({ symbol: '' , tenantId: this.tenantId, unitId: this.unitId})
        );

        this.store.dispatch(
          new unitActions.ActionGetTenantUnits({
            tenantId: this.tenantId
          })
        )

        if(!this.tenantId && !this.unitId){
          this.tenantId = this.details.tenantId;
        }
      }

    

      createNewPartner(){
        const dialogRef = this.dialog.open(NewPartnerComponent, {
            width: '800px',
            data: {
              tenantId: this.tenantId
            }
          });

          dialogRef.afterClosed().subscribe(result => {
            if (result && result.status) {
              if(!result.approvalId){
                const url = (this.unitId) ?
                'home/business/unit-view/'+this.tenantId+ '/unit-partners/'+this.unitId +'/partner-setup/' + result.partnerId + '/partner-details':
                'home/business/partner-setup/' + result.partnerId + '/partner-details';
                this.router.navigate([url]);             
            } else {
              this.appService.showMsg('Submitted For Approval', 'Creation Successful', false);
              // const url = (this.unitId) ?
              // 'home/business/unit-view/'+this.tenantId+ '/unit-partners/'+this.unitId:
              // 'home/business/partners';
              // this.router.navigate([url]);
              this.showApprovalMsgModal();
            }
          }
            else { 
          
            }
          });

      }

      showApprovalMsgModal(){
        const dialogRef = this.dialog.open(MessageModalComponent, {
          width: '800px',
          data: {
              tenantId: this.tenantId,
              name: "partner-details-submitted-for-approval",
              unitId: this.unitId
          }
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result && result.status) {
            //this.router.navigate(['home/business/unit-view/'+this.tenantId+ '/unit-partners/'+this.unitId+'/partner-setup/'+ this.partnerId]);
            const url = (this.unitId) ?
            'home/business/unit-view/'+this.tenantId+ '/unit-partners/'+this.unitId:
            'home/business/partners';
            this.router.navigate([url]);
          }
        });
      }

      getUnitName(id){
        const unitDetails =  this.hospitalUnits.filter((unit) => {
          return unit.id === id;
        }); 
        return unitDetails.length && unitDetails[0].name ? unitDetails[0].name: '';
      };


      viewPartnerInfoFn(partner) {
        setTimeout(() => {
          // this.router.navigate(['home/business/unit-view/' + this.parentRouteId + '/unit-partners/' + event.data.id]);
          const url = this.unitId ? `home/business/unit-view/${this.tenantId}/unit-partners/${this.unitId}/partner-view/${partner.id}/partner-summary`:
            `home/business/partner-view/${partner.id}/partner-summary`;
          this.router.navigate([url]);
        }, 1000);
      }


      deletePartnerFn(partner) {
        const dialogRef = this.dialog.open(MessageModalComponent, {
          width: '800px',
          data: {
            name: "delete-partner",
            data: partner
          }
        });


        dialogRef.afterClosed().subscribe(result => {
          if (result && result.status) {
            this.store.dispatch(
              new partnerActions.ActionDeletePartner({ id: partner.id, tenantId: this.tenantId })
            );
          }
          else { }
        });
      }

      ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
      }
        
  }


