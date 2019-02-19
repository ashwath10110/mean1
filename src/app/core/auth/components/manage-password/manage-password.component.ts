import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, selectAuthState } from '@app/core/core.state';
import { ActionAuthLogin, GetUser, ChangePassword, ValidateToken, ValidateTokenSuccess, AuthActionTypes, ChangePasswordSuccess } from '@app/core/auth/auth.actions';
import { User } from '@app/core/auth/user';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { authReducer } from '../../auth.reducer';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-manage-password',
  templateUrl: './manage-password.component.html',
  styleUrls: ['./manage-password.component.css']
})
export class ManagePasswordComponent implements OnInit {

  user: User = new User();
  getState: any;
  errorMessage: string | null;
  public form: FormGroup;
  loading = false;

  sub: any;
  token: any;

  obj = {};

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private updates$: Actions
  ) {
    this.getState = this.store.select(selectAuthState);
  }

  ngOnInit() {
    this.getState.subscribe((state) => {
      this.loading = state.loading;
      this.errorMessage = state.errorMessage;
    });
    this.sub = this.route.params.subscribe(params => {
      this.token = params["token"];
    });
    this.initEffects();
    this.store.dispatch(new ValidateToken(this.token));
    this.form = this.fb.group({
      password1: [
        "",
        Validators.compose([Validators.required])
      ],
      password2: [
        "", Validators.compose([Validators.required])
      ]
    });

  }

  initEffects() {
    this.updates$.pipe(
      // TODO CHECK THE ACTIONS
      ofType<ValidateTokenSuccess>(AuthActionTypes.VALIDATE_TOKEN_SUCCESS),
      tap(action =>
        this.handleValidateTokenSuccess(action)
      )
    ).subscribe();

    this.updates$.pipe(
      // TODO CHECK THE ACTIONS
      ofType<ChangePasswordSuccess>(AuthActionTypes.CHANGE_PASSWORD_SUCCESS),
      tap(action =>
        this.handleChangePasswordSuccess(action)
      )
    ).subscribe();
  }

  handleValidateTokenSuccess(action) {
    this.obj = action.payload;
  }

  handleChangePasswordSuccess(action) {
    const url = 'login';
    alert('Your password has been changed successfully!!!');
    this.router.navigate([url]);
  }

  onSubmit(form): void {
    const payload = form.value;
    const header = this.obj['token_type'] + ' ' + this.obj['access_token'];
    this.store.dispatch(new ChangePassword({
      ...payload,
      header: header
    }));
  }

}

