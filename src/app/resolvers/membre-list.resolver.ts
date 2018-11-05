import { Injectable } from '@angular/core';
import { User } from '../Models/User';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from '../services/User.service';
import { AlertifyService } from '../services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable()
export class MemberListResolver implements Resolve<User> {
    pageNumber = 1;
    pageSize = 5;
        constructor(private userService: UserService, private router: Router,
            private authService: AuthService , private alertify: AlertifyService) {
    }
    resolve(route: ActivatedRouteSnapshot): Observable<User> {
        return this.userService.getUsers(this.pageNumber, this.pageSize ).pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving data for users');
                this.router.navigate(['/home']);
                return of(null);
            })
        );
    }
}
