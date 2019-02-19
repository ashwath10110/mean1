
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ApprovalsComponent } from '@app/modules/approvals/approvals/approvals.component';
import { ApprovalsListComponent } from '@app/modules/approvals/approvals-list/approvals-list.component';

const routes: Routes = [
  {
    path: '',
    component: ApprovalsComponent,
    children: [
     { path: '', redirectTo: "list", pathMatch: "full" },
      { path: 'list', component: ApprovalsListComponent },
     { path: "", redirectTo: "list" }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ApprovalsRoutingModule { }
