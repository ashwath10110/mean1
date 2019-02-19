import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpBackend } from '@angular/common/http';
import { Observable, of, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { apiPoints } from 'api-config';
import { AuthService } from '@app/core/auth/auth.service';

const BASE_URL = apiPoints.BASE_URL_MEDBUD;
const BASE_CLIENT_URL = apiPoints.BASE_CLIENT_URL;
const BASE_URL_MASTER = apiPoints.BASE_URL_MASTER;
const BASE_URL_CLIENT = apiPoints.BASE_URL_CLIENT;

@Injectable()
export class SpecialitiesService {
  noninterceptor: HttpClient;

  constructor(
    private httpClient: HttpClient,
    private handler: HttpBackend,
    private authService: AuthService
  ) {
    this.noninterceptor = new HttpClient(handler);
  }

  getAllDepartments(): Observable<any> {
    const url = `${BASE_URL_MASTER}/masterservice/specialization`;
    return this.httpClient.get<any>(url)
      .pipe(
        map((data: any) => data)
      );
  }

  getSpecialitiesCurrentClient(payload): Observable<any> {
    const unitIds = payload.unitIds;
    let specs$ = [];
    unitIds.forEach(unitId => {
      const url = `${BASE_URL_CLIENT}/clientservice/unit/specialization/${unitId}?tenantId=${payload.tenantId}`;
      specs$.push(this.httpClient.get<any>(url));
    });
   return forkJoin([of(unitIds), ...specs$])
    .pipe(
      map((data: any) => data)
    )
  }

  getDepartmentsByUnitId(payload): Observable<any> {
    const url = `${BASE_URL_MASTER}/masterservice/specialization/${payload.unitId}`;
    return this.httpClient.get<any>(url)
      .pipe(
        map((data: any) => data)
      );
  }

  addDepartmentsToUnit(payload): Observable<any> {
    const unitId = payload.unitId;
    const selectedSpecialities = payload.selectedSpecialities;
    const obsArray$ = selectedSpecialities.map(ele => {
      const updDepts = `${BASE_CLIENT_URL}/ClientService/unit-spec-mapping/`;
      const payloadForObs = {
        "specializationId": ele.id,
        "unitId": unitId
      };
      return this.httpClient.post<any>(updDepts, payloadForObs);
    });
    return forkJoin(obsArray$);
  }


  updateDepartments(payload): Observable<any> {
    const unitId$ = of(payload.unitId);
    const mbid$ = of(payload.mbid);
    const statusForUpdate$ = of(payload.statusForUpdate);
    const updDepts = `${BASE_URL}/departments`;
    const statusForUpdate = payload.statusForUpdate;
    let updDepts$: any;
    if (statusForUpdate === 'post') {
      updDepts$ = this.httpClient.post<any>(updDepts, payload);
    } else {
      updDepts$ = this.httpClient.put<any>(updDepts, payload);
    }
    return forkJoin([updDepts$, unitId$, statusForUpdate$, mbid$]);
  }

  getUnitSpecialityDetails(payload): Observable<any> {
    const tenantId = payload.tenantId;

    const unitId = payload.unitId;
    let url = `${BASE_URL_CLIENT}/clientservice/unit/specialization/${unitId}`;
    delete payload.unitId;
    //revisit
    url = url + "?tenantId=" + payload.tenantId;
    delete payload.tenantId;

    return this.httpClient.get<any>(url)
      .pipe(
        map((data: any) => data)
      );
  }

  updateUnitSpecialityDetails(payload): Observable<any> {
    const token: string = this.authService.getToken();
    const tenantId = payload.tenantId;
    const unitId = payload.unitId;
    const headersConfig = {
      'Authorization': `bearer ${token}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    };
    const headers = new HttpHeaders(headersConfig);
    let params = new HttpParams(),
      url = `${BASE_URL_CLIENT}/clientservice/unit/specialization/${unitId}?tenantId=${payload.tenantId}`,
      ids = "id=" + payload.id.join("&id=");
    if (payload.approvalId) {
      ids += "&approvalId="+payload.approvalId;
    }

    return this.noninterceptor.post<any>(url, ids, { params, headers })
      .pipe(
        map((data: any) => data)
      );
  }

  deleteDepartment(payload): Observable<any> {
    const mbid = payload.mbid;
    const unitId = payload.unitId;
    const url = `${BASE_URL}/departments/` + payload.mbid;
    const delDep$ = this.httpClient.delete<any>(url);
    const unitId$ = of(unitId);
    const mbid$ = of(mbid);
    return forkJoin([delDep$, mbid$, unitId$]);
  }

  allBulkDepartments(payload): Observable<any> {
    const selectedSpecialities = payload.selectedSpecialities;
    const obsArray$ = selectedSpecialities.map(ele => {
      const updDepts = `${BASE_URL}/departments`;
      let payloadForObs = {
        ...payload,
        name: ele.label
      };
      delete payloadForObs['selectedSpecialities'];
      return this.httpClient.post<any>(updDepts, payloadForObs);
    });
    const unitId$ = of(payload.unitId);
    const statusForUpdate$ = of(payload.statusForUpdate);
    obsArray$.unshift(unitId$);
    obsArray$.unshift(statusForUpdate$);
    return forkJoin(obsArray$);
  }

  getUnitSpecialityDetailsById(specId){
    let url = `${BASE_URL_MASTER}/masterservice/specialization/${specId}`;
    return this.httpClient.get<any>(url);
  }

}
