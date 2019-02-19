import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { apiPoints } from 'api-config';

const BASE_URL = apiPoints.BASE_URL_MEDBUD;
const BASE_CLIENT_URL = apiPoints.BASE_URL_CLIENT;

@Injectable()
export class DoctorsService {

  constructor(private httpClient: HttpClient) { }

  getDoctors(): Observable<any> {
    const url = `${BASE_CLIENT_URL}/clientservice/doctor/client` + "?tenantId=" + "currentclient";
    return this.httpClient.get<any>(url)
      .pipe(
        map((data: any) => data)
      );
  }

  addDoctorsToUnit(payload): Observable<any> {
    const unitId = payload.unitId;
    const selectedDoctors = payload.doctors;
    const addDoctorToUnit = `${BASE_CLIENT_URL}/clientservice/doctor`;
    const addDoctorsToUnit$ = selectedDoctors.map(ele => {
      const payloadForCurrentDoctor = {
        ...ele,
        unitIds: [...ele.unitIds, unitId]
      };
      return this.httpClient.put<any>(addDoctorToUnit, payloadForCurrentDoctor);
    });
    return forkJoin(addDoctorsToUnit$);
  }

  getDoctorsByUnitId(payload): Observable<any> {
    const tenantId = payload.tenantId;
    const unitId = payload.unitId;
    let url;
    if (tenantId) {
      url = `${BASE_CLIENT_URL}/clientservice/doctor/unit/` + payload.unitId + "?tenantId=" + payload.tenantId;
      delete payload.tenantId;
    }
    return this.httpClient.get<any>(url)
      .pipe(
        map((data: any) => data)
      );
  }

  updateDoctor(payload): Observable<any> {
    const tenantId = payload.tenantId;
    const roles = payload.roles;
    let updDocs: any;
    if (tenantId) {
      updDocs = `${BASE_CLIENT_URL}/clientservice/doctor?tenantId=${payload.tenantId}`;
    }
    let updDocs$: any;
    updDocs$ = this.httpClient.put<any>(updDocs, payload);
    /*return updDocs$;*/
    return forkJoin([updDocs$, roles]);
  }

  addDoctor(payload): Observable<any> {
    const tenantId = payload.tenantId;
    const roles = payload.roles;
    delete payload.roles;
    let updDocs: any;
    if (tenantId) {
      updDocs = `${BASE_CLIENT_URL}/clientservice/doctor?tenantId=${payload.tenantId}`;
    }
    let updDocs$: any;
    updDocs$ = this.httpClient.post<any>(updDocs, payload);
    return forkJoin([updDocs$, roles]);
  }

  removeDoctorFromUnit(payload): Observable<any> {
    const updDocs = `${BASE_CLIENT_URL}/clientservice/doctor`;
    let unitId = payload.unitId;
    let doctor = payload.doctor;
    let doctorId = doctor.id;
    var index = doctor.unitIds.indexOf(unitId);
    if (index > -1) {
      doctor.unitIds.splice(index, 1);
    }
    const doctorId$ = of(doctorId);
    const updDocs$ = this.httpClient.put<any>(updDocs, doctor);
    return forkJoin([updDocs$, doctorId$]);
  }

  approveDoctor(payload): Observable<any> {
    payload = {
      ...payload,
      id: payload.approvalId,
      gstin: 'gstin'
    };
    const updDocUrl = `${BASE_CLIENT_URL}/clientservice/doctor?tenantId=${payload.tenantId}`;
    return this.httpClient.put<any>(updDocUrl, payload);
  }

  deleteDoctor(payload): Observable<any> {
    const tenantId = payload.tenantId;
    const id = payload.id;
    let url;
    if (tenantId) {
      url = `${BASE_CLIENT_URL}/clientservice/doctor/${payload.id}?tenantId=${payload.tenantId}`;
    } else {
      url = `${BASE_CLIENT_URL}/clientservice/doctor/` + payload.id;
    }

    const deleteDoctor$ = this.httpClient.delete<any>(url);
    const id$ = of(id);
    return forkJoin([deleteDoctor$, id$]);
  }

  getAllDocDeptUnitByDeptId(unitId: string): Observable<any> {
    const url = `${BASE_URL}/doctor/mapping/unit/` + unitId;
    return this.httpClient.get<any>(url)
      .pipe(
        map((data: any) => data)
      );
  }

  getDoctorByDocId(payload): Observable<any> {
    const url = `${BASE_CLIENT_URL}/clientservice/doctor/` + payload.doctorId + `?tenantId=` + payload.tenantId;
    return this.httpClient.get<any>(url)
      .pipe(
        map((data: any) => data)
      );
  }

}
