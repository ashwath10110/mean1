import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, forkJoin } from 'rxjs';
import { map, switchMap, mergeMap, flatMap } from 'rxjs/operators';
import { apiPoints } from 'api-config';
import { UUID } from "angular2-uuid";

const BASE_URL = apiPoints.BASE_URL_MEDBUD;
const BASE_CLIENT_URL = apiPoints.BASE_CLIENT_URL;
const BASE_URL_MASTER = apiPoints.BASE_URL_MASTER;
const BASE_URL_CLIENT = apiPoints.BASE_URL_CLIENT;

@Injectable()
export class UsersService {

  constructor(private httpClient: HttpClient) { }

  getTenantUsers(): Observable<any> {
    const url = `${BASE_URL_CLIENT}/masterservice/user/tenant`;
    return this.httpClient.get<any>(url)
      .pipe(
        map((data: any) => data)
      );
  }

  getUsersByUnitId(payload): Observable<any> {
    const url = `${BASE_URL_CLIENT}/clientservice/unit/user/by-unit/` + payload.unitId + "?tenantId=" + payload.tenantId;
    return this.httpClient.get<any>(url)
      .pipe(
        map((data: any) => data)
      );
  }

  deleteUserUnitMappingById(payload): Observable<any> {
    const userDeatilsUrl = `${BASE_URL_CLIENT}/masterservice/user/` + payload.userId + `?tenantId=` + payload.tenantId;
    const unitMappingUsersurl = `${BASE_URL_CLIENT}/clientservice/unit/user/unit-id/` + payload.userId + `?userId=` + payload.userId;
    const id$ = of(payload.uumid);
    return this.httpClient.delete<any>(userDeatilsUrl).pipe(
      flatMap((data) => {
        const result = this.httpClient.delete<any>(unitMappingUsersurl);
        return forkJoin([of(data), id$]);
      })
    );
  }

