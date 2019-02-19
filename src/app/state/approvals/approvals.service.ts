import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpBackend } from '@angular/common/http';
import { Observable, of, forkJoin } from 'rxjs';
import { apiPoints } from 'api-config';
import { map } from 'rxjs/operators';
import { DetailsService } from '@app/state/details/details.service';
import { DoctorsService } from '@app/state/doctors/doctors.service';
import { AuthService } from '@app/core/auth/auth.service';


const BASE_URL_CLIENT = apiPoints.BASE_URL_CLIENT;

@Injectable()
export class ApprovalsService {
  noninterceptor:HttpClient;

  constructor(
    private httpClient: HttpClient,
    private detailsService: DetailsService,
    private doctorsService: DoctorsService,
    private handler: HttpBackend,
    private authService: AuthService
  ) { 
    this.noninterceptor = new HttpClient(handler);
  }

  getTenants(): Observable<any> {
    const url = `${BASE_URL_CLIENT}/clientservice/all`;
    return this.httpClient.get<any>(url)
  }

  getApprovals(): Observable<any> {
    const url = `${BASE_URL_CLIENT}/masterservice/approval/client/status/PENDING`;
    return this.httpClient.get<any>(url)
  }

  rejectApprovals(payload): Observable<any> {
    payload.approvalStatus = 'REJECTED';
   // delete payload.requestedAt;
  // delete payload.requestedUser;
   // delete payload.data;
   // delete payload.comments;
    const tenantId = payload.tenantId;
    const url = `${BASE_URL_CLIENT}/masterservice/approval/details`;
    const rejectApprovals$ = this.httpClient.put<any>(url, payload);
    const tenantId$ = of(tenantId);
    return forkJoin([rejectApprovals$, tenantId$]);
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

  bulkApprove(payload): Observable<any> {
    console.log("Use the payload to access bulk approvals array");
    console.log(payload);
    const token: string = this.authService.getToken();
    const headersConfig = {
      'Authorization': `bearer ${token}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    };
    const headers = new HttpHeaders(headersConfig);
    let params = new HttpParams(),
        ids = [];
    
    payload.forEach(obj => {
      ids.push(obj.id)
    });
    let tenantId = payload[0].clientId;
    let approvalIds = "id=" + ids.join("&id=");
    const url = `${BASE_URL_CLIENT}/masterservice/approval/approve/all?tenantId=${tenantId}&${approvalIds}`;
    return this.noninterceptor.put<any>(url,null, { headers: headers })
      .pipe(
        map((data: any) => data)
      );
  }

  bulkReject(payload): Observable<any> {
    console.log("Use the payload to access bulk approvals array");
    console.log(payload);
    const token: string = this.authService.getToken();
    const headersConfig = {
      'Authorization': `bearer ${token}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    };
    const headers = new HttpHeaders(headersConfig);
    let params = new HttpParams(),
        ids = [];
    
    payload.forEach(obj => {
      ids.push(obj.id)
    });
    let tenantId = payload[0].clientId;
    let approvalIds = "id=" + ids.join("&id=");
    const url = `${BASE_URL_CLIENT}/masterservice/approval/reject/all?tenantId=${tenantId}&${approvalIds}`;
    return this.noninterceptor.put<any>(url,null, { headers: headers })
      .pipe(
        map((data: any) => data)
      );
  }

  getData(approval) {
    let obs$ = of(null);
    let tenantId = approval.clientId || "currentClient";
    let data = JSON.parse(approval.data);
    let unitId = data.id;

    switch (approval.section) {

      case "UNIT_DETAILS": {
        obs$ = this.detailsService.getUnitDetails({
          tenantId: tenantId,
          unitId: unitId
        });
        break;
      } 

      case "UNIT_CONTACT_DETAILS": {
        obs$ = this.detailsService.getUnitAddressDetails({
          tenantId: tenantId,
          unitId: unitId
        });
        break;
      }

      case "UNIT_FINANCE_DETAILS": {
        obs$ = this.detailsService.getUnitFinance({
          tenantId: tenantId,
          unitId: unitId
        });
        break;
      }

      case "UNIT_SPECIALIZATIONS": {
        break;
      }

      case "PARTNER_DETAILS": {
        break;
      }
      case "DOCTOR_DETAILS": {
        obs$ = this.doctorsService.getDoctorByDocId({
          tenantId: tenantId,
          doctorId: data.id
        });
        break;
      }

      case "PARTNER_CONTACT_DETAILS": {
        break;
      }

      case "PARTNER_FINANCE_DETAILS": {
        break;
      }

      case "UNIT_USER_DETAILS": {
        break;
      }

      case "PARTNER_CONTACT_PERSON_DETAILS": {
        break;
      }

      default: {
        alert("Not handled, plz check");
        break;
      }

    }

    return obs$;
  }

}
