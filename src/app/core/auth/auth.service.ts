import { HttpClient, HttpBackend, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { LocalStorageService } from '@app/core/local-storage/local-storage.service';
import { catchError, tap } from 'rxjs/operators';
import { NgxPermissionsService } from 'ngx-permissions';
import { apiPoints } from 'api-config';

const BASE_URL = apiPoints.BASE_URL_MEDBUD;
const BASE_CLIENT_URL = apiPoints.BASE_CLIENT_URL;
const BASE_URL_MASTER = apiPoints.BASE_URL_MASTER;

@Injectable()
export class AuthService {

  noninterceptor: HttpClient;

  constructor(
    private http: HttpClient,
    private handler: HttpBackend,
    private localStorageService: LocalStorageService,
    private permissionsService: NgxPermissionsService
  ) {
    this.noninterceptor = new HttpClient(handler);
  }

  getToken(): string {
    return this.localStorageService.getItem('token');
  }

  loadPermissions(perm) {
    this.permissionsService.loadPermissions(perm);
  }

  logIn(credentials): Observable<any> {
    const userName = credentials.username;
    const password = credentials.password;
    const url = `${BASE_URL_MASTER}/masterservice/oauth/token?grant_type=password&username=${userName}&password=${password}`;
    return this.noninterceptor.post<any>(url, {}, { headers: this.noninterceptorHeaders });
  }

  validateToken(token): Observable<any> {
    const url = `${BASE_URL_MASTER}/masterservice/oauth/verify_token?token=${token}`;
    return this.noninterceptor.get<any>(url);
  }

  changePassword(payload): Observable<any> {
    const url = `${BASE_URL_MASTER}/masterservice/user/password/${payload.password1}`;
    const headersConfig = {
      'Authorization': payload.header
    };
    const headers = new HttpHeaders(headersConfig);
    return this.noninterceptor.put<any>(url, {}, { headers: headers });
  }

  get noninterceptorHeaders(): HttpHeaders {
    const headersConfig = {
      'Authorization': 'Basic bWVkYnVkOm1lZGJ1ZA=='
    };
    return new HttpHeaders(headersConfig);
  }

  getUser() {
    const url = `${BASE_URL_MASTER}/masterservice/user/self`;
    return this.http.get<any>(url)
      .pipe(
        catchError(this.handleError('getData'))
      );
  }

  private handleError(operation: String) {
    return (err: any) => {
      let errMsg = `error`;
      if (err instanceof HttpErrorResponse) {
        console.log(`status: ${err.status}, ${err.statusText}`);
      }
      return Observable.throw(errMsg);
    }
  }

  signUp(email: string, password: string): Observable<any> {
    const url = `${BASE_URL}/register`;
    return this.noninterceptor.post<any>(url, { email, password });
  }

  getStatus(): Observable<any> {
    const url = `${BASE_URL}/status`;
    return this.noninterceptor.get<any>(url);
  }
}
