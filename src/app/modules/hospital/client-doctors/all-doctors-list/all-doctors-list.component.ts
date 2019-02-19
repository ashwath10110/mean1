import {
    Component,
    Input,
    Output,
    EventEmitter,
    ChangeDetectionStrategy,
    OnInit,
    SimpleChanges
} from '@angular/core';
import { ROUTE_ANIMATIONS_ELEMENTS } from '@app/core';
import { FormGroup } from '@angular/forms';
import { Store, select } from '@ngrx/store';

import { Actions, ofType } from '@ngrx/effects';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { takeUntil, tap, take } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { State } from '@app/state/home/home.state';

import { selectDoctors } from '@app/state/doctors/doctors.selectors';
import { ActionGetDoctors, ActionDeleteDoctors, ActionGetDoctorsByUnitId } from '@app/state/doctors/doctors.actions';
import { EditDoctorComponent } from '../edit-doctor/edit-doctor.component';
import { MapDoctorComponent } from '../map-doctor/map-doctor.component';
import { selectSpecialities } from '@app/state/specialities/specialities.selectors';
import { ActionGetUnitSpecialityDetails } from '@app/state/specialities/specialities.actions';
import { MessageModalComponent } from '@app/common/message-modal/message-modal.component';

@Component({
    selector: 'app-all-doctors-list',
    templateUrl: './all-doctors-list.component.html',
    styleUrls: ['./all-doctors-list.component.css']
})
export class AllDoctorsListComponent implements OnInit {

    sub: any;
    parentRouteId: any;
    orgChartState: any;
    tenantId: any;
    unitId: any;
    state: any;
    unitsList = [];
    specializationLists = [];
    breadCrumbs;

    routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
    file: any;

    @Output()
    deleteDoctor: EventEmitter<string> = new EventEmitter();

    private unsubscribe$: Subject<void> = new Subject<void>();
    orgChartFormGroup: FormGroup;
    filteredList = [];

    constructor(
        public store: Store<State>,
        private updates$: Actions,
        public dialog: MatDialog,
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.store
            .pipe(select(selectDoctors), takeUntil(this.unsubscribe$))
            .subscribe((state: any) => {
                this.state = state;
            });
        this.store.dispatch(
            new ActionGetDoctors({})
        );
        this.store
            .pipe(select(selectSpecialities), takeUntil(this.unsubscribe$))
            .subscribe((state: any) => {
                if (this.tenantId) {
                    this.specializationLists = state.currentClientDepartments;
                } else {
                    this.specializationLists = state.specialities;
                }

            });
      /*  this.store.dispatch(
            new ActionGetUnitSpecialityDetails({
                unitId: this.unitId,
                tenantId: this.tenantId
            })
        );*/
    }

    fileChanged(e) {
        this.file = e.target.files[0];
        // this.uploadDocument(this.file);
    }

    uploadDocument() {
        let fileReader = new FileReader();
        fileReader.onload = (e) => {
            console.log(fileReader.result);
        }
        fileReader.readAsText(this.file);
    }

    ngOnInit() {
        //Todo: stop load if data loaded.
        this.store.dispatch(
            new ActionGetDoctors({})
        );
    }

    addDoctor() {
        const dialogRef = this.dialog.open(EditDoctorComponent, {
            width: '800px',
            data: {
                doctor: {},
                status: 'new',
                unitId: this.unitId?this.unitId:null,
                tenantId: this.tenantId?this.tenantId:null,
                specializationLists: this.specializationLists,
                statusForUpdate: 'post'
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            console.log(result);
        });
    }

    mapDoctor() {
        const dialogRef = this.dialog.open(MapDoctorComponent, {
            width: '800px',
            data: {
                doctorsList: this.state.doctorsList,
                unitId: this.parentRouteId,
                tenantId: this.tenantId
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            console.log(result);
        });
    }

   /* deleteDoctorFn(doctor: any) {
        this.store.dispatch(
            new ActionDeleteDoctors({ id: doctor.id })
        );
    }*/
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
              new ActionDeleteDoctors({ id: doctor.id})
            );
          }
        });
   
    }

    editDoctorFn(doctor) {
        const dialogRef = this.dialog.open(EditDoctorComponent, {
            width: '800px',
            data: {
                doctor: doctor,
                status: 'edit',
                unitId: this.unitId?this.unitId:null,
                tenantId: this.tenantId?this.tenantId:null,
                specializationLists: this.specializationLists,
                statusForUpdate: 'put'
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            console.log(result);
        });
    }

    changeSpecialityFn(doctor: any) { }

    assignSpeciality(doctor: any) {
        this.mapDoctor();
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

}

