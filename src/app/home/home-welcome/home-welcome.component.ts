import { Component, OnInit, Inject } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState, selectAuthState } from '@app/core/core.state';
import { User } from '@app/core/auth/user';
import { LocalStorageService } from '@app/core/local-storage/local-storage.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'anms-home-welcome',
  templateUrl: './home-welcome.component.html',
  styleUrls: ['./home-welcome.component.scss']
})
export class HomeWelcomeComponent implements OnInit {

  isAuthenticated: boolean;
  loading: boolean;
  stocks: any;

  user: User = new User();
  getState: any;
  errorMessage: string | null;

  selectBusinessType = false;
  tenantId = "";

  constructor(
    private store: Store<AppState>,
    private localStorageService: LocalStorageService,
    public dialog: MatDialog,
    private router: Router,
  ) {
    // this.getState = this.store.select(selectAuthState);
  }

  ngOnInit() {
    // this.getState.subscribe((state) => {
    //   this.stocks = state;
    //   if (state.user && state.user.data) {
    //   }
    //   this.errorMessage = state.errorMessage;
    //   this.isAuthenticated = state.isAuthenticated;
    //   this.loading = state.loading;
    // });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      if (!this.selectBusinessType) {
        this.selectBusinessType = true;
        // this.handleRouting();
      }
    });
  }

  handleRouting() {
    if (this.stocks.user.data.roles === 'ROLE_PORTAL_ADMIN' || this.stocks.user.data.roles === 'ROLE_SUPER_ADMIN') {
      this.handleSuperAdmin();
    }
    else if (this.stocks.user.data.roles === 'ROLE_ADMIN') {
      this.handleRoleAdmin();
    }
    else if (this.stocks.user.data.roles === 'ROLE_USER') {
      this.router.navigate(['home/welcome']);
    }
  }
  handleSuperAdmin() {
    this.openBusinessTypeDialog();
  }

  handleRoleAdmin() {
    this.router.navigate(['home/client/welcome']);
  }

  handleUser() {}

  handleLeadOnboarding() {
    this.openBusinessTypeDialog();
  }

  logOut(): void {}

  openBusinessTypeDialog() {
    const dialogRef = this.dialog.open(BusinessTypeDialog, {
      width: '700px',
      data: { name: "", animal: "" }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.handleRoutes(result);
      }
    });
  }

  handleRoutes(result) {
    // if (result.name == "AGENCIES") {
    //   this.router.navigate(['home/business-list/agencies']);
    // }
    // else if (result.name == "CLIENTS") {
    //   this.router.navigate(['home/business-list/clients']);
    // }
    // else if (result.name == "ALL") {
    //   this.router.navigate(['home/business-list/all']);
    // }
  }
}

export interface DialogData {
  name: string;
  data: any;
  tenantId: string;
}

@Component({
  selector: 'business-type-dialog',
  templateUrl: 'business-type-dialog.html',
})
export class BusinessTypeDialog {

  tenantId = '';
  categories: any[];
  selectedCategory: string;
  clientContractFormGroup: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<BusinessTypeDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.categories = [
      { name: 'AGENCIES', icon: 'store' },
      { name: 'CLIENTS', icon: 'people' },
      { name: 'ALL', icon: 'done_all' }
    ];
    this.clientContractFormGroup = this._formBuilder.group({
      selectedCategory: [
        null,
        Validators.compose([Validators.required])
      ],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmitClientContract(event) {
    this.dialogRef.close(event.value.selectedCategory);
  }

  //Contacts component testing
  contacts: any;

}