import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, forkJoin } from 'rxjs';
import { map, switchMap, mergeMap, flatMap } from 'rxjs/operators';
import { apiPoints } from 'api-config';


const BASE_URL_MASTER = apiPoints.BASE_URL_MASTER;

@Injectable()
export class LocationsService {

  constructor(private httpClient: HttpClient) { }
  
  getCountryStateCity(): Observable<any> {
    const countryUrl = `${BASE_URL_MASTER}/masterservice/location/country`;
    const stateUrl = `${BASE_URL_MASTER}/masterservice/location/state`;
    const cityUrl = `${BASE_URL_MASTER}/masterservice/location/city`;
    return this.httpClient.get<any>(countryUrl).pipe(
      flatMap((data) => {
        const stateResult = this.httpClient.get<any>(stateUrl);
        const cityResult = this.httpClient.get<any>(cityUrl);
        return forkJoin([of(data), stateResult, of([])]);
      })
    );
  }

  getCountry(): Observable<any> {
    const url = `${BASE_URL_MASTER}/masterservice/location/country`;
    return this.httpClient.get<any>(url)
      .pipe(
        map((data: any) => data)
      );
  }

  getStateByCountryId(payload): Observable<any> {
    const url = `${BASE_URL_MASTER}/masterservice/location/state/country/` + payload.countryId;
    return this.httpClient.get<any>(url)
      .pipe(
        map((data: any) => data)
      );
  }

  getCityByStateId(payload): Observable<any> {
    const url = `${BASE_URL_MASTER}/masterservice/location/city/state/`+ payload.stateId;
    return this.httpClient.get<any>(url)
      .pipe(
        map((data: any) => data)
      );
  }

  getCountryIdStateIdByCityId(payload): Observable<any> {
    const url = `${BASE_URL_MASTER}/masterservice/location/city-id/`+ payload.cityId;
    return this.httpClient.get<any>(url)
      .pipe(
        map((data: any) => data)
      );
  }
  


}
