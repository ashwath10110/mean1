import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable()
export class GrowlService {

    constructor(private messageService: MessageService) { }

    showGrowl(messageObj) {
        this.messageService.clear();
        const obj = {
            severity: 'success',
            summary: 'Service Message',
            detail: 'Via MessageService'
        };
        this.messageService.add(messageObj);
    }
    
}
