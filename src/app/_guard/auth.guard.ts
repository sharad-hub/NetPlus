import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AlertifyService } from '../services/alertify.service';
// import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
 constructor(private authService: AuthService, private router: Router,
private alertify: AlertifyService) {
}
  canActivate( ): boolean {
    if (this.authService.loggedIn()) {
      return true;
    }
    this.alertify.error('You are not authorised');
    this.router.navigate(['/home']);
    }
  // canActivate(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot
  // ):   Observable<boolean> | Promise<boolean> | boolean {
  //   return true;
  // }

}
