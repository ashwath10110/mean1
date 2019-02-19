import { Injectable } from '@angular/core';
import { GrowlService } from '@app/core/growl.service';

@Injectable()
export class AppService {

    constructor(private growlService: GrowlService) { }

    logError(payload, showError) {
        if (showError) {
            if (payload.status || payload.error || !payload.ok) {
                this.growlService.showGrowl({
                    severity: this.getStatus(payload.status),
                    summary: payload.error.error_description,
                    detail: payload.error.error
                });
            }
        }
    }

    showMsg(detail, message, showError){
        if(!showError){
            this.growlService.showGrowl({
                severity: 'success',
                summary: message,
                detail: detail
            })
        }
    }

    getStatus(statusCode) {
        return statusCode >= 400 ? 'error' : 'success';
    }

}
