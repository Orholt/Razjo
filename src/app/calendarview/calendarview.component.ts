import { NotesService } from './../addnote/notes.service';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { reduce } from 'rxjs/operators';
import { colors } from './utils/colors';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-calendarview',
  templateUrl: './calendarview.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./calendarview.component.css']
})
export class CalendarviewComponent implements OnInit {

  constructor(private notesService: NotesService) { }

  locale = 'pl';

  view: CalendarView = CalendarView.Month;

  viewDate: Date = new Date();

  events: CalendarEvent[] = [
    {
      title: 'Notatka',
      color: colors.yellow,
      start: new Date(),
    },
  ];

  clickedDate: Date;

  clickedColumn: number;

  overlay;

  addEvent(date: any): void {

    console.log(date);
    // this.refresh.next();
  }

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
