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

  constructor(private http: HttpClient) { }

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
}
