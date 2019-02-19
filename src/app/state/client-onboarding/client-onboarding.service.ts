import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { apiPoints } from 'api-config';

const BASE_URL = apiPoints.BASE_URL_MEDBUD;
const BASE_CLIENT_URL = apiPoints.BASE_CLIENT_URL;
const BASE_URL_CLIENT = apiPoints.BASE_URL_CLIENT;
const BASE_URL_MASTER = apiPoints.BASE_URL_MASTER;


@Injectable()
export class ClientOnboardingService {

  constructor(private httpClient: HttpClient) { }

  getFinanceDetailsTenant(tenantId): Observable<any> {
    const url = `${BASE_URL_CLIENT}/clientservice/account?tenantId=${tenantId}`;
    return this.httpClient.get<any>(url)
      .pipe(
        map((data: any) => data)
      );
  }

  getContractDetailsTenant(payload): Observable<any> {
    const url = `${BASE_URL_CLIENT}/clientservice/contract?tenantId=${payload.tenantId}`;
    delete payload.tenantId;
    return this.httpClient.get<any>(url)
      .pipe(
        map((data: any) => data)
      );
  }

  getClientDetails(payload): Observable<any> {
    const url = `${BASE_URL_CLIENT}/clientservice/details/?tenantId=` + payload.tenantId;
    return this.httpClient.get<any>(url)
      .pipe(
        map((data: any) => data)
      );
  }

  getAdminAccountDetailsTenant(payload): Observable<any> {
    const url = `${BASE_URL_CLIENT}/clientservice/contact/?tenantId=` + payload.tenantId;
    return this.httpClient.get<any>(url)
      .pipe(
        map((data: any) => data)
      );
  }

  getClientContacts(payload): Observable<any> {
    const url = `${BASE_URL_CLIENT}/clientservice/contact/person?tenantId=` + payload.tenantId;
    return this.httpClient.get<any>(url)
      .pipe(
        map((data: any) => data)
      );
  }

  // getAdminContactsTenant(payload): Observable<any> {
  //   const url = `${BASE_URL_CLIENT}/clientservice/contacts?tenantId=` + payload.tenantId;
  //   return this.httpClient.get<any>(url)
  //     .pipe(
  //       map((data: any) => data)
  //     );
  // }

  // getTenantUsers(): Observable<any> {
  //   const url = `${BASE_URL}/TenantService/user/tenant`;
  //   return this.httpClient.get<any>(url)
  //     .pipe(
  //       map((data: any) => data)
  //     );
  // }

  // getUsersByUnitId(payload): Observable<any> {
  //   const url = `${BASE_URL_CLIENT}/clientservice/unit/` + payload.unitId;
  //   return this.httpClient.get<any>(url)
  //     .pipe(
  //       map((data: any) => data)
  //     );
  // }

  getClientAdminUser(payload): Observable<any> {
    const url = `${BASE_URL_MASTER}/masterservice/user/${payload.tenantId}?tenantId=${payload.tenantId}`;
    return this.httpClient.get<any>(url)
      .pipe(
        map((data: any) => data)
      );
  }

  // createClient(payload): Observable<any> {
  //   const url = `${BASE_URL}/TenantService/tenants`;
  //   const newPayload = {
  //     ...payload,
  //     "address": "string",
  //     "description": "string",
  //     "email": "string",
  //     "init": false,
  //     "mobile": "123456789",
  //     "name": payload.clientName,
  //     "tenantType": payload.clientType
  //   };
  //   const createTenant$ = this.httpClient.post<any>(url, newPayload);
  //   return createTenant$
  //     .pipe(
  //       map((data: any) => data)
  //     );
  // }

  // updateClientAdminAccountData(payload): Observable<any> {
  //   const statusForUpdate = payload.statusForUpdate;
  //   let url;
  //   if (statusForUpdate === 'put') {
  //     url = `${BASE_URL_CLIENT}/clientservice/contact/?tenantId=` + payload.tenantId;
  //     delete payload.tenantId;
  //     delete payload['statusForUpdate'];
  //     return this.httpClient.put<any>(url, payload)
  //       .pipe(
  //         map((data: any) => data)
  //       );
  //   }
  //   else {
  //     url = `${BASE_URL_MASTER}/clientservice/contact/details?tenantId=` + payload.tenantId;
  //     delete payload.tenantId;
  //     delete payload['statusForUpdate'];
  //     return this.httpClient.post<any>(url, payload)
  //       .pipe(
  //         map((data: any) => data)
  //       );
  //   }
  // }

