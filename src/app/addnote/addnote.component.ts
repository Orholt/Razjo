import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { IAddNote } from './AddNote';
import { INote } from './Note';
import { NotesService } from './notes.service';

@Component({
  selector: 'app-addnote',
  templateUrl: './addnote.component.html',
  styleUrls: ['./addnote.component.css']
})
export class AddnoteComponent implements OnInit {

  constructor(private noteService: NotesService) { }
  textAreaContent;
  noteContent: IAddNote;
  $response: INote;
  overlay;

  ngOnInit(): void {
    this.textAreaContent = document.getElementById('textBox');
    this.textAreaContent.value = '';
    this.overlay = false;
  }

  logOut()
  {
    this.noteService.logOut();
  }

  addNote()
  {
    // SetData
    this.noteContent = {
      message: this.textAreaContent.value
    };
    // !
    this.overlay = true;
    this.noteService.addNote(this.noteContent).subscribe({
      next: data =>
      {
        this.$response = data;
        this.overlay = false;
        Swal.fire({
          icon: 'success',
          title: 'Pomyślnie utworzono notatkę'
        });
        this.afterPost();
      },
      error: error => {
        Swal.fire({
          icon: 'error',
          title: 'Wystąpił Błąd!',
          text: 'Wystąpił błąd podczas dodawania notatki',
          footer: error.error.errors
        });
        this.overlay = false;
      }
    });
  }

  afterPost() {
    this.textAreaContent.value = '';
  }

}
