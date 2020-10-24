import { INoteUpdate } from './INoteUpdate';
import { trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { INote } from '../addnote/Note';
import { NotesService } from '../addnote/notes.service';
import { error } from 'protractor';

@Component({
  selector: 'app-allnotes',
  templateUrl: './allnotes.component.html',
  styleUrls: ['./allnotes.component.css']
})
export class AllnotesComponent implements OnInit {

  constructor(private notes: NotesService, private noteservice: NotesService) { }

  $response: INote[];
  overlay;
  inputTemp: string;

  ngOnInit(): void {
    this.overlay = false;
    this.fetchNotes();
  }

  logOut()
  {
    this.noteservice.logOut();
  }

  fetchNotes()
  {
    this.overlay = true;
    this.notes.getNotes().subscribe({
      next: data => {
        this.$response = data;
        this.overlay = false;
      },
      error: err => {
        Swal.fire({
          icon: 'error',
          title: 'Wystąpił błąd!',
          text: 'Wystąpił błąd pobierania notatek',
          footer: err.error.errors
        });
        this.overlay = false;
      }
    });
  }

  noteEdit(itemId: string, message: string)
  {
    let text: string;
    this.inputTemp = message;

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-warning',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
      icon: 'question',
      title: 'Edycja notatki',
      text: 'Podaj treść notatki',
      input: 'textarea',
      inputValue: this.inputTemp,
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: 'Zapisz zmiany',
      cancelButtonText: 'Anuluj',
      preConfirm: (input) => {
        text = input;
      }
    }).then((result) => {
      if (result.isConfirmed) {
        // żądanie
        const x: INoteUpdate = {
          noteId: itemId,
          message: text
        };

        this.noteservice.updateNote(x).subscribe({
          next: data => {
            swalWithBootstrapButtons.fire(
              'Edycja zakończona!',
              'Pomyślnie zakończono edycję notatki.',
              'success'
            );
            this.ngOnInit();
          },
          error: err => {
            Swal.fire({
              title: 'Wystąpił błąd!',
              text: 'Wystąpił błąd podczas edycji notatki!',
              footer: err.error.errors,
              icon: 'error'
            });
          }
        });
      }
    });
  }

}
