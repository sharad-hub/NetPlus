import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../Models/User';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
baseAuthUrl = 'https://localhost/api/auth/' ;
jwtHelper = new JwtHelperService();
decodedToken: any;
currentUser: User;
photoUrl = new BehaviorSubject<string>('../../assets/user.png');
currentPhotoUrl = this.photoUrl.asObservable();

constructor(private http: HttpClient) { }

changeMemberPhoto(photoUrl: string) {
  this.photoUrl.next(photoUrl);
}

login(model: any) {
return this.http.post(this.baseAuthUrl + 'login', model)
.pipe(
  map((response: any) => {
     const responseData = response;
     if (responseData) {
      localStorage.setItem('token', responseData.token);
      localStorage.setItem('user', JSON.stringify(responseData.user));
      this.decodedToken = this.jwtHelper.decodeToken(responseData.token);
      this.currentUser = responseData.user;
      this.changeMemberPhoto(this.currentUser.photoUrl);
     }
  })
);
}
register(model: any) {
 return this.http.post(this.baseAuthUrl + 'register', model);
}
loggedIn() {
  const token = localStorage.getItem('token');
  return !this.jwtHelper.isTokenExpired(token);
}
}
