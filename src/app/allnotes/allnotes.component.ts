import { trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { INote } from '../addnote/Note';
import { NotesService } from '../addnote/notes.service';

@Component({
  selector: 'app-allnotes',
  templateUrl: './allnotes.component.html',
  styleUrls: ['./allnotes.component.css']
})
export class AllnotesComponent implements OnInit {

  constructor(private notes: NotesService, private noteservice: NotesService) { }

  $response: INote[];
  overlay;

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

}
