import { ActivatedRoute, Router } from '@angular/router';
import { Component, Input, Output, EventEmitter, OnInit, SimpleChanges } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { State } from '@app/state/home/home.state';
import { MatDialog } from '@angular/material';
import { ActionDeleteDoctors, ActionGetDoctorsByUnitIdSuccess, DoctorsActionTypes } from '@app/state/doctors/doctors.actions';
import { Actions, ofType } from '@ngrx/effects';
import { takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MessageModalComponent } from '@app/common/message-modal/message-modal.component';
import { AppState, selectAuthState } from '@app/core';


@Component({
  selector: 'app-doctors-list',
  templateUrl: './doctors-list.component.html',
  styleUrls: ['./doctors-list.component.css']
})
export class DoctorsListComponent implements OnInit {
  
  sub: any;
  parentRouteId: any;
  tenantId: any;
  unitId: any;
  specializationLists = [];
  roles = [];
  private unsubscribe$: Subject<void> = new Subject<void>();


  @Input()
  doctorsList = [];

  @Output()
  removeDoctorFromUnit: EventEmitter<any> = new EventEmitter();

  @Output() editDoctor: EventEmitter<any> = new EventEmitter();

  constructor(
    public store: Store<State>,
    public dialog: MatDialog,
    private updates$: Actions,
    private route: ActivatedRoute,
  ) { }

  editDoctors(doctor) {
    this.editDoctor.emit(doctor);
  }
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.unitId = params["unitId"];
    });
    this.sub = this.route.parent.params.subscribe(params => {
      this.tenantId = params["id"];
    });
    this.store.pipe(select(selectAuthState), takeUntil(this.unsubscribe$))
    .subscribe((state: any) => {
      if(state.user.data.roles)
      this.roles.push(state.user.data.roles);
    });
    this.updates$.pipe(
      takeUntil(this.unsubscribe$),
      ofType<ActionGetDoctorsByUnitIdSuccess>(DoctorsActionTypes.GET_DOCTORS_BY_UNIT_ID_SUCCESS),
      tap(action =>
        this.handleGetUnitDoctorsSuccess(action)
      )
    ).subscribe();
  }

  handleGetUnitDoctorsSuccess(action: any) {
    this.doctorsList = action.payload.data
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['doctorsList']) {
      this.doctorsList = changes['doctorsList'].currentValue || [];
    }
  }

  removeDoctorFromUnitFn(doctor) {
    this.removeDoctorFromUnit.emit(doctor);
  }

  deleteDoctorFn(doctor: any) {
     const dialogRef = this.dialog.open(MessageModalComponent, {
          width: '800px',
          data: {
            name: "common-message-delete"
          }
        });
        dialogRef.afterClosed().subscribe(result => {
          if (result && result.status) {
            this.store.dispatch(
              new ActionDeleteDoctors({ id: doctor.id, tenantId: this.tenantId })
            );
          }
        });
   
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
