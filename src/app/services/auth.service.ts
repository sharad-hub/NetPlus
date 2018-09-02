import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
baseAuthUrl = 'https://localhost/api/auth/' ;
constructor(private http: HttpClient) { }

login(model: any) {
return this.http.post(this.baseAuthUrl + 'login', model)
.pipe(
  map((response: any) => {
     const user = response;
     if (user) {
       localStorage.setItem('token', user.token);
     }
  })
);
}
register(model: any) {
 return this.http.post(this.baseAuthUrl + 'register', model);
}
}
