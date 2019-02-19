import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, forkJoin } from 'rxjs';
import { apiPoints } from 'api-config';
import { map } from 'rxjs/operators';

const BASE_URL_CLIENT = apiPoints.BASE_URL_CLIENT;

@Injectable()
export class ClientsService {

  constructor(
    private httpClient: HttpClient,
  ) {}

  getTenants(): Observable<any> {
    const url = `${BASE_URL_CLIENT}/clientservice/all`;
    return this.httpClient.get<any>(url)
  }

  setp2Approval(obj): Observable<any> {
    const url = `${BASE_URL_CLIENT}/` + obj.id;
    return this.httpClient.put<any>(url, obj)
  }

  deleteTenant(payload): Observable<any> {
    const tenantId = payload.tenantId;
    const url = `${BASE_URL_CLIENT}/clientservice/details?tenantId=${payload.tenantId}`;
    const deleteTenant$ = this.httpClient.delete<any>(url);
    const tenantId$ = of(tenantId);
    return forkJoin([deleteTenant$, tenantId$]);
  }

  getTenantDetails(payload): Observable<any> {
    let url = '';
    let obs$;
    const tenantId$ = of(payload.tenantId);
    if (payload.tenantId) {
        url = `${BASE_URL_CLIENT}/clientservice/details?tenantId=` + payload.tenantId;
        obs$ = this.httpClient.get<any>(url);
    }
    else {
        url = `${BASE_URL_CLIENT}/clientservice/details`;
        obs$ = this.httpClient.get<any>(url);
    }
    return forkJoin([obs$, tenantId$])
        .pipe(
            map((data: any) => data)
        );
}

}