  updateClientAccountAdminDetails(payload): Observable<any> {
    const statusForUpdate = payload.statusForUpdate;
    let url;
    if (statusForUpdate === 'put') {
      url = `${BASE_URL_CLIENT}/clientservice/contact/?tenantId=` + payload.tenantId;
      delete payload.tenantId;
      delete payload['statusForUpdate'];
      delete payload['name'];
      return this.httpClient.put<any>(url, payload)
        .pipe(
          map((data: any) => data)
        );
    }
    else {
      url = `${BASE_URL_CLIENT}/clientservice/contact/details?tenantId=` + payload.tenantId;
      delete payload.tenantId;
      delete payload['statusForUpdate'];
      delete payload['name'];
      return this.httpClient.post<any>(url, payload)
        .pipe(
          map((data: any) => data)
        );
    }
  }

  updateClientDetails(payload): Observable<any> {
    const statusForUpdate = payload.statusForUpdate;
    let url;
    if (statusForUpdate === 'put') {
      url = `${BASE_URL_CLIENT}/clientservice/details?tenantId=` + payload.tenantId;
      delete payload.tenantId;
      delete payload['statusForUpdate'];
      return this.httpClient.put<any>(url, payload)
        .pipe(
          map((data: any) => data)
        );
    }
    else {
      url = `${BASE_URL_CLIENT}/clientservice/details?tenantId=` + payload.tenantId;
      delete payload.tenantId;
      delete payload['statusForUpdate'];
      return this.httpClient.post<any>(url, payload)
        .pipe(
          map((data: any) => data)
        );
    }
  }
  
  updateClientContactsData(payload): Observable<any> {
    const tenantId = payload.tenantId;
    let url;
    if (tenantId) {
      url = `${BASE_URL_CLIENT}/clientservice/contact/person?tenantId=` + payload.tenantId;
      delete payload.tenantId;
    }
    else {
      url = `${BASE_URL_CLIENT}/clientservice/contact/person`;
    }
    if (payload.statusForUpdate === 'put') {
      return this.httpClient.put<any>(url, payload.value)
        .pipe(
          map((data: any) => data)
        );
    }
    else {
      return this.httpClient.post<any>(url, payload.value)
        .pipe(
          map((data: any) => data)
        );
    }
  }

  updateFinance(payload): Observable<any> {
    const statusForUpdate = payload.statusForUpdate;
    let tenantId = payload.tenantId,
      url = `${BASE_URL_CLIENT}/clientservice/account?tenantId=${tenantId}`;
    if (statusForUpdate === 'put') {
      delete payload.tenantId;
      return this.httpClient.put<any>(url, payload)
        .pipe(
          map((data: any) => data)
        );
    } else {
      delete payload.tenantId;
      return this.httpClient.post<any>(url, payload)
        .pipe(
          map((data: any) => data)
        );
    }
  }

  updateContract(payload): Observable<any> {
    const statusForUpdate = payload.statusForUpdate;
    const url = `${BASE_URL_CLIENT}/clientservice/contract?tenantId=${payload.tenantId}`;
    const newPayload = {
      ...payload,
    };

    delete newPayload['tenantId'];
    if (statusForUpdate === 'put') {
      delete newPayload['statusForUpdate'];
      return this.httpClient.put<any>(url, newPayload)
        .pipe(
          map((data: any) => data)
        );
    } else {
      delete newPayload['statusForUpdate'];
      delete newPayload['id'];
      return this.httpClient.post<any>(url, newPayload)
        .pipe(
          map((data: any) => data)
        );
    }
  }

  updateInfo(payload): Observable<any> {
    const statusForUpdate = payload.statusForUpdate;
    const url = `${BASE_URL_CLIENT}/clientservice/details`;
    
    if (statusForUpdate === 'put') {
      delete payload['statusForUpdate'];
      return this.httpClient.put<any>(url, payload)
        .pipe(
          map((data: any) => data)
        );
    } else {
      delete payload['statusForUpdate'];
      return this.httpClient.post<any>(url, payload)
        .pipe(
          map((data: any) => data)
        );
    }
  }

