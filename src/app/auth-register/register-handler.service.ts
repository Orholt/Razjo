import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { User } from './User';

@Injectable({
  providedIn: 'root'
})
export class RegisterHandlerService {
  apiUrl = 'https://razjoapi.herokuapp.com/api';
  constructor(private http: HttpClient) { }

  addUser(user: User): Observable <User>
  {
    return this.http.post<User>(this.apiUrl + '/User/register', user);
  }
}
