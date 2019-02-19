import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { apiPoints } from 'api-config';

const BASE_URL = apiPoints.BASE_URL_MEDBUD;
const BASE_CLIENT_URL = apiPoints.BASE_CLIENT_URL;
const BASE_URL_CLIENT = apiPoints.BASE_URL_CLIENT;

@Injectable()
export class TenantsService {

  constructor(private httpClient: HttpClient) { }


  updateContactDetailsUnits(payload): Observable<any> {
    const url = `${BASE_URL}/units`;
    let obs$ = this.httpClient.post<any>(url, payload);
    if (payload.statusForUpdate == 'put') {
      obs$ = this.httpClient.put<any>(url, payload);
    } else {
      obs$ = this.httpClient.post<any>(url, payload);
    }
    return obs$
      .pipe(
        map((data: any) => data)
      );
  }

  updateAddressDetailsUnits(payload): Observable<any> {
    const url = `${BASE_URL}/units`;
    return this.httpClient.put<any>(url, payload)
      .pipe(
        map((data: any) => data)
      );
  }



  deleteTenantUnit(payload): Observable<any> {
    const url = `${BASE_URL}/units/` + payload.mbid;
    return this.httpClient.delete<any>(url)
      .pipe(
        map((data: any) => data)
      );
  }

  getTenantUnits(payload): Observable<any> {
    let url = '';
    let obs$;
    const tenantId$ = of(payload.tenantId);
    if (payload.tenantId) {
      url = `${BASE_URL_CLIENT}/clientservice/unit?tenantId=` + payload.tenantId;
      obs$ = this.httpClient.get<any>(url);
    }
    else {
      url = `${BASE_URL_CLIENT}/clientservice/unit`;
      obs$ = this.httpClient.get<any>(url);
    }
    return forkJoin([obs$, tenantId$])
      .pipe(
        map((data: any) => data)
      );
  }



  createTenantUnit(payload): Observable<any> {
    const url = `${BASE_URL_CLIENT}/clientservice/unit`;
    return this.httpClient.post<any>(url, payload)
      .pipe(
        map((data: any) => data)
      );
  }

  getTenantUnitDetails(symbol): Observable<any> {
    const url = `${BASE_URL}/units/details`;
    return this.httpClient.get<any>(url)
      .pipe(
        map((data: any) => data)
      );
  }

  getTenantDetails(): Observable<any> {
    const url = `${BASE_URL_CLIENT}/clientservice/details`;
    return this.httpClient.get<any>(url)
      .pipe(
        map((data: any) => data)
      );
  }


}