  updateClientAdminUser(payload): Observable<any> {
    const statusForUpdate = payload.statusForUpdate;
    let tenantId = payload.tenantId
    payload["id"] = tenantId;
    delete payload['statusForUpdate'];
    delete payload.tenantId;
    payload["flowState"] = null;
    if (statusForUpdate === 'put') {
      //payload.status = "ACTIVE";
      let url = `${BASE_URL_MASTER}/masterservice/user/${tenantId}?tenantId=${tenantId}`;
      return this.httpClient.put<any>(url, payload)
        .pipe(
          map((data: any) => data)
        );
    } else {
      delete payload.status;
      let url = `${BASE_URL_MASTER}/masterservice/user/details?tenantId=${tenantId}`;
      return this.httpClient.post<any>(url, payload)
        .pipe(
          map((data: any) => data)
        );
    }
  }
  /////////////////////////////////////////////////////////////////////////////

  // getDoctors(): Observable<any> {
  //   const url = `${BASE_CLIENT_URL}/ClientService/doctors`;
  //   return this.httpClient.get<any>(url)
  //     .pipe(
  //       map((data: any) => data)
  //     );
  // }


  // addDoctorsToUnit(payload): Observable<any> {
  //   const unitId = payload.unitId;
  //   const selectedDoctors = payload.doctors;
  //   const addDoctorToUnit = `${BASE_CLIENT_URL}/ClientService/doctors`;
  //   const addDoctorsToUnit$ = selectedDoctors.map(ele => {
  //     const payloadForCurrentDoctor = {
  //       ...ele,
  //       unitIds: [...ele.unitIds, unitId]
  //     };
  //     return this.httpClient.put<any>(addDoctorToUnit, payloadForCurrentDoctor);
  //   });
  //   return forkJoin(addDoctorsToUnit$);
  // }


  // getDoctorsByUnitId(unitId): Observable<any> {
  //   const url = `${BASE_CLIENT_URL}/ClientService/doctors/unit/` + unitId;
  //   return this.httpClient.get<any>(url)
  //     .pipe(
  //       map((data: any) => data)
  //     );
  // }

  // // getAllDocDeptUnitByDeptId(unitId: string): Observable < any > {
  // //   const url = `${BASE_URL}/doctors/mapping/unit/` + unitId;
  // //   return this.httpClient.get < any > (url)
  // //     .pipe(
  // //       map((data: any) => data)
  // //     );
  // // }

  // getAllDepartments(): Observable<any> {
  //   const url = `${BASE_URL}/TenantService/specialization`;
  //   return this.httpClient.get<any>(url)
  //     .pipe(
  //       map((data: any) => data)
  //     );
  // }

  // getDepartmentsByUnitId(payload): Observable<any> {
  //   const url = `${BASE_URL}/TenantService/specialization/` + payload.unitId;
  //   return this.httpClient.get<any>(url)
  //     .pipe(
  //       map((data: any) => data)
  //     );
  // }

  // addDepartmentsToUnit(payload): Observable<any> {
  //   const unitId = payload.unitId;
  //   const selectedSpecialities = payload.selectedSpecialities;
  //   const obsArray$ = selectedSpecialities.map(ele => {
  //     const updDepts = `${BASE_CLIENT_URL}/ClientService/unit-spec-mapping/`;
  //     const payloadForObs = {
  //       "specializationId": ele.id,
  //       "unitId": unitId
  //     };
  //     return this.httpClient.post<any>(updDepts, payloadForObs);
  //   });
  //   return forkJoin(obsArray$);
  // }

  // updateContactDetailsUnits(payload): Observable<any> {
  //   const url = `${BASE_URL}/units`;
  //   let obs$ = this.httpClient.post<any>(url, payload);
  //   if (payload.statusForUpdate == 'put') {
  //     obs$ = this.httpClient.put<any>(url, payload);
  //   } else {
  //     obs$ = this.httpClient.post<any>(url, payload);
  //   }
  //   return obs$
  //     .pipe(
  //       map((data: any) => data)
  //     );
  // }

