import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { User } from '../Models/User';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { PaginatedResult } from '../Models/Pagination';
import { map } from 'rxjs/operators';

const httpOptions = {
headers: new HttpHeaders({
  'Authorization': 'Bearer ' + localStorage.getItem('token')
})
};
@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiUrl;

constructor(private http: HttpClient) { }
getUsers(page?, itemsPerPage?): Observable<PaginatedResult<User[]>> {
  const paginationResult: PaginatedResult<User[]> = new PaginatedResult<User[]>();
  let params = new HttpParams();
  if (page != null && itemsPerPage != null) {
    params = params.append('pageNumber', page);
    params = params.append('pageSize', itemsPerPage);
  }
  return this.http.get<User[]>(this.baseUrl + 'users', { observe: 'response', params })
  .pipe(
    map(response => {
      paginationResult.result = response.body;
            if (response.headers.get('Pagination') != null) {
        paginationResult.pagination = JSON.parse(response.headers.get('Pagination'));
      }
      return paginationResult;
    })
  );
}
getUser(id: number): Observable<User> {
  return this.http.get<User>(this.baseUrl + 'users/' + id);
}
updateUser(id: number, user: User) {
  return this.http.put(this.baseUrl + 'users/' + id, user);
}

setMainPhoto(userId: number, id: number) {
  return this.http.post(this.baseUrl + 'users/' + userId + '/photos/' + id + '/setMain', {});
}

deletePhoto(userId: number, id: number) {
  return this.http.delete(this.baseUrl + 'users/' + userId + '/photos/' + id);
}
}
