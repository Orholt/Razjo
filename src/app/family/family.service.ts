import { IFamilySendMailWithCode } from './models/IFamilySendMailWithCode';
import { FamilyJoin } from './models/FamilyJoin';
import { IFamilyJoin } from './models/IFamilyJoin';
import { FamilyCreate } from './models/FamilyCreate';
import { CalendarserviceService } from './../calendarview/calendarservice.service';
import { IFamilyCreate } from './models/IFamilyCreate';
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

  constructor( private http: HttpClient, private calendarService: CalendarserviceService) { }

  createFamily(x: IFamilyCreate)
  {
      return this.http.post<FamilyCreate>(this.apiUrl + '/Family/create', x, { headers: this.calendarService.reqHeader });
  }
  joinFamily(x: IFamilyJoin)
  {
      return this.http.post<FamilyJoin>(this.apiUrl + '/Family/join', x, { headers: this.calendarService.reqHeader });
  }
  sendMailWithCodeFamily(x: IFamilySendMailWithCode)
  {
      return this.http.post(this.apiUrl + '/Family/create', x, { headers: this.calendarService.reqHeader });
  }
}