  // updateAddressDetailsUnits(payload): Observable<any> {
  //   const url = `${BASE_URL}/units`;
  //   return this.httpClient.put<any>(url, payload)
  //     .pipe(
  //       map((data: any) => data)
  //     );
  // }

  // updateDepartments(payload): Observable<any> {
  //   const unitId$ = of(payload.unitId);
  //   const mbid$ = of(payload.mbid);
  //   const statusForUpdate$ = of(payload.statusForUpdate);
  //   const updDepts = `${BASE_URL}/departments`;
  //   const statusForUpdate = payload.statusForUpdate;
  //   let updDepts$: any;
  //   if (statusForUpdate === 'post') {
  //     updDepts$ = this.httpClient.post<any>(updDepts, payload);
  //   } else {
  //     updDepts$ = this.httpClient.put<any>(updDepts, payload);
  //   }
  //   return forkJoin([updDepts$, unitId$, statusForUpdate$, mbid$]);
  // }

  // deleteDepartment(payload): Observable<any> {
  //   const mbid = payload.mbid;
  //   const unitId = payload.unitId;
  //   const url = `${BASE_URL}/departments/` + payload.mbid;
  //   const delDep$ = this.httpClient.delete<any>(url);
  //   const unitId$ = of(unitId);
  //   const mbid$ = of(mbid);
  //   return forkJoin([delDep$, mbid$, unitId$]);
  // }

  // createTenant(payload): Observable<any> {
  //   const processedPayload = {
  //     ...payload
  //   };
  //   const url = `${BASE_URL_CLIENT}/clientservice/details`;
  //   return this.httpClient.post<any>(url, processedPayload)
  //     .pipe(
  //       map((data: any) => data)
  //     );
  // }

  // updateTenant(payload): Observable<any> {
  //   const url = `${BASE_URL}/tenants`;
  //   return this.httpClient.put<any>(url, payload)
  //     .pipe(
  //       map((data: any) => data)
  //     );
  // }

  // deleteTenantUnit(payload): Observable<any> {
  //   const url = `${BASE_URL}/units/` + payload.mbid;
  //   return this.httpClient.delete<any>(url)
  //     .pipe(
  //       map((data: any) => data)
  //     );
  // }

  // getTenantUnits(symbol): Observable<any> {
  //   const url = `${BASE_URL_CLIENT}/clientservice/unit`;
  //   return this.httpClient.get<any>(url)
  //     .pipe(
  //       map((data: any) => data)
  //     );
  // }

  // deleteTenant(payload): Observable<any> {
  //   const url = `${BASE_URL_CLIENT}/clientservice/details?tenantId=` + payload.tenantId;
  //   const deleteTenant$ = this.httpClient.delete<any>(url);
  //   const id$ = of(payload.tenantId);
  //   return forkJoin([deleteTenant$, id$]);
  // }

  // deleteUser(payload): Observable<any> {
  //   const url = `${BASE_URL}/users/` + payload.mbid;
  //   const deleteDoctor$ = this.httpClient.delete<any>(url);
  //   const mbid$ = of(payload.mbid);
  //   return forkJoin([deleteDoctor$, mbid$]);
  // }

  // createTenantUnit(payload): Observable<any> {
  //   const url = `${BASE_URL_CLIENT}/clientservice/unit`;
  //   return this.httpClient.post<any>(url, payload)
  //     .pipe(
  //       map((data: any) => data)
  //     );
  // }

  // getTenantUnitDetails(symbol): Observable<any> {
  //   const url = `${BASE_URL}/units/details`;
  //   return this.httpClient.get<any>(url)
  //     .pipe(
  //       map((data: any) => data)
  //     );
  // }

  // updatePartnerFinanceData(payload): Observable<any> {
  //   let obs$: any;
  //   const url = `${BASE_CLIENT_URL}/ClientService/partners/bank`;
  //   if (payload.statusForUpdate == 'put') {
  //     obs$ = this.httpClient.put<any>(url, payload);
  //   } else {
  //     obs$ = this.httpClient.post<any>(url, payload);
  //   }
  //   return obs$
  //     .pipe(
  //       map((data: any) => data)
  //     );
  // }

