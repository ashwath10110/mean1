import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { apiPoints } from 'api-config';

const BASE_URL = apiPoints.BASE_URL_MEDBUD;
const BASE_CLIENT_URL = apiPoints.BASE_CLIENT_URL;
const BASE_URL_CLIENT = apiPoints.BASE_URL_CLIENT;

@Injectable()
export class DetailsService {

  constructor(private httpClient: HttpClient) { }

  // getUnitDetails(payload): Observable<any> {
  //   const tenantId = payload.tenantId;
  //   //const unitId = payload.unitId;
  //   let url;
  //   if(tenantId){
  //      url = `${BASE_URL_CLIENT}/clientservice/unit/` + payload.unitId +"?tenantId="+ payload.tenantId;
  //      delete payload.tenantId;
  //   }
  //   else {
  //      url = `${BASE_URL_CLIENT}/clientservice/unit/` + payload.unitId;
  //   }
  //   return this.httpClient.get<any>(url)
  //     .pipe(
  //       map((data: any) => data)
  //     );
  // }

  // updateUnitDetails(payload): Observable<any> {
  //   const tenantId = payload.tenantId;
  //   //const unitId = payload.unitId;
  //   let url;
  //   if(tenantId){
  //     url = `${BASE_URL_CLIENT}/clientservice/unit?tenantId=`+ payload.tenantId;
  //     delete payload.tenantId;
  //   }
  //   else{
  //      url = `${BASE_URL_CLIENT}/clientservice/unit/` + payload.unitId;
  //   }
  //   return this.httpClient.get<any>(url)
  //     .pipe(
  //       map((data: any) => data)
  //     );
  // }

  getUnitAddressDetails(payload): Observable<any> {
    const tenantId = payload.tenantId;
    //const unitId = payload.unitId;
    let url;
    if (tenantId) {
      url = `${BASE_URL_CLIENT}/clientservice/unit/contact/` + payload.unitId + "?tenantId=" + payload.tenantId;
      delete payload.tenantId;
    }
    else {
      url = `${BASE_URL_CLIENT}/clientservice/unit/contact/` + payload.unitId;
    }
    return this.httpClient.get<any>(url)
      .pipe(
        map((data: any) => data)
      );
  }

  getUnitDetails(payload): Observable<any> {
    const tenantId = payload.tenantId;
    //const unitId = payload.unitId;
    let url;
    if (tenantId) {
      url = `${BASE_URL_CLIENT}/clientservice/unit/` + payload.unitId + "?tenantId=" + payload.tenantId;
      delete payload.tenantId;
    }
    else {
      url = `${BASE_URL_CLIENT}/clientservice/unit/` + payload.unitId;
    }
    return this.httpClient.get<any>(url)
      .pipe(
        map((data: any) => data)
      );
  }

  updateUnitAddressDetails(payload): Observable<any> {
    const tenantId = payload.tenantId;
    let obs$: any;
    const url = `${BASE_URL_CLIENT}/clientservice/unit/contact?tenantId=` + payload.tenantId;
    if (payload.statusForUpdate.toLowerCase() == 'put') {
      obs$ = this.httpClient.put<any>(url, payload);
    }
    else {
      obs$ = this.httpClient.post<any>(url, payload);
    }
    return obs$
      .pipe(
        map((data: any) => data)
      );
  }

  updateUnitDetails(payload): Observable<any> {

    const tenantId = payload.tenantId;
    let obs$: any;
    const url = `${BASE_URL_CLIENT}/clientservice/unit/details?tenantId=` + payload.tenantId;
    if (payload.statusForUpdate.toLowerCase() == 'put') {
      obs$ = this.httpClient.put<any>(url, payload);
    }
    else {
      delete payload['id'];
      obs$ = this.httpClient.post<any>(url, payload);
    }
    return obs$
      .pipe(
        map((data: any) => data)
      );
  }

  getUnitContactDetails(payload): Observable<any> {
    const tenantId = payload.tenantId;
    //const unitId = payload.unitId;
    let url;
    if (tenantId) {
      url = `${BASE_URL_CLIENT}/clientservice/unit/contact/` + payload.unitId + `?tenantId=` + payload.tenantId;
      delete payload.tenantId;
    }
    else {
      url = `${BASE_URL_CLIENT}/clientservice/unit/contact/` + payload.unitId;
    }
    return this.httpClient.get<any>(url)
      .pipe(
        map((data: any) => data)
      );
  }

  updateUnitContactDetails(payload): Observable<any> {
    const tenantId = payload.tenantId;
    //const unitId = payload.unitId;
    let url;
    if (tenantId) {
      url = `${BASE_URL_CLIENT}/clientservice/unit/contact?tenantId=` + payload.tenantId;
      delete payload.tenantId;
    }
    else {
      url = `${BASE_URL_CLIENT}/clientservice/unit/contact`;
    }
    if (payload.statusForUpdate.toLowerCase() === 'put') {
      return this.httpClient.put<any>(url, payload.value)
        .pipe(
          map((data: any) => data)
        );
    } else {
      return this.httpClient.post<any>(url, payload.value)
        .pipe(
          map((data: any) => data)
        );
    }

  }

  getUnitFinance(payload): Observable<any> {
    const tenantId = payload.tenantId;
    //const unitId = payload.unitId;
    let url = `${BASE_URL_CLIENT}/clientservice/unit/account/` + payload.unitId + `?tenantId=` + payload.tenantId;
    delete payload.tenantId;
    return this.httpClient.get<any>(url)
      .pipe(
        map((data: any) => data)
      );
  }

  updateUnitFinance(payload): Observable<any> {

    const tenantId = payload.tenantId;
    let obs$: any;
    const url = `${BASE_URL_CLIENT}/clientservice/unit/account?tenantId=` + tenantId;
    delete payload.tenantId;
    payload["id"] = payload.unitId;
    payload["approvals"] = null;
    obs$ = this.httpClient.put<any>(url, payload);
    return obs$
      .pipe(
        map((data: any) => data)
      );
  }

  updateUnitAddress(payload): Observable<any> {

    const tenantId = payload.tenantId;
    let obs$: any;
    const url = `${BASE_URL_CLIENT}/clientservice/unit/account?tenantId=` + tenantId;
    delete payload.tenantId;
    payload["id"] = payload.unitId;
    payload["approvals"] = null;
    obs$ = this.httpClient.put<any>(url, payload);
    return obs$
      .pipe(
        map((data: any) => data)
      );
  }
  
  deleteUnitContactDetails(payload): Observable<any> {
    const tenantId = payload.tenantId;
    let obs$: any;
    const url = tenantId ? `${BASE_URL_CLIENT}/clientservice/unit/contact/${payload.id}?tenantId=` + tenantId :
      `${BASE_CLIENT_URL}/ClientService/unit/contact/${payload.id}`;
    const deleteContact$ = this.httpClient.delete<any>(url);
    const mbid$ = of(payload.id);
    return forkJoin([deleteContact$, mbid$]);
  }
}
