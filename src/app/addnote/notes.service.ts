import { INoteUpdate } from './../allnotes/INoteUpdate';
import { NoteUpdate } from './../allnotes/NoteUpdate';
import { CalendarserviceService } from './../calendarview/calendarservice.service';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { INote } from './Note';
import { IAddNote } from './AddNote';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  apiUrl = 'https://razjoapi.herokuapp.com/api';
  $notes: Array<INote>;
  header;
  constructor(private http: HttpClient, private router: Router, private calendarService: CalendarserviceService) { }

  getNotes()
  {
    // tslint:disable-next-line: prefer-const
    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token')
   });
    return this.http.get<INote[]>(this.apiUrl + '/PrivateNotes/getNotes', { headers: reqHeader });
  }
  addNote(note: IAddNote)
  {
        // tslint:disable-next-line: prefer-const
        let reqHeader = new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token')
       });
        return this.http.post<INote>(this.apiUrl + '/PrivateNotes/add', note, { headers: reqHeader });
  }
  logOut()
  {
    this.router.navigate(['']);
    localStorage.removeItem('token');
    localStorage.removeItem('usrName');
    localStorage.removeItem('familyId');
    localStorage.removeItem('role');
  }

  updateNote(x: INoteUpdate)
  {
    // tslint:disable-next-line: prefer-const
    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token')
   });

    return this.http.put<NoteUpdate>(this.apiUrl + '/PrivateNotes/update', x, { headers: reqHeader });
  }
}