  // createUser(payload): Observable<any> {
  //   payload = {
  //     "email": "string",
  //     "firstName": "string",
  //     "isActive": true,
  //     "isd": "string",
  //     "lastName": "string",
  //     "metadata": "string",
  //     "mobile": "string",
  //     "password": "password",
  //     "permissions": "string",
  //     "role": "ADMIN",
  //     "tenantId": "da012679-38e7-4305-ae09-20b01b826d38",
  //     "username": new Date().toString(),
  //     statusForUpdate: 'post'
  //   };
  //   const url = `${BASE_URL}/user/details`;
  //   let obs$: any;
  //   if (payload.statusForUpdate == 'put') {
  //     obs$ = this.httpClient.put<any>(url, payload);
  //   } else {
  //     obs$ = this.httpClient.post<any>(url, payload);
  //   }
  //   return obs$
  //     .pipe(
  //       map((data: any) => data)
  //     );
  // }

  // updateDoctor(payload): Observable<any> {
  //   const updDocs = `${BASE_CLIENT_URL}/ClientService/doctors`;
  //   let updDocs$: any;
  //   updDocs$ = this.httpClient.put<any>(updDocs, payload);
  //   return updDocs$;
  // }

  // addDoctor(payload): Observable<any> {
  //   const updDocs = `${BASE_CLIENT_URL}/ClientService/doctors`;
  //   let updDocs$: any;
  //   updDocs$ = this.httpClient.post<any>(updDocs, payload);
  //   return updDocs$;
  // }

  // removeDoctorFromUnit(payload): Observable<any> {
  //   const updDocs = `${BASE_CLIENT_URL}/ClientService/doctors`;
  //   let unitId = payload.unitId;
  //   let doctor = payload.doctor;
  //   let doctorId = doctor.id;
  //   var index = doctor.unitIds.indexOf(unitId);
  //   if (index > -1) {
  //     doctor.unitIds.splice(index, 1);
  //   }
  //   const doctorId$ = of(doctorId);
  //   const updDocs$ = this.httpClient.put<any>(updDocs, doctor);
  //   return forkJoin([updDocs$, doctorId$]);
  // }


  // getTenantDetails(): Observable<any> {
  //   const url = `${BASE_URL_CLIENT}/clientservice/details`;
  //   return this.httpClient.get<any>(url)
  //     .pipe(
  //       map((data: any) => data)
  //     );
  // }

  // getPartners(): Observable<any> {
  //   const url = `${BASE_CLIENT_URL}/ClientService/partners`;
  //   return this.httpClient.get<any>(url)
  //     .pipe(
  //       map((data: any) => data)
  //     );
  // }

  // createPartner(payload): Observable<any> {
  //   const url = `${BASE_CLIENT_URL}/ClientService/partners`;
  //   let obs$: any;
  //   if (payload.statusForUpdate == 'put') {
  //     obs$ = this.httpClient.put<any>(url, payload);
  //   } else {
  //     obs$ = this.httpClient.post<any>(url, payload);
  //   }
  //   return obs$
  //     .pipe(
  //       map((data: any) => data)
  //     );
  // }

  // deletePartner(payload): Observable<any> {
  //   console.log(payload);
  //   const url = `${BASE_CLIENT_URL}/ClientService/partners/` + payload.id;
  //   const deleteDoctor$ = this.httpClient.delete<any>(url);
  //   const mbid$ = of(payload.id);
  //   return forkJoin([deleteDoctor$, mbid$]);
  // }

  // getPartner(payload): Observable<any> {
  //   console.log(payload);
  //   const url = `${BASE_CLIENT_URL}/ClientService/partners/` + payload.id;
  //   const getPartner$ = this.httpClient.get<any>(url);
  //   const mbid$ = of(payload.id);
  //   return forkJoin([getPartner$, mbid$]);
  // }

  // // updateUser(payload): Observable<any> {
  // //   let obs$: any;
  // //   const url = `${BASE_CLIENT_URL}/ClientService/partners/bank`;
  // //   if (payload.statusForUpdate == 'put') {
  // //     obs$ = this.httpClient.put<any>(url, payload);
  // //   }
  // //   else {
  // //     obs$ = this.httpClient.post<any>(url, payload);
  // //   }
  // //   return obs$
  // //     .pipe(
  // //       map((data: any) => data)
  // //     );
  // // }

