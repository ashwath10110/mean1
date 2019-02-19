import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { LocationsService } from './locations.service';
import { LocationsActionTypes } from './locations.actions';
import * as LocationsActions from './locations.actions';
import { AppService } from '@app/app/app.service';


@Injectable()
export class LocationsEffects {

  constructor(
    private actions$: Actions < Action >,
    private service: LocationsService,
    private appService: AppService
  ) {}

  handleError(error) {
    this.appService.logError(error, true);
  }

  @Effect()
  getAllCountryStateCity = this.actions$.pipe(
    ofType < LocationsActions.ActionGetCountryStateCity > (LocationsActionTypes.GET_COUNTRY_STATE_CITY),
    switchMap((action: LocationsActions.ActionGetCountryStateCity) =>
      this.service
      .getCountryStateCity()
      .pipe(
        map(res => new LocationsActions.ActionGetCountryStateCitySuccess({ data: res.data })),
        catchError(error => {
          this.handleError(error);
          return of(new LocationsActions.ActionGetCountryStateCityError({ error }))
        }),
      )
    )
  );

  @Effect()
  getAllCountry = this.actions$.pipe(
    ofType < LocationsActions.ActionGetCountry > (LocationsActionTypes.GET_COUNTRY),
    switchMap((action: LocationsActions.ActionGetCountry) =>
      this.service
      .getCountry()
      .pipe(
        map(res => new LocationsActions.ActionGetCountrySuccess({ data: res.data })),
        catchError(error => {
          this.handleError(error);
          return of(new LocationsActions.ActionGetCountryError({ error }))
        }),
      )
    )
  );

  @Effect()
  getStateByCountryId = this.actions$.pipe(
    ofType < LocationsActions.ActionGetStateByCountryId > (LocationsActionTypes.GET_STATE_BY_COUNTRY_ID),
    switchMap((action: LocationsActions.ActionGetStateByCountryId) =>
      this.service
      .getStateByCountryId(action.payload)
      .pipe(
        map(res => new LocationsActions.ActionGetStateByCountryIdSuccess({ data: res.data })),
        catchError(error => {
          this.handleError(error);
          return of(new LocationsActions.ActionGetStateByCountryIdError({ error }))
        }),
      )
    )
  );

  @Effect()
  getCityByStateId = this.actions$.pipe(
    ofType < LocationsActions.ActionGetCityByStateId > (LocationsActionTypes.GET_CITY_BY_STATE_ID),
    switchMap((action: LocationsActions.ActionGetCityByStateId) =>
      this.service
      .getCityByStateId(action.payload)
      .pipe(
        map(res => new LocationsActions.ActionGetCityByStateIdSuccess({ data: res.data })),
        catchError(error => {
          this.handleError(error);
          return of(new LocationsActions.ActionGetCityByStateIdError({ error }))
        }),
      )
    )
  );

  @Effect()
  getCountryIdStateIdByCityId = this.actions$.pipe(
    ofType < LocationsActions.ActionGetCountryIdStateIdByCityId > (LocationsActionTypes.GET_COUNTRY_ID_STATE_ID_BY_CITY_ID),
    switchMap((action: LocationsActions.ActionGetCountryIdStateIdByCityId) =>
      this.service
      .getCountryIdStateIdByCityId(action.payload)
      .pipe(
        map(res => new LocationsActions.ActionGetCountryIdStateIdByCityIdSuccess({ data: res.data })),
        catchError(error => {
          this.handleError(error);
          return of(new LocationsActions.ActionGetCountryIdStateIdByCityIdError({ error }))
        }),
      )
    )
  );

}
