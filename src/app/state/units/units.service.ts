import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { apiPoints } from 'api-config';

const BASE_URL = apiPoints.BASE_URL_MEDBUD;
const BASE_CLIENT_URL = apiPoints.BASE_CLIENT_URL;
const BASE_URL_CLIENT = apiPoints.BASE_URL_CLIENT;

@Injectable()
export class UnitsService {

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
        const tenantId = payload.tenantId;
        const id = payload.id;
        let url;
        if(tenantId){
           url = `${BASE_URL_CLIENT}/clientservice/unit/${payload.id}?tenantId=${payload.tenantId}`;
        }else{
           url = `${BASE_URL_CLIENT}/clientservice/unit/` + payload.id;
        }   
        const deleteUnit$ = this.httpClient.delete<any>(url);
        const id$ = of(id);
        return forkJoin([deleteUnit$, id$]);
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
        const url = `${BASE_URL_CLIENT}/clientservice/unit/details?tenantId=` + payload.tenantId;
        return this.httpClient.post<any>(url, payload)
            .pipe(
                map((data: any) => data)
            );
    }

    getUnitsLists(tenantId): Observable<any> {
        const url = `${BASE_URL_CLIENT}/clientservice/unit?tenantId=` + tenantId;
        return this.httpClient.get<any>(url)
    }

}
