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

      if (localStorage.getItem('familyId') === 'none')
     {
       this.familyId = 'none';
       this.manyfamilies = false;
     }
     else if (!localStorage.getItem('familyId').startsWith('array$'))
     {
      this.familyId = localStorage.getItem('familyId');
      this.manyfamilies = false;
     }
     else if (localStorage.getItem('familyId').startsWith('array$'))
     {
        let t: string;
        let arr: Array<string>;
        t = localStorage.getItem('familyId').startsWith('array$').toString();
        arr = t.split('$');
        arr.shift();
        this.familyIds = arr;
        this.manyfamilies = true;
     }
    }

    addNote(note: IAddNote)
    {
      return this.http.post<AddNote>(this.apiUrl + '/Calendar/addNote', note, { headers: this.reqHeader });
    }
    getLastNotes(familyId: ICalGetLastNotes)
    {
      return this.http.post<CalGetLastNotes[]>(this.apiUrl + '/Calendar/getLastNotes', familyId, { headers: this.reqHeader });
    }
    getNotesForMonth(x: IGetNotesforMonth)
    {
      return this.http.post<CalGetLastNotes[]>(this.apiUrl + '/Calendar/getNotesForMonth', x, { headers: this.reqHeader });
    }
    addVisit(x: IAddVisit)
    {
      return this.http.post<CalGetLastNotes[]>(this.apiUrl + '/Calendar/addVisit', x, { headers: this.reqHeader });
    }
    getLastVisits(x: IGetLastVisits)
    {
      return this.http.post<CalGetLastNotes[]>(this.apiUrl + '/Calendar/getLastVisits', x, { headers: this.reqHeader });
    }
    getVisitsForMonth(x: IGetVisitsforMonth)
    {
      return this.http.post<CalGetLastNotes[]>(this.apiUrl + '/Calendar/getVisitsForMonth', x, { headers: this.reqHeader });
    }
}
