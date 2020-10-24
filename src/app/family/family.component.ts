import { Family } from './../auth/UserObjG';
import { LoginService } from './../auth/login.service';
import { IFamilySendMailWithCode } from './models/IFamilySendMailWithCode';
import { IFamilyJoin } from './models/IFamilyJoin';
import { FamilyCreate } from './models/FamilyCreate';
import { FamilyService } from './family.service';
import { NotesService } from './../addnote/notes.service';
import { Component, OnInit } from '@angular/core';
import { IFamilyCreate } from './models/IFamilyCreate';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-family',
  templateUrl: './family.component.html',
  styleUrls: ['./family.component.css']
})
export class FamilyComponent implements OnInit {

  overlay;
  generatedCode;
  invitationCode;
  familyName;
  emailToSend;
  isPSY = true;
  hasFamily;
  familyId;
  $res: FamilyCreate;
  familises: FamilyCreate[];

  constructor(private notesService: NotesService, private familyService: FamilyService, private loginService: LoginService) { }

  ngOnInit(): void {
    this.checkOut();
    this.familyId = localStorage.getItem('familyId');
    this.getFamilies();
  }

  getElements()
  {
    this.familyName = document.getElementById('nazwaRodziny');
    this.generatedCode = document.getElementById('generatedCode');
    this.invitationCode = document.getElementById('invitationCode');
    this.emailToSend = document.getElementById('emailToSend');
  }

  getFamilies()
  {
    if (this.isPSY === true && this.hasFamily === true)
    {
      this.familises = JSON.parse(localStorage.getItem('x'));
    }
    else
    {
      this.familises = [];
    }
  }

  checkOut()
  {
    if (localStorage.getItem('role') === 'PSY')
    {
      this.isPSY = true;
    }
    else
    {
      this.isPSY = false;
    }
    // familyCheck
    if (localStorage.getItem('familyId') !== 'none' && !localStorage.getItem('familyId').startsWith('array'))
    {
      this.hasFamily = true;
    }
    else if (localStorage.getItem('familyId') !== 'none' && localStorage.getItem('familyId').startsWith('array'))
    {
      this.hasFamily = true;
    }
    else if (localStorage.getItem('familyId') === 'none')
    {
      this.hasFamily = false;
    }
  }

  //#region  metody
  // tslint:disable: prefer-const
  // !methods
  createFamily()
  {
    this.overlay = true;
    this.getElements();
    if (this.familyName.value === '')
    {
      this.overlay = false;
      Swal.fire({
        icon: 'error',
        title: 'Wystąpił błąd!',
        text: 'Pole z nazwą rodziny nie może być puste!'
      });
    }
    else
    {
    let x: IFamilyCreate = {
      familyName: this.familyName.value
    };

    this.familyService.createFamily(x).subscribe({
      next: data => {
        this.$res = data;
        this.generatedCode.value = data.invitationCode;
        this.overlay = false;
        this.afterFamilyCreate(data);
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
  }

  joinFamily()
  {
    this.overlay = true;
    this.getElements();
    let x: IFamilyJoin = {
      invitationCode: this.invitationCode.value
    };
    this.familyService.joinFamily(x).subscribe({
      next: data => {
        this.overlay = false;
        Swal.fire({
          icon: 'success',
          title: 'Zakończono pomyślnie!',
          text: 'Pomyślnie dołączono do rodziny!',
          footer: 'Za chwilę nastąpi wylogowanie'
        });
        this.notesService.logOut();
      },
      error: err => {
        Swal.fire({
          icon: 'error',
          title: 'Wystąpił błąd!',
          text: 'Wystąpił błąd podczas dołączania do rodziny',
          footer: err.error.errors
        });
        this.overlay = false;
      }
    });
  }

  sendMailWithCodeFamily()
  {
    this.overlay = true;
    this.getElements();
    let sel = document.getElementById('sel') as HTMLSelectElement;
    let x: IFamilySendMailWithCode = {
      familyId: this.familises[sel.selectedIndex].familyId,
      email: this.emailToSend.value
    };
    this.familyService.sendMailWithCodeFamily(x).subscribe({
      next: data => {
        this.overlay = false;
        Swal.fire({
          icon: 'success',
          title: 'Zakończono pomyślnie!',
          text: 'Pomyślnie wysłano kod z zaproszeniem!',
          footer: '<br>Adres email: </br>' + this.emailToSend.value
        });
        this.emailToSend.value = '';
      },
      error: err => {
        Swal.fire({
          icon: 'error',
          title: 'Wystąpił błąd!',
          text: 'Wystąpił błąd podczas wysyłania zaproszenia',
          footer: err.error.errors
        });
        this.overlay = false;
      }
    });
  }

  removeFamily()
  {
    this.overlay = true;
    this.getElements();
    let sel = document.getElementById('seldel') as HTMLSelectElement;
    let t = this.familises[sel.selectedIndex].familyName;
    let q = sel.selectedIndex;
    this.familyService.removeFamily(this.familises[sel.selectedIndex].familyId).subscribe({
      next: data => {
        this.overlay = false;
        Swal.fire({
          icon: 'success',
          title: 'Zakończono pomyślnie!',
          text: 'Pomyślnie usunięto rodzinę!',
          footer: '<b>Nazwa rodziny: </b>' + t
        });
        this.afterFamilyRemove(q);
      },
      error: err => {
        Swal.fire({
          icon: 'error',
          title: 'Wystąpił błąd!',
          text: 'Wystąpił błąd podczas usuwania rodziny',
          footer: err.error.errors
        });
        this.overlay = false;
      }
    });
  }
  //#endregion metody

  logOut()
  {
    this.notesService.logOut();
  }

  afterFamilyCreate(x: FamilyCreate)
  {
    this.familises.push(x);
  }

  afterFamilyRemove(x: number)
  {
    this.familises.splice(x , 1);
  }

}
