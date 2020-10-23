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

  constructor(private notesService: NotesService, private familyService: FamilyService) { }

  ngOnInit(): void {
    this.checkOut();
    this.familyName = document.getElementById('nazwaRodziny');
    this.generatedCode = document.getElementById('generatedCode');
    this.invitationCode = document.getElementById('invitationCode');
    this.emailToSend = document.getElementById('emailToSend');
    this.familyId = localStorage.getItem('familyId');
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
    else
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
    let x: IFamilyCreate = {
      familyname: this.familyName.value
    };
    this.familyService.createFamily(x).subscribe({
      next: data => {
        let $res: FamilyCreate;
        data = $res;
        this.invitationCode.value = $res.invitationCode;
        this.overlay = false;
      },
      error: err => {
        Swal.fire({
          icon: 'error',
          title: 'Wystąpił błąd!',
          text: 'Wystąpił błąd podczas generowania kodu',
          footer: err.error.errors
        });
        this.overlay = false;
      }
    });
  }
  joinFamily()
  {
    this.overlay = true;
    let x: IFamilyJoin = {
      invitationCode: this.invitationCode.value
    };
    this.familyService.joinFamily(x).subscribe({
      next: data => {
        this.overlay = false;
        Swal.fire({
          icon: 'success',
          title: 'Zakończono pomyślnie!',
          text: 'Pomyślnie dołączono do rodziny!'
        });
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
    let x: IFamilySendMailWithCode = {
      familyId: localStorage.getItem('familyId'),
      email: this.emailToSend.value
    };
    this.familyService.sendMailWithCodeFamily(x).subscribe({
      next: data => {
        this.overlay = false;
        Swal.fire({
          icon: 'success',
          title: 'Zakończono pomyślnie!',
          text: 'Pomyślnie wysłano kod z zaproszeniem!',
          footer: '<b>Adres email:</b> ' + this.emailToSend.value
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
  //#endregion metody

  logOut()
  {
    this.notesService.logOut();
  }

}
