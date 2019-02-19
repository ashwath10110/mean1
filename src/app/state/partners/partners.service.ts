import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { apiPoints } from 'api-config';

const BASE_URL = apiPoints.BASE_URL_MEDBUD;
const BASE_CLIENT_URL = apiPoints.BASE_CLIENT_URL;
const BASE_URL_CLIENT = apiPoints.BASE_URL_CLIENT;
@Injectable()
export class PartnersService {

  constructor(private httpClient: HttpClient) { }
  
  getPartners(payload): Observable<any> {
    let url = '';
    if(payload.unitId){
       url = `${BASE_URL_CLIENT}/clientservice/partner/unit/${payload.unitId}?tenantId=${payload.tenantId}`;
    } else {
       url = `${BASE_URL_CLIENT}/clientservice/partner?tenantId=${payload.tenantId}`;
    }
    // const url = `${BASE_CLIENT_URL}/ClientService/partners?tenantId=${payload.tenantId}`;
    return this.httpClient.get<any>(url)
      .pipe(
        map((data: any) => data)
      );
  }

  createPartner(payload): Observable<any> {
    console.log(payload);
    const url = `${BASE_URL_CLIENT}/clientservice/partner/details?tenantId=${payload.tenantId}`;
    let obs$: any;
    if (payload.value.statusForUpdate == 'put') {
      obs$ = this.httpClient.put<any>(url, payload.value);
    }
    else {
      obs$ = this.httpClient.post<any>(url, payload.value);
    }
    return obs$
      .pipe(
        map((data: any) => data)
      );
  }

  deletePartner(payload): Observable<any> {
    console.log(payload);
    const url = `${BASE_URL_CLIENT}/clientservice/partner/${payload.id}?tenantId=${payload.tenantId}`;
    const deleteDoctor$ = this.httpClient.delete<any>(url);
    const mbid$ = of(payload.id);
    return forkJoin([deleteDoctor$, mbid$]);
  }

  getPartner(payload): Observable<any> {
    console.log(payload);
    const url = `${BASE_URL_CLIENT}/clientservice/partner/${payload.id}?tenantId=${payload.tenantId}`;
    const getPartner$ = this.httpClient.get<any>(url);
    const mbid$ = of(payload.id);
    return forkJoin([getPartner$, mbid$]);
  }

  getPartnerFinance(payload): Observable<any> {
    console.log(payload);
    const url = `${BASE_URL_CLIENT}/clientservice/partner/account/${payload.id}?tenantId=${payload.tenantId}`;
    const getPartnerFinanceData$ = this.httpClient.get<any>(url);
    const mbid$ = of(payload.id);
    return forkJoin([getPartnerFinanceData$, mbid$]);
  }

  getPartnerContactData(payload): Observable<any> {
    console.log(payload);
    const url = `${BASE_URL_CLIENT}/ClientService/partners/contacts/partner/${payload.id}?tenantId=${payload.tenantId}`;
    const getPartnerContactData$ = this.httpClient.get<any>(url);
    const mbid$ = of(payload.id);
    return forkJoin([getPartnerContactData$, mbid$]);
  }

  // updatePartnerContactData(payload): Observable<any> {
  //   console.log(payload);
  //   let obs$: any;
  //   const url = `${BASE_URL_CLIENT}/clientservice/partners/contacts`;
  //   if (payload.statusForUpdate == 'put') {
  //     obs$ = this.httpClient.put<any>(url, payload);
  //   }
  //   else {
  //     obs$ = this.httpClient.post<any>(url, payload);
  //   }
  //   return obs$
  //     .pipe(
  //       map((data: any) => data)
  //     );
  // }


  updatePartnerFinanceData(payload): Observable<any> {
    let obs$: any;
    const url = `${BASE_URL_CLIENT}/clientservice/partner/account?tenantId=${payload.tenantId}`;
    if (payload.value.statusForUpdate == 'put') {
      obs$ = this.httpClient.put<any>(url, payload.value);
    }
    else {
      obs$ = this.httpClient.post<any>(url, payload.value);
    }
    return obs$
      .pipe(
        map((data: any) => data)
      );
  }

  getPartnerAddress(payload): Observable<any> {
    console.log(payload);
    const url = `${BASE_URL_CLIENT}/clientservice/partner/contact/${payload.id}?tenantId=${payload.tenantId}`;
    const getPartnerAddressData$ = this.httpClient.get<any>(url);
    const mbid$ = of(payload.id);
    return forkJoin([getPartnerAddressData$, mbid$]);
  } 


  updatePartnerAddress(payload): Observable<any> {
    let obs$: any;
    const url = `${BASE_URL_CLIENT}/clientservice/partner/contact?tenantId=${payload.tenantId}`;
    if (payload.statusForUpdate == 'put') {
      obs$ = this.httpClient.put<any>(url, payload.value);
    }
    else {
      obs$ = this.httpClient.post<any>(url, payload.value);
    }
    return obs$
      .pipe(
        map((data: any) => data)
      );
  }


  getPartnerContactDetails(payload): Observable<any> {
    const tenantId = payload.tenantId;
    //const unitId = payload.unitId;
    let url;
    if (tenantId) {
      url = `${BASE_URL_CLIENT}/clientservice/partner/contact/person/partner-id/` + payload.partnerId + `?tenantId=` + payload.tenantId;
    }
    else {
      url = `${BASE_URL_CLIENT}/clientservice/partner/contact/person/partner-id/` + payload.partnerId;
    }
    return this.httpClient.get<any>(url)
      .pipe(
        map((data: any) => data)
      );
  }

  updatePartnerContactDetails(payload): Observable<any> {
    const tenantId = payload.value.tenantId;
    //const unitId = payload.unitId;
    let url;
    if (tenantId) {
      url = `${BASE_URL_CLIENT}/clientservice/partner/contact/person?tenantId=` + payload.tenantId;
      delete payload.tenantId;
    }
    else {
      url = `${BASE_URL_CLIENT}/clientservice/partner/contact/person`;
    }
    if(payload.statusForUpdate === 'put'){
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

  deletePartnerContactDetails(payload): Observable<any> {
    const tenantId = payload.tenantId;
    let obs$: any;
    const url = tenantId? `${BASE_URL_CLIENT}/clientservice/partner/contact/person/${payload.id}?tenantId=` + tenantId:
    `${BASE_CLIENT_URL}/ClientService/contact/person/${payload.id}`;
    const deleteContact$ = this.httpClient.delete<any>(url);
    const mbid$ = of(payload.id);
    return forkJoin([deleteContact$, mbid$]);
  }

}