  // updateUserTestForUsersPage(payload): Observable<any> {
  //   let obs$: any;
  //   let cachingRoles = {
  //     ...payload
  //   };
  //   const url = `${BASE_URL}/TenantService/user/details?tenantId=` + payload.tenantId;
  //   payload.password = "password";
  //   if (payload.statusForUpdate == 'put') {
  //     obs$ = this.httpClient.put<any>(url, payload);
  //   } else {
  //     obs$ = this.httpClient.post<any>(url, payload);
  //   }
  //   return obs$
  //     .pipe(
  //       switchMap(res => {
  //         let rolesPayload = res['data'];
  //         rolesPayload.scopes = cachingRoles.rolesAndScopes;
  //         const addRoles = `${BASE_CLIENT_URL}/ClientService/unit-user-mapping`;
  //         let roles = rolesPayload.scopes;
  //         let role$ = roles.map(ele => {
  //           const userId = res['data'].id;
  //           const payload_ = {
  //             "unitId": ele.unit.id,
  //             "userId": userId,
  //             "userRole": ele.role
  //           };
  //           const addRole$ = this.httpClient.post<any>(addRoles, payload_);
  //           return addRole$;
  //         });
  //         return forkJoin([...role$, of(res['data'])]);
  //       }))
  //     .pipe(
  //       map((data: any) => data)
  //     );
  // }

  // getPartnerFinance(payload): Observable<any> {
  //   console.log(payload);
  //   const url = `${BASE_CLIENT_URL}/ClientService/partners/bank/patner/` + payload.id;
  //   const getPartnerFinanceData$ = this.httpClient.get<any>(url);
  //   const mbid$ = of(payload.id);
  //   return forkJoin([getPartnerFinanceData$, mbid$]);
  // }

  // getPartnerContactData(payload): Observable<any> {
  //   console.log(payload);
  //   const url = `${BASE_CLIENT_URL}/ClientService/partners/contacts/patner/` + payload.id;
  //   const getPartnerContactData$ = this.httpClient.get<any>(url);
  //   const mbid$ = of(payload.id);
  //   return forkJoin([getPartnerContactData$, mbid$]);
  // }

  // updatePartnerContactData(payload): Observable<any> {
  //   console.log(payload);
  //   let obs$: any;
  //   const url = `${BASE_CLIENT_URL}/ClientService/partners/contacts`;
  //   if (payload.statusForUpdate == 'put') {
  //     obs$ = this.httpClient.put<any>(url, payload);
  //   } else {
  //     obs$ = this.httpClient.post<any>(url, payload);
  //   }
  //   return obs$
  //     .pipe(
  //       map((data: any) => data)
  //     );
  // }


  // deleteDoctor(payload): Observable<any> {
  //   const id = payload.id;
  //   const url = `${BASE_CLIENT_URL}/ClientService/doctors/` + payload.id;
  //   const deleteDoctor$ = this.httpClient.delete<any>(url);
  //   const id$ = of(id);
  //   return forkJoin([deleteDoctor$, id$]);
  // }

  deleteClientContactDetails(payload): Observable<any> {
    const tenantId = payload.tenantId;
    let obs$: any;
    const url = tenantId ? `${BASE_URL_CLIENT}/clientservice/contact/person/${payload.id}?tenantId=` + tenantId : `${BASE_URL_CLIENT}/clientservice/contact/person/${payload.id}`;
    const deleteContact$ = this.httpClient.delete<any>(url);
    const mbid$ = of(payload.id);
    return forkJoin([deleteContact$, mbid$]);
  }

  // allBulkDepartments(payload): Observable<any> {
  //   const selectedSpecialities = payload.selectedSpecialities;
  //   const obsArray$ = selectedSpecialities.map(ele => {
  //     const updDepts = `${BASE_URL}/departments`;
  //     let payloadForObs = {
  //       ...payload,
  //       name: ele.label
  //     };
  //     delete payloadForObs['selectedSpecialities'];
  //     return this.httpClient.post<any>(updDepts, payloadForObs);
  //   });
  //   const unitId$ = of(payload.unitId);
  //   const statusForUpdate$ = of(payload.statusForUpdate);
  //   obsArray$.unshift(unitId$);
  //   obsArray$.unshift(statusForUpdate$);
  //   return forkJoin(obsArray$);
  // }

}
