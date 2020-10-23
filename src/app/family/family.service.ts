import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FamilyService {

  apiUrl = 'https://razjoapi.herokuapp.com/api';
  reqHeader;
  familyId;
  familyIds: Array<string>;
  manyfamilies: boolean;

  constructor( private http: HttpClient) { }

  generateCode()
  {

  }
}
