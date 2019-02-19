import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '@app/core/auth/auth.service';

@Injectable()
export class NoAuthGuardService implements CanActivate {

  constructor(
    public auth: AuthService,
    public router: Router
  ) {}

  canActivate(): boolean {
    if (this.auth.getToken()) {
      this.router.navigateByUrl('/home');
      return false;
    }
    return true;
  }

}
