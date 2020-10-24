import { DateClass } from '../../family/models/FamilyCreate';
import { Family } from '../../auth/UserObjG';
import { Location } from '@angular/common';
import { NotesService } from '../../addnote/notes.service';
import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { CalendarEvent, CalendarMonthViewBeforeRenderEvent, CalendarView } from 'angular-calendar';
import { reduce } from 'rxjs/operators';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { colors } from 'src/app/calendarview/utils/colors';
import { CalendarserviceService } from 'src/app/calendarview/calendarservice.service';
import { GetNotesforMonth } from 'src/app/calendarview/models/CalGetNotesForMonth';
import { GetLastVisits } from 'src/app/calendarview/models/GetLastVisits';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CalendarComponent implements OnInit {

  // tslint:disable-next-line: max-line-length
  constructor(private notesService: NotesService, private calendarService: CalendarserviceService, private location: Location, private ref: ChangeDetectorRef ) { }

  //#region variables
  locale = 'pl';
  view: CalendarView = CalendarView.Month;
  refresh: Subject<any> = new Subject();
  viewDate: Date = new Date();
  events: CalendarEvent[] = [{
    title: 'test',
    color: colors.yellow,
    start: new Date()
  }];
  clickedDate: Date;
  clickedColumn: number;
  overlay;
  hasManyFamilies: boolean;
  hasAnyFamily: boolean;
  families: Family[] = [];
  isPSY = false;
  selector: HTMLSelectElement;
  selectorVisit: HTMLSelectElement;
  selectorNote: HTMLSelectElement;
  dataVisit: HTMLInputElement;
  noteText: HTMLInputElement;
  visitText: HTMLInputElement;
  microMode: boolean;
//#endregion

  ngOnInit(): void {
    this.events = this.calendarService.events;
    this.calendarService.headerToToken();
    this.calendarService.familyHandler();
    if (localStorage.getItem('role') === 'PSY') { this.isPSY = true; }
    this.families = JSON.parse(localStorage.getItem('x'));
    this.fetchForNotes();
  }
  // pobiera notatki i wizyty
  fetchForNotes()
  {
    this.events = [];
    // ! spr ilości rodzin
    if (this.families.length === 0)
    {
      this.hasAnyFamily = false;
      this.hasManyFamilies = false;
    }
    else if (this.families.length === 1)
    {
      this.hasAnyFamily = true;
      this.hasManyFamilies = false;
      this.getNotesForThisMonth(this.calendarService.familyId);
      this.getVisitsForThisMonth(this.calendarService.familyId);
      this.refresh.next();
    }
    else if (this.families.length > 1)
    {
      if ( localStorage.getItem('selectedFamily') !== this.families[0].familyId )
      {
        this.fetchForSelectedNotes();
      }
      else
      {
        this.hasAnyFamily = true;
        this.hasManyFamilies = true;
        this.getNotesForThisMonth(this.families[0].familyId);
        this.getVisitsForThisMonth(this.families[0].familyId);
        this.refresh.next();
      }
    }
  }
  fetchForSelectedNotes()
  {
    this.events = [];
    this.getNotesForThisMonth(localStorage.getItem('selectedFamily'));
    this.getVisitsForThisMonth(localStorage.getItem('selectedFamily'));
    this.refresh.next();
  }

//#region calendarservice
// tslint:disable: prefer-const
  // !CalendaService
  getNotesForThisMonth(familyId: string)
  {
    let $res: GetNotesforMonth[];
    let $tab: CalendarEvent;
    this.calendarService.getLastNotes(familyId).subscribe({
      next: data => {
        $res = data;
        this.overlay = false;
        // TODO: Przerabianie notatek;
        data.forEach(element => {
          $tab = {
            title: 'Notatka',
            id: 'note',
            color: colors.yellow,
            // tslint:disable-next-line: max-line-length
            start: new Date(parseInt(element.date.year, 10), parseInt(element.date.month, 10) - 1, parseInt(element.date.day, 10), parseInt(element.date.hour, 10), parseInt(element.date.minute, 10)),
            allDay: true,
            meta: element.message
          };
          this.events.push($tab);
          this.loopThroughObj(this.events);
        });
        this.calendarService.events = this.events;
        this.events = this.calendarService.events;
        this.overlay = false;
        // console.log(this.events);
      },
      error: err => {
        Swal.fire({
          icon: 'error',
          title: 'Wystąpił błąd!',
          text: 'Wystąpił błąd pobierania danych',
          footer: err.error.errors
        });
      }
    });
  }

  getVisitsForThisMonth(familyId: string)
  {
    let $res: GetLastVisits[];
    let $tab: CalendarEvent;
    //
    this.calendarService.getLastVisits(familyId).subscribe({
      next: data => {
        $res = data;
        this.overlay = false;
        // TODO: Przerabianie wizyt;
        data.forEach(element => {
          $tab = {
            title: 'Wizyta',
            id: 'visit',
            color: colors.red,
            // tslint:disable-next-line: max-line-length
            start: new Date(parseInt(element.date.year, 10), parseInt(element.date.month, 10) - 1, parseInt(element.date.day, 10), parseInt(element.date.hour, 10), parseInt(element.date.minute, 10)),
            allDay: true,
            meta: element.message
          };
          this.events.push($tab);
          this.loopThroughObj(this.events);
        });
      },
      error: err => {
        Swal.fire({
          icon: 'error',
          title: 'Wystąpił błąd!',
          text: 'Wystąpił błąd pobierania danych',
          footer: err.error.errors
        });
      }
    });
  }
  // !
//#endregion

  eventClicked({ event }: { event: CalendarEvent }): void {
    console.log('Event clicked', event);
    }

    loopThroughObj(res){
      let obj: Array<any> = [];
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < res.length; i++) {
        // tslint:disable-next-line: ban-types
        let event: Object = {
          id: res[i].id,
          title: res[i].title,
          color: res[i].color,
          repeating: res[i].repeating,
          meta: res[i].meta,
          start: new Date(res[i].start),
          end: new Date(res[i].end)
        };
        obj.push(event);
      }
      this.events = obj;
      this.refresh.next();
    }
}
