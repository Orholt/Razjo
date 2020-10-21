import { NotesService } from './../addnote/notes.service';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CalendarEvent, CalendarView } from 'angular-calendar';

@Component({
  selector: 'app-calendarview',
  templateUrl: './calendarview.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./calendarview.component.css']
})
export class CalendarviewComponent implements OnInit {
  view: CalendarView = CalendarView.Month;

  viewDate: Date = new Date();

  events: CalendarEvent[] = [];

  clickedDate: Date;

  clickedColumn: number;

  constructor(private notesService: NotesService) { }

  overlay;
  ngOnInit(): void {
    this.overlay = false;
  }

  logOut()
  {
    this.notesService.logOut();
  }

  eventClicked({ event }: { event: CalendarEvent }): void {
    console.log('Event clicked', event);
    }
  }