  updateUserTestForUsersPage(payload): Observable<any> {
    let obs$: any;
    payload.role = 'ADMIN';
    payload.scopes = [];
    payload["tenantType"] = 'CLIENT';
    payload.rolesAndScopes.forEach((ele) => {
      let obj = {};
      obj["unitId"] = ele.unit.id;
      obj["userRole"] = ele.role;
      payload.scopes.push(obj);
    });
    const tenantId = payload.tenantId;
    let url;
    if (tenantId) {
      url = `${BASE_URL_CLIENT}/masterservice/user/details?tenantId=` + payload.tenantId;
    }
    else {
      url = `${BASE_URL_CLIENT}/masterservice/user/` + payload.userId;
    }
    payload.password = "password";
    delete payload.tenantId;
    delete payload.rolesAndScopes;
    if (payload.statusForUpdate == 'put') {
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


  updateUserUnitId(payload): Observable<any> {
    //ONLY POST IS DONE
    console.log(payload.user);
    let isPostMethod = payload.statusForUpdate === 'post';
    let updateUserUrl = `${BASE_URL_CLIENT}/masterservice/user/${payload.user.id}?tenantId=${payload.user.tenantId}`;
    let createUserUrl = `${BASE_URL_CLIENT}/masterservice/user/details?tenantId=${payload.user.tenantId}`;
    let unitUserMappingUrl = `${BASE_URL_CLIENT}/clientservice/unit/user/mappings?tenantId=${payload.user.tenantId}`;

    let unitUserMapping = {};
    unitUserMapping["scopes"] = [];
    let roleScopeObj = payload.user.rolesAndScopes;
    roleScopeObj.forEach((ele) => {
      let obj = {};
      obj["unitId"] = ele.unit.id;
      obj["userRoles"] = ele.roles;
      if (payload.statusForUpdate === 'put') {
        if (ele.id) {
          obj["mappingId"] = ele.id;
        } else {
          obj["mappingId"] = UUID.UUID()
        }

      }
      unitUserMapping["scopes"].push(obj);
    });

    payload.user.roles = ["DEFAULT"]

    delete payload.user.rolesAndScopes;
    delete payload.user.tenantId;
    if (payload.statusForUpdate === 'put') {
      return this.httpClient.put<any>(updateUserUrl, payload.user).pipe(
        flatMap((data) => {
          unitUserMapping["userId"] = data.data.id;
          return this.httpClient.put<any>(unitUserMappingUrl, unitUserMapping)
        })
      );
    } else {
      return this.httpClient.post<any>(createUserUrl, payload.user).pipe(
        flatMap((data) => {
          unitUserMapping["userId"] = data.data.id;
          return this.httpClient.post<any>(unitUserMappingUrl, unitUserMapping)
        })
      );
    }

  }

  getMappingUsers(payload): Observable<any> {
    const userMappingUrl = `${BASE_URL_CLIENT}/clientservice/unit/user/by-unit/` + payload.unitId + "?tenantId=" + payload.tenantId;
    const unitClientDetailsUrl = `${BASE_URL_CLIENT}/masterservice/user/tenant?tenantId=${payload.tenantId}`;
    delete payload.tenantId;
    return this.httpClient.get<any>(unitClientDetailsUrl).pipe(
      flatMap((data) => {
        const result = this.httpClient.get<any>(userMappingUrl);
        return forkJoin([of(data), result]);
      })
    );
  }

  deleteUserById(payload) {
    const deleteUserUrl = `${BASE_URL_CLIENT}/masterservice/user/${payload.userId}?tenantId=${payload.tenantId}`;
    const deleteUser$ = this.httpClient.delete<any>(deleteUserUrl);
    const mbid$ = of(payload.userId);
    return forkJoin([deleteUser$, mbid$]);
  }

  getUsersDataForApprovalView(payload) {
    const unitsUrl = `${BASE_URL_CLIENT}/clientservice/unit?tenantId=${payload.tenantId}`;
    const usersUrl = `${BASE_URL_CLIENT}/masterservice/user/${payload.userId}?tenantId=${payload.tenantId}`;
    const mappingsUrl = `${BASE_URL_CLIENT}/clientservice/unit/user/by-user-with-approvals/` + payload.userId + "?tenantId=" + payload.tenantId;
    
    const mappings$ = this.httpClient.get<any>(mappingsUrl);
    const users$ = this.httpClient.get<any>(usersUrl);
    const units$ = this.httpClient.get<any>(unitsUrl);
    return forkJoin([mappings$, users$, units$])
      .pipe(
        map((data: any) => data)
      );
  };

  getMappingUsersByUserId(payload): Observable<any> {
    const url = `${BASE_URL_CLIENT}/clientservice/unit/user/by-user/` + payload.userId + "?tenantId=" + payload.tenantId;
    return this.httpClient.get<any>(url)
      .pipe(
        map((data: any) => data)
      );
  }

  updateUserUnitMapping(payload): Observable<any> {
    let unitUserMappingUrl = `${BASE_URL_CLIENT}/clientservice/unit/user/mappings?tenantId=${payload.value.user.tenantId}`;
    let unitUserMapping = {};
    const statusForUpdate = payload.statusForUpdate;
    unitUserMapping["scopes"] = [];
    let roleScopeObj = payload.value.user.rolesAndScopes;
    roleScopeObj.forEach((ele) => {
      let obj = {};
      obj["unitId"] = ele.unit.id;
      obj["userRoles"] = ele.roles;
      if(payload.statusForUpdate === 'put'){
        if(ele.id){
          obj["mappingId"] = ele.id;
        } else {
          obj["mappingId"] = UUID.UUID()
        }
       
      }
      unitUserMapping["scopes"].push(obj);
    });
    unitUserMapping['userId'] = payload.value.user.userId;
    if(payload.statusForUpdate ==='put'){
      return this.httpClient.put<any>(unitUserMappingUrl, unitUserMapping)
      .pipe(
        map((data: any) => data)
      );
    } else {
      return this.httpClient.post<any>(unitUserMappingUrl, unitUserMapping)
      .pipe(
        map((data: any) => data)
      );
    }
    
  }
  
}
