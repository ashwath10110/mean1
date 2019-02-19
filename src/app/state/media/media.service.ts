import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpBackend, HttpParams } from '@angular/common/http';
import { Observable, of, forkJoin } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { apiPoints } from 'api-config';
import { AuthService } from '@app/core/auth/auth.service';

const BASE_URL = apiPoints.BASE_URL_MEDBUD;
const BASE_CLIENT_URL = apiPoints.BASE_CLIENT_URL;
const BASE_URL_CLIENT = apiPoints.BASE_URL_CLIENT;
const BASE_URL_MASTER = apiPoints.BASE_URL_MASTER;

@Injectable()
export class MediaService {

    noninterceptor: HttpClient;

    constructor(
        private httpClient: HttpClient,
        private handler: HttpBackend,
        private authService: AuthService) {
        this.noninterceptor = new HttpClient(handler);
    }

    getUnitMedia(payload): Observable<any> {
        const url = `${BASE_URL_CLIENT}/clientservice/unit/media/${payload.unitId}/?tenantId=` + payload.tenantId;
        const obs$ = this.httpClient.get<any>(url);
        return obs$
            .pipe(
                map((data: any) => data)
            );
    }

    uploadUnitMedia(payload): Observable<any> {
        const token: string = this.authService.getToken();
        const headersConfig = {
            'Authorization': `bearer ${token}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        };
        const headers = new HttpHeaders(headersConfig);
        let params = new HttpParams();
        let ids = "id=" + payload.id.join("&id=");
        const url = `${BASE_URL_CLIENT}/clientservice/unit/media/${payload.unitId}/?tenantId=` + payload.tenantId;
        const obs$ = this.noninterceptor.post(url, ids, { params, headers });
        return obs$
            .pipe(
                map((data: any) => data)
            );
    }

    approveUploadUnitMedia(payload): Observable<any> {
        const token: string = this.authService.getToken();
        const headersConfig = {
            'Authorization': `bearer ${token}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        };
        const headers = new HttpHeaders(headersConfig);
        let params = new HttpParams();
        let ids = "id=" + payload.id.join("&id=");
        let url = `${BASE_URL_CLIENT}/clientservice/unit/media/${payload.unitId}/?tenantId=` + payload.tenantId;
        if(payload.approvalId){
            url+= `&approvalId=`+payload.approvalId;
        }
        const obs$ = this.noninterceptor.post(url, ids, { params, headers });
        return obs$
            .pipe(
                map((data: any) => data)
            );
    }

    uploadFiles(payload): Observable<any> {
        let fileObj = payload;
        const tenantId = fileObj.tenantId;
        const tag = fileObj.tag;
        const attachmentType = fileObj.attachmentType;
        const token: string = this.authService.getToken();
        const headersConfig = {
            'Authorization': `bearer ${token}`
        };
        const headers = new HttpHeaders(headersConfig);
        let params = new HttpParams();
        let formData: FormData = new FormData();
        let obs$: any;
        if (fileObj.shouldMerge) {
            const url = `${BASE_URL_MASTER}/masterservice/attachment/upload/multiple?tag=${tag}&tenantId=${tenantId}`;
            for (var i = 0; i < fileObj.file.length; i++) {
                formData.append('file', fileObj.file[i].file);
                formData.append('attachmentType', attachmentType);
            }
            obs$ = this.noninterceptor.post(url, formData, { params, headers });
            return forkJoin([of(payload), obs$])
                .pipe(
                    map((data: any) => data),
                    catchError(error => {
                        console.log(error);
                        return of(error)
                    })
                );
        }
        else {
            const url = `${BASE_URL_MASTER}/masterservice/attachment/upload/multiple?tag=${tag}&tenantId=${tenantId}`;
            let fileUpload$ = [];
            for (var i = 0; i < fileObj.file.length; i++) {
                formData.append('file', fileObj.file[i].file);
                formData.append('attachmentType', attachmentType);
                const obs$ = this.noninterceptor.post(url, formData, { params, headers });
                fileUpload$.push(obs$);
            }
            return forkJoin([of(payload), ...fileUpload$])
                .pipe(
                    map((data: any) => data),
                    catchError(error => {
                        console.log(error);
                        return of(error)
                    })
                );
        }
    }

    getFileObservable() {

    }

    getFileMetaData(data, tenantId): Observable<any> {
        const token: string = this.authService.getToken();
        const headersConfig = {
            'Authorization': `bearer ${token}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        };
        const headers = new HttpHeaders(headersConfig);
        let params = new HttpParams();
        let ids = "id=" + data.join("&id=");
        const url = `${BASE_URL_MASTER}/masterservice/attachment/metadata?tenantId=` + tenantId + '&' + ids;
        const obs$ = this.noninterceptor.get(url, { params, headers });
        return obs$
            .pipe(
                map((data: any) => data)
            );
    }

    downloadFile(attachment, tenantId): Observable<any> {
        const token: string = this.authService.getToken();
        const headersConfig = {
            'Authorization': `bearer ${token}`,
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
        };
        const headers = new HttpHeaders(headersConfig);
        let params = new HttpParams();
        const url = `${BASE_URL_MASTER}/masterservice/attachment/` + attachment.id + `?tenantId=` + tenantId;
        const obs$ = this.noninterceptor.get(url, { params, headers, responseType: 'blob' as 'json' });
        const attachment$ = of(attachment);
        return forkJoin([obs$, attachment$]);
    }

    // let headers = new HttpHeaders();
    // headers = headers.set('Accept', 'application/pdf');
    // return this.http.get(url, { headers: headers, responseType: 'blob' });

}
