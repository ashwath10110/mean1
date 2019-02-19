import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, selectAuthState } from '@app/core/core.state';
import { ActionAuthLogin, GetUser } from '@app/core/auth/auth.actions';
import { User } from '@app/core/auth/user';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  user: User = new User();
  getState: any;
  errorMessage: string | null;
  public form: FormGroup;
  loading = false;

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.getState = this.store.select(selectAuthState);
  }

  ngOnInit() {
    this.getState.subscribe((state) => {
      this.loading = state.loading;
      this.errorMessage = state.errorMessage;
    });
    const userName = 'super_admin@medbud.com';
    const password = 'password';
    this.form = this.fb.group({
      username: [
        userName,
        Validators.compose([Validators.required])
      ],
      password: [
        password, Validators.compose([Validators.required])
      ]
    });
  }

  onSubmit(form): void {
    const payload = form.value;
    this.store.dispatch(new ActionAuthLogin(payload));
  }
}