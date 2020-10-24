import { GetLastVisits } from './models/GetLastVisits';
import { AddVisit } from './models/AddVisit';
import { IGetVisitsforMonth } from './models/IGetVisitsForMonth';
import { IGetLastVisits } from './models/IGetLastVisits';
import { IAddVisit } from './models/IAddVisit';
import { IGetNotesforMonth } from './models/ICalGetNotesForMonth';
import { CalGetLastNotes } from './models/CalGetLastNotes';
import { ICalGetLastNotes } from './models/ICalGetLastNotes';
import { IAddNote } from './models/IAddNote';
import { AddNote } from './models/AddNote';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { colors } from './utils/colors';
import { findLast } from '@angular/compiler/src/directive_resolver';

@Injectable({
  providedIn: 'root'
})
export class CalendarserviceService {

  apiUrl = 'https://razjoapi.herokuapp.com/api';
  reqHeader;
  familyId;
  familyIds: Array<string>;
  manyfamilies: boolean;

  public events: CalendarEvent[] = [];
  constructor(private http: HttpClient) { }

    headerToToken()
    {
      this.reqHeader = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token')
     });
    }

    familyHandler()
    {
      if (localStorage.getItem('familyId') === 'none')
     {
       this.familyId = 'none';
       this.manyfamilies = false;
     }
     else if (!localStorage.getItem('familyId').startsWith('array'))
     {
      this.familyId = localStorage.getItem('familyId');
      this.manyfamilies = false;
     }
     else if (localStorage.getItem('familyId').startsWith('array'))
     {
        let t: string;
        let arr: Array<string>;
        t = localStorage.getItem('familyId').toString();
        console.log(t);
        arr = t.split('$');
        arr.shift();
        this.familyIds = arr;
        this.manyfamilies = true;
        console.log(arr);
     }
    }

    addNote(note: IAddNote)
    {
      this.headerToToken();
      return this.http.post<AddNote>(this.apiUrl + '/Calendar/addNote', note, { headers: this.reqHeader });
    }
    getLastNotes(familyId: string)
    {
      this.headerToToken();
      return this.http.get<CalGetLastNotes[]>(this.apiUrl + `/Calendar/getLastNotes/${familyId}`, { headers: this.reqHeader });
    }
    getNotesForMonth(familyId: string, month: string)
    {
      this.headerToToken();
      return this.http.get<CalGetLastNotes[]>(this.apiUrl + `/Calendar/getNotesForMonth/${familyId}/${month}`, { headers: this.reqHeader });
    }
    addVisit(x: IAddVisit)
    {
      this.headerToToken();
      return this.http.post<AddVisit>(this.apiUrl + '/Calendar/addVisit', x, { headers: this.reqHeader });
    }
    getLastVisits(familyId: string)
    {
      this.headerToToken();
      return this.http.get<GetLastVisits[]>(this.apiUrl + `/Calendar/getLastVisits/${familyId}`, { headers: this.reqHeader });
    }
    getVisitsForMonth(familyId: string, month: string)
    {
      this.headerToToken();
      // tslint:disable-next-line: max-line-length
      return this.http.get<GetLastVisits[]>(this.apiUrl + `/Calendar/getVisitsForMonth/${familyId}/${month}`, { headers: this.reqHeader });
    }
}
