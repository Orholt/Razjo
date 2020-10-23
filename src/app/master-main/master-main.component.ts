import { Component, OnInit } from '@angular/core';
import { CalendarserviceService } from './../calendarview/calendarservice.service';
import { NotesService } from './../addnote/notes.service';
import { isNull } from '@angular/compiler/src/output/output_ast';
import { isDefined } from '@angular/compiler/src/util';
import { LoginService } from '../auth/login.service';
import { IUserObj } from '../auth/UserObjG';

@Component({
  selector: 'app-master-main',
  templateUrl: './master-main.component.html',
  styleUrls: ['./master-main.component.css']
})
export class MasterMainComponent implements OnInit {

  $request: IUserObj;
  areThereAnyNotes;
  usrName = localStorage.getItem('usrName');
  constructor(private loginService: LoginService, private noteService: NotesService, private Calendarservice: CalendarserviceService) { }

  ngOnInit(): void {
    this.$request = this.loginService.$reqObj as IUserObj;
    if (localStorage.getItem('usrName') === null)
    {
      this.usrName = 'Anon';
    }
    this.Calendarservice.headerToToken();
    this.areThereAnyNotes = this.noteService.areThereAnyNotes;
  }

  logOut()
  {
    this.noteService.logOut();
  }
}
