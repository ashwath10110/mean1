import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';

import { ROUTE_ANIMATIONS_ELEMENTS } from '@app/core';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientListComponent {

  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;

  @Input()
  tenantType: any;

  @Input()
  tenantsList: any;

  @Output()
  part2Flow: EventEmitter<string> = new EventEmitter();

  @Output()
  deleteTenant: EventEmitter<string> = new EventEmitter();

  @Output()
  viewTenant: EventEmitter<string> = new EventEmitter();

  @Output()
  setUpTenant: EventEmitter<string> = new EventEmitter();

  @Output()
  initTenant: EventEmitter<string> = new EventEmitter();

  deleteTenantFn(tenant: any) {
    this.deleteTenant.emit(tenant);
  }

  setupHospitalUnits(tenant: any) {
    this.part2Flow.emit(tenant);
  }

  initTenantFn(tenant: any) {
    this.initTenant.emit(tenant);
  }

  viewTenantFn(tenant: any) {
    this.viewTenant.emit(tenant);
  }

  setupTenantFn(tenant: any) {
    this.setUpTenant.emit(tenant);
  }

}
