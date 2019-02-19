import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApprovalsComponent } from './approvals/approvals.component';
import { ApprovalsListComponent } from './approvals-list/approvals-list.component';
import { ApprovalsRoutingModule } from '@app/modules/approvals/approvals.routes';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { SharedModule } from '@app/common/shared';

import { ApprovalsService } from '@app/state/approvals/approvals.service';
import { ApprovalsFacade } from '@app/state/approvals/approvals.facade';

import {DropdownModule} from 'primeng/dropdown';
import { DataTableModule } from 'primeng/primeng';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';

@NgModule({
  imports: [
    CommonModule,
    ApprovalsRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    SharedModule,

    DataTableModule,
    TableModule,
    PaginatorModule,
    DropdownModule

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [ApprovalsService, ApprovalsFacade],
  declarations: [ApprovalsComponent, ApprovalsListComponent]
})
export class ApprovalsModule { }
