import { IGetNotesforMonth } from './models/ICalGetNotesForMonth';
import { CalendarserviceService } from './calendarservice.service';
import { NotesService } from './../addnote/notes.service';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { reduce } from 'rxjs/operators';
import { colors } from './utils/colors';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-calendarview',
  templateUrl: './calendarview.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./calendarview.component.css']
})
export class CalendarviewComponent implements OnInit {

  constructor(private notesService: NotesService, private calendarService: CalendarserviceService) { }

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
    this.calendarService.headerToToken();
    this.getNotesForThisMonth();
  }


  logOut()
  {
    this.notesService.logOut();
  }

//#region calendarservice
  // !CalendaService
  getNotesForThisMonth()
  {
    let x: IGetNotesforMonth =
    {
      familyId: 'xd',
      month: (new Date().getMonth() + 1).toString()
    };

    let $res;
    this.calendarService.getNotesForMonth(x).subscribe({
      next: data => {
        $res = data;
        this.overlay = false;
        console.log(data);
      },
      error: err => {
        Swal.fire({
          icon: 'error',
          title: 'Wystąpił błąd!',
          text: 'Wystąpił błąd pobierania danych',
          footer: err.error.errors
        });
        this.overlay = false;
      }
    });
  }

  getNotesForMonth(y: number)
  {
    let x: IGetNotesforMonth =
    {
      familyId: 'xd',
      month: (new Date().getMonth() + 1 + y).toString()
    };

    let $res;
    this.calendarService.getNotesForMonth(x).subscribe({
      next: data => {
        $res = data;
        this.overlay = false;
        // console.log(data);
      },
      error: err => {
        Swal.fire({
          icon: 'error',
          title: 'Wystąpił błąd!',
          text: 'Wystąpił błąd pobierania danych',
          footer: err.error.errors
        });
        this.overlay = false;
      }
    });
  }


  // !
//#endregion

  eventClicked({ event }: { event: CalendarEvent }): void {
    console.log('Event clicked', event);
    }
}

