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

@Injectable({
  providedIn: 'root'
})
export class CalendarserviceService {

  apiUrl = 'https://razjoapi.herokuapp.com/api';
  reqHeader;
  public events: CalendarEvent[];
  constructor(private http: HttpClient) { }

    headerToToken()
    {
      this.reqHeader = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token')
     });
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
