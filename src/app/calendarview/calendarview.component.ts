import { NotesService } from './../addnote/notes.service';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { reduce } from 'rxjs/operators';
import { colors } from './colors';

@Component({
  selector: 'app-calendarview',
  templateUrl: './calendarview.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./calendarview.component.css']
})
export class CalendarviewComponent implements OnInit {

  locale = 'pl';

  view: CalendarView = CalendarView.Month;

  viewDate: Date = new Date();

  events: CalendarEvent[] = [
    {
      title: 'Click me',
      color: colors.red,
      start: new Date(),
    },
    {
      title: 'Or click me',
      color: colors.yellow,
      start: new Date(),
    },
  ];

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
