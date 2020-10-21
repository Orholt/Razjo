import { NotesService } from './../addnote/notes.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendarview',
  templateUrl: './calendarview.component.html',
  styleUrls: ['./calendarview.component.css']
})
export class CalendarviewComponent implements OnInit {

  constructor(private notesService: NotesService) { }

  overlay;

  ngOnInit(): void {
    this.overlay = false;
  }

  logOut()
  {
    this.notesService.logOut();
  }

}
